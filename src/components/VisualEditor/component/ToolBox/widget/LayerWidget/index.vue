<template>
  <div class="layer-widget-container">
    <!-- 操作 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <a-icon class="action" type="ellipsis"></a-icon>
      </a>
      <a-menu slot="overlay">
        <a-menu-item v-for="item in editor.operation.layer"
                    :key="item.key"
                    @click="onOperation(item)">
          <div class="menu-item-container">
            <a-icon class="icon" :type="item.icon"></a-icon>{{item.name}}
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <!-- 图层 -->
    <div class="layer-container">
      <a-dropdown v-show="layout.length > 1">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <span :class="layout[layer.current].visible ? 'layer' : 'layer invisible-layer'">{{layout[layer.current].name}}</span>
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item v-for="item in layout.filter((item, index) => index !== layer.current)"
                      :key="item.key"
                      @click="onChange(item)">
            <a href="javascript:;">{{item.name}}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <span :class="layout[layer.current].visible ? 'layer' : 'layer invisible-layer'"
            v-show="layout.length === 1">
        {{layout[layer.current].name}}
      </span>
    </div>
    <TooltipIcon class="action" title="新增图层" icon="block" placement="bottom" @click="onCreate"></TooltipIcon>

    <Modal v-if="modalVisible" :modalData="modalData" @close="onModalClose"></Modal>
  </div>
</template>

<script>
import Modal from './modal.vue'
import TooltipIcon from '../../../TooltipIcon'

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
  components: { Modal, TooltipIcon },
  data () {
    return {
      modalData: {},
      modalVisible: false
    }
  },
  methods: {
    onOperation (operation) {
      switch (operation.key) {
        case 'edit':
          this.onEdit()
          break
        case 'delete':
          this.onDelete()
          break
        default:
          break
      }
    },
    onCreate () {
      this.modalData.modalType = 'create'
      this.modalData.name = '图层' + (this.layout.length + 1)
      this.modalVisible = true
    },
    onEdit () {
      this.modalData = {
        modalType: 'edit',
        name: this.layout[this.layer.current].name,
        key: this.layout[this.layer.current].key
      }
      this.modalVisible = true
    },
    onDelete () {
      this.editor.deleteLayer(this.layout[this.layer.current])
    },
    onChange (layer) {
      this.editor.changeLayer(layer.key)
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
  .layer-widget-container{
    display: flex;
    align-items: center;
    .layer-container{
      display: flex;
      align-items: center;
      .layer{
        color: var(--font-color);
        font-weight: bold;
        font-size: 15px;
      }
      .invisible-layer{
        color: var(--highlight-color);
      }
    }
    .action{
      color: #1890ff;
      font-size: 16px;
      margin: 0 8px;
    }
  }
</style>
