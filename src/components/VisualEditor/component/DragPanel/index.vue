<template>
  <div class="drag-panel-container">
    <!-- 查询条件 -->
    <a-input-search class="search"
                    v-model="queryParam"
                    placeholder="请输入组件名称">
    </a-input-search>
    <!-- 拖拽元素 -->
    <a-row :gutter="[8, 8]"
            v-if="Object.keys(configData).length">
      <a-col v-for="conf in configData"
              :key="conf.name"
              :span="conf.col">
          <div class="droppable-element"
              @drag="drag($event, conf)"
              @dragend="dragEnd($event, conf)"
              draggable="true"
              unselectable="on">
            <a-card hoverable size="small" :title="conf.name">
              <div slot="extra" v-if="type === 'clipBoard'">
                <TooltipIcon class="action" icon="close-circle" title="删除" @click="onDelete(conf)"></TooltipIcon>
              </div>
              <img slot="cover" :src="conf.image" />
            </a-card>
          </div>
      </a-col>
    </a-row>
    <!-- 无数据样式 -->
    <div class="empty-container" v-else>
      <a-empty></a-empty>
    </div>
  </div>
</template>

<script>
import TooltipIcon from '../TooltipIcon'
import { getUUID } from '../../utils'

let mouseXY = { 'x': null, 'y': null }
let DragPos = { 'x': null, 'y': null, 'i': null }

export default {
  props: {
    editor: null,
    layer: {
      type: Number,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: { TooltipIcon },
  data () {
    return {
      instance: null,
      queryParam: null
    }
  },
  watch: {
    layer: {
      deep: true,
      immediate: true,
      handler: function () {
        this.init()
      }
    },
    type: {
      immediate: true,
      handler: function () {
        this.queryParam = null
      }
    }
  },
  computed: {
    configData () {
      let originData = this.type === 'clipBoard' ? this.editor.clipBoard : this.config[this.type]
      
      if (!this.queryParam) {
        return originData || {}
      } else {
        let result = {}
        Object.keys(originData || {}).forEach(key => {
          if (originData[key].name.includes(this.queryParam)) {
            result[key] = originData[key]
          }
        })
        return result
      }
    }
  },
  created () {
    this.editor.setInstance({ dragPanel: this })
  },
  beforeDestroy () {
    if (this.instance.$refs.gridLayout) {
      this.instance.$refs.gridLayout.$el.removeEventListener('dragover', this.updateMouse)
    }
  },
  methods: {
    init () {
      if (this.instance && this.instance.$refs.gridLayout) {
        this.instance.$refs.gridLayout.$el.removeEventListener('dragover', this.updateMouse)
      }
      this.instance = this.editor.instance['layout'].$refs['layer'][this.layer.current]
      this.instance.$refs.gridLayout.$el.addEventListener('dragover', this.updateMouse, false)
    },
    updateMouse (e) {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
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
      let parentRect = this.instance.$refs.gridLayout.$el.getBoundingClientRect()
      let mouseInGrid = false
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true
      }
      if (mouseInGrid === true) {
        this.instance.$refs.gridLayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, item.h, item.w)
        this.instance.layout = this.instance.layout.filter(obj => obj.i !== 'drop')

        let key = getUUID()
        this.instance.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: item.w,
          h: item.h,
          i: key,
          props: {
            key,
            name: item.name,
            type: item.type,
            componentType: item.props.componentType || this.type,
            parentKey: item.props.parentKey
          }
        })
        this.editor.changeComponent(this.instance.layout[this.instance.layout.length - 1])
        try {
          this.instance.$refs.gridLayout.$children[this.instance.layout.length].$refs.item.style.display = 'block'
        } catch (error) { }
      }
    },
    onDelete (data) {
      this.editor.deleteClipBoardCell(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .drag-panel-container{
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .search{
      margin-bottom: 8px;
    }
    .empty-container{
      height: calc(~"100% - 40px");
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .action{
      margin-right: 8px;
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
</style>
