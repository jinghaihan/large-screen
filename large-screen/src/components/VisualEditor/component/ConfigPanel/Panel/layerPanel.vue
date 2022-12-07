<template>
  <a-spin :spinning="loading">
    <div class="layer-panel-container">
      <!-- 操作按钮 -->
      <div class="operator-container">
        <a-tooltip v-for="item in operation" :key="item.key">
          <template slot="title">{{item.name}}</template>
          <a-button class="button"
                    :type="item.type"
                    :icon="item.icon"
                    shape="circle"
                    @click="onOperation(item)">
          </a-button>
        </a-tooltip>
      </div>
      <!-- 图层 -->
      <Draggable
        v-if="!loading"
        class="layer-list-group"
        tag="ul"
        v-model="list"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li class="list-group-item"
              v-for="element in list"
              :key="element.key"
          >
          <a-card size="small" :title="element.name">
            <!-- 功能 -->
            <template slot="extra">
              <TooltipIcon class="action"
                            :icon="element.visible ? 'eye' : 'eye-invisible'"
                            :title="element.visible ? '可见' : '不可见'"
                            @click="element.visible = !element.visible">
              </TooltipIcon>
              <TooltipIcon class="action" icon="edit" title="修改名称" @click="onEdit(element)"></TooltipIcon>
              <TooltipIcon class="action" icon="delete" title="删除图层" @click="onDelete(element)"></TooltipIcon>
            </template>
            <!-- 预览 -->
            <img v-if="element.image" class="image" :src="element.image" alt="thumbnail">
            <a-empty v-else description="该图层不可见"></a-empty>
          </a-card>
          </li>
        </transition-group>
      </Draggable>
      <Modal v-if="modalVisible" :modalData="modalData" @close="onModalClose"></Modal>
    </div>
  </a-spin>
</template>

<script>
import _ from 'lodash'
import Draggable from 'vuedraggable'
import TooltipIcon from '../../Widget/TooltipIcon'
import Modal from '../../Widget/ToolBox/widget/LayerWidget/modal.vue'
import { getImage } from '../../../utils'

export default {
  props: {
    editor: null,
    layout: {
      type: Array,
      required: true
    },
    layer: {
      type: Object,
      required: true
    }
  },
  components: { Draggable, TooltipIcon, Modal },
  data () {
    return {
      loading: false,
      list: [],
      drag: false,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      },
      operation: [
        { name: '新增图层', icon: 'plus', key: 'create', type: 'primary' },
        { name: '刷新预览', icon: 'redo', key: 'refresh', type: 'default' },
        { name: '更新配置', icon: 'save', key: 'save', type: 'danger' }
      ],
      modalData: {},
      modalVisible: false
    }
  },
  created () {
    this.onRefresh()
  },
  methods: {
    onOperation (operation) {
      switch (operation.key) {
        case 'refresh':
          this.onRefresh()
          break
        case 'create':
          this.onCreate()
          break
        case 'save':
          this.onSave()
          break
        default:
          break
      }
    },
    onRefresh () {
      this.loading = true
      Promise.all(this.layout.map(async (item, index) => {
        const el = this.editor.instance.layout.$refs.layer[index].$el
        return { 
          name: item.name,
          key: item.key,
          visible: item.visible,
          current: index === this.layer.current,
          layer: index,
          image: item.visible ? await getImage(el, 0.5) : ''
        }
      })).then(result => {
        this.list = _.cloneDeep(result)
        this.loading = false
      })
    },
    onCreate () {
      this.modalData.modalType = 'create'
      this.modalData.name = '图层' + (this.layout.length + 1)
      this.modalVisible = true
    },
    onEdit (layer) {
      this.modalData = {
        modalType: 'edit',
        name: layer.name,
        key: layer.key
      }
      this.modalVisible = true
    },
    onDelete (layer) {
      this.editor.deleteLayer(layer)
    },
    onSave () {
      let keys = []
      let layer
      this.list.forEach((item, index) => {
        keys.push(item.key)
        if (item.current) {
          layer = index
        }
      })
      let layout = keys.map((key, order) => {
        let index = this.layout.findIndex(data => data.key === key)
        return {
          ...this.layout[index],
          visible: this.list[order].visible,
          layout: this.editor.instance.layout.$refs.layer[index].layout
        }
      })
      this.editor.updateLayer({ layout, layer })
    },
    onModalClose (data) {
      if (data) {
        switch (this.modalData.modalType) {
          case 'create':
            this.editor.createLayer(data)
            break
          case 'edit':
            this.editor.editLayer(data)
            break
          default:
            break
        }
      }
      this.modalData = {}
      this.modalVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
  .layer-panel-container{
    min-height: 150px;
    padding: 24px;
    .operator-container{
      display: flex;
      align-items: center;
      .button{
        margin-right: 8px;
      }
    }
    .layer-list-group {
      margin-top: 20px;
      list-style: none;
      .list-group-item{
        margin-bottom: 8px;
      }
      .flip-list-move {
        transition: transform 0.5s;
      }
      .no-move {
        transition: transform 0s;
      }
      .ghost {
        opacity: 0.5;
        background: #c8ebfb;
      }
      .image{
        width: 100%;
      }
      .action{
        height: 20px;
        width: 20px;
        margin: 0 4px;
        font-size: 14px;
      }
    }
  }
  /deep/.ant-card-body{
    padding: 4px 0;
  }
  /deep/.ant-card-extra{
    display: flex;
  }
  /deep/.ant-card{
    background: var(--primary-color);
  }
  /deep/.ant-card-head{
    background: var(--normal-color);
    color: var(--font-color);
  }
  /deep/.ant-card-bordered{
    border-color: var(--highlight-color);
  }
</style>
