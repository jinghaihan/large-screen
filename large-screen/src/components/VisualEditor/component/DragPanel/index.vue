<template>
  <div class="drag-panel-container">
    <a-spin :spinning="loading">
      <!-- 查询条件 -->
      <a-input-search class="search"
                      v-model="queryParam"
                      placeholder="请输入组件名称"
                      v-if="!mediaTypeList.includes(type)"
                      @change="onChange">
      </a-input-search>
      <!-- 拖拽元素 -->
      <a-row :gutter="[8, 8]"
              v-if="Object.keys(configData).length">
        <a-col v-for="conf in configData"
                :key="conf.name"
                :span="conf.col">
            <div class="droppable-element"
                @dragstart="dragStart($event, conf)"
                @drag="drag($event, conf)"
                @dragend="dragEnd($event, conf)"
                draggable="true"
                unselectable="on">
              <a-card hoverable size="small" :title="conf.name">
                <div slot="extra" v-if="type === 'clipBoard'">
                  <TooltipIcon class="action" icon="close-circle" title="删除" @click="onDelete(conf)"></TooltipIcon>
                </div>
                <!-- 图片展示 -->
                <img v-if="conf.image" :class="'image-col' + conf.col" slot="cover" :src="conf.image" />
                <!-- 组件展示 -->
                <component v-else
                           class="component"
                           :is="conf.props.component"
                           :data="conf.props">
                </component>
              </a-card>
            </div>
        </a-col>
      </a-row>
      <!-- 无数据样式 -->
      <div class="empty-container" v-else>
        <a-empty></a-empty>
      </div>
    </a-spin>
  </div>
</template>

<script>
import TooltipIcon from '../Widget/TooltipIcon'
// 装饰组件
import Decoration from '../Template/Decoration'
// 查询组件
import Search from '../Template/Search'
// 表格组件
import Table from '../Template/Table'

import { getUUID } from '../../utils'
import { getImageComponent, getVideoComponent, getAudioComponent } from '../../service/component'

let mouseXY = { 'x': null, 'y': null }
let DragPos = { 'x': null, 'y': null, 'i': null }

export default {
  props: {
    entity: null,
    config: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: { TooltipIcon, Decoration, Search, Table },
  data () {
    return {
      instance: null,
      queryParam: null,
      configData: {},
      loading: false,
      // 多媒体组件
      mediaTypeList: ['image', 'video', 'audio']
    }
  },
  watch: {
    type: {
      immediate: true,
      handler: function () {
        this.queryParam = null
        this.onChange()
      }
    }
  },
  created () {
    this.entity.setInstance({ dragPanel: this })
  },
  beforeDestroy () {
    try {
      this.instance.$refs.gridLayout.$el.removeEventListener('dragover', this.updateMouse)
    } catch (error) { }
  },
  methods: {
    onChange () {
      if (this.mediaTypeList.includes(this.type)) {
        this.handleRequest(this.type)
      } else {
        let data = this.type === 'clipBoard' ? this.entity.clipBoard : this.config[this.type]
        if (!data) {
          this.configData = {}
          return
        }
      
        if (!this.queryParam) {
          this.configData = data
        } else {
          let result = {}
          Object.keys(data).forEach(key => {
            if (data[key].name.includes(this.queryParam)) {
              result[key] = data[key]
            }
          })
          this.configData = result
        }
      }
    },
    async handleRequest (type) {
      this.loading = true

      this.configData = {}
      let response = null
      switch (type) {
        case 'image':
          response = await getImageComponent()
          break
        case 'video':
          response = await getVideoComponent()
          break
        case 'audio':
          response = await getAudioComponent()
          break
      }
      if (!response.data.success) {
        this.$notification.error({ message: '错误', description: response.data.desc })
        return
      }
      response.data.data.rows.forEach(item => {
        item.src = type !== 'audio' ? item.src : require('@/assets/VisualEditor/component/media/audio.png')
        item.thumbnail = type !== 'image' ? item.src : undefined

        this.configData[item.id] = {
          type: type,
          name: item.name,
          image: item.src,
          col: type !== 'audio' ? 24 : 8,
          w: item.w,
          h: item.h,
          props: {
            thumbnail: item.thumbnail,
            src: item.props && item.props.src ? item.props.src : item.src
          }
        }
      })

      this.loading = false
    },
    removeListener () {
      try {
        this.instance.$refs.gridLayout.$el.removeEventListener('dragover', this.updateMouse)
      } catch (error) { }
    },
    addListener () {
      try {
        this.instance.$refs.gridLayout.$el.addEventListener('dragover', this.updateMouse, false)
      } catch (error) {}
    },
    updateInstance (data) {
      this.removeListener()
      if (data && data.restriction) {
        // 限制个数
        if (data.restriction.unique) {
          if (this.entity.instance[data.restriction.instance]) {
            this.$notification.error({ message: '错误', description: `画布仅可存在一个${data.restriction.instanceName}` })
            return
          } else {
            this.instance = this.entity.instance['layout'].$refs.layout
          }
        }
        // 依赖父级
        if (data.restriction.dependentInstance) {
          this.instance = this.entity.instance[data.restriction.dependentInstance]
          if (!this.instance) {
            this.$notification.error({ message: '错误', description: `请先拖入${data.restriction.dependentInstanceName}` })
            return
          }
        }
      } else {
        this.instance = this.entity.instance['layout'].$refs.layout
      }
      this.addListener()
    },
    updateMouse (e) {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    },
    dragStart (e, item) {
      this.updateInstance(item)
    },
    drag (e, item) {
      let parentRect = this.instance.$refs.gridLayout.$el.getBoundingClientRect()
      let mouseInGrid = false
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true
      }
      if (mouseInGrid === true && (this.instance.layout.findIndex(item => item.i === 'drop')) === -1) {
        this.instance.layout.push({
          x: (this.instance.layout.length * 2) % this.instance.grid.count,
          y: this.instance.layout.length + this.instance.grid.count,
          w: item.w,
          h: item.h,
          i: 'drop'
        })
      }
      let index = this.instance.layout.findIndex(item => item.i === 'drop')
      if (index !== -1) {
        try {
          this.instance.$refs.gridLayout.$children[this.instance.layout.length].$refs.item.style.display = 'none'
        } catch (error) { }
        let el = this.instance.$refs.gridLayout.$children[index]
        el.dragging = { 'top': mouseXY.y - parentRect.top, 'left': mouseXY.x - parentRect.left }
        let newPos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left)
        if (mouseInGrid === true) {
          this.instance.$refs.gridLayout.dragEvent('dragstart', 'drop', newPos.x, newPos.y, item.h, item.w)
          DragPos.x = this.instance.layout[index].x
          DragPos.y = this.instance.layout[index].y
        }
        if (mouseInGrid === false) {
          this.instance.$refs.gridLayout.dragEvent('dragend', 'drop', newPos.x, newPos.y, item.h, item.w)
          this.instance.layout = this.instance.layout.filter(obj => obj.i !== 'drop')
        }
      }
    },
    dragEnd (e, item) {
      try {
        let parentRect = this.instance.$refs.gridLayout.$el.getBoundingClientRect()
        let mouseInGrid = false
        if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
          mouseInGrid = true
        }
        if (mouseInGrid === true) {
          this.instance.$refs.gridLayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, item.h, item.w)
          this.instance.layout = this.instance.layout.filter(obj => obj.i !== 'drop')

          if (!this.validatePosition(item)) return

          let key = getUUID()
          this.instance.layout.push({
            x: DragPos.x,
            y: DragPos.y,
            w: item.w,
            h: item.h,
            i: key,
            props: {
              key,
              ...item.props,
              name: item.name,
              type: item.type,
              componentType: item.props.componentType || this.type,
              parentKey: item.props.parentKey,
              src: item.props.src
            }
          })
          this.entity.changeComponent(this.instance.layout[this.instance.layout.length - 1])
          try {
            this.instance.$refs.gridLayout.$children[this.instance.layout.length].$refs.item.style.display = 'block'
          } catch (error) { }
        }
      } catch (error) { }
    },
    validatePosition (el) {
      const gridSize = {
        x: this.entity.instance['editor'].grid.count,
        y: Math.floor(this.entity.instance['editor'].grid.count / this.entity.instance['editor'].ratio.width * this.entity.instance['editor'].ratio.height)
      }
      if (DragPos.y + el.h > gridSize.y) {
        return false
      }
      return true
    },
    onDelete (data) {
      this.entity.deleteClipBoardCell(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .drag-panel-container{
    height: 100%;
    padding: 8px;
    overflow-x: hidden;
    .search{
      margin-bottom: 8px;
    }
    .empty-container{
      height: calc(~"100% - 40px");
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image-col12{
      height: 80px;
    }
    .component{
      height: 40px;
    }
    .action{
      margin-right: 8px;
    }
    .pagination{
      position: fixed;
      bottom: 8px;
    }
  }
  /deep/.ant-card{
    background: var(--primary-color);
  }
  /deep/.ant-card-head{
    background: var(--normal-color);
    color: var(--font-color);
    padding: 0;
    min-height: 28px;
    display: flex;
    align-items: center;
  }
  /deep/.ant-card-head-wrapper{
    width: 100%;
  }
  /deep/.ant-card-head-title{
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/.ant-card-bordered{
    border-color: var(--highlight-color);
  }
  /deep/.ant-spin-nested-loading{
    height: 100%;
    .ant-spin{
      max-height: none;
    }
    .ant-spin-container{
      height: 100%;
    }
  }
</style>
