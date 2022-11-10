<template>
  <div class="toolbox-container">
    <tooltip-icon class="action" title="修改图层名称" icon="edit" placement="bottom" @click="onEditLayer"></tooltip-icon>
    <!-- 图层 -->
    <div class="layer-container">
      <a-dropdown v-show="layout.length > 1">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <span class="layer">{{layout[layer].name}}</span><a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item v-for="item in layout.filter((item, index) => index !== layer)"
                      :key="item.key"
                      @click="onChangeLayer(item)">
            <a href="javascript:;">{{item.name}}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <span class="layer" v-show="layout.length === 1">{{layout[layer].name}}</span>
    </div>
    <tooltip-icon class="action" title="新增图层" icon="block" placement="bottom" @click="onCreateLayer"></tooltip-icon>
    <a-divider type="virtical"></a-divider>
    <!-- 缩放 -->
    <div class="scale-container">
      <tooltip-icon class="icon" title="放大" icon="plus" placement="bottom" @click="onScale('up')"></tooltip-icon>
      <span class="scale">{{(scale * 100).toFixed(0)}}%</span>
      <tooltip-icon class="icon" title="缩小" icon="minus" placement="bottom" @click="onScale('down')"></tooltip-icon>
    </div>
    <a-divider type="virtical"></a-divider>
    <!-- 清空 -->
    <tooltip-icon class="action delete-action" title="清空" icon="delete" placement="bottom" @click="onClear"></tooltip-icon>
    <a-divider type="virtical"></a-divider>
    <!-- 帮助 -->
    <a-popover title="快捷键">
      <template slot="content">
        <div class="shortcut-container" v-for="key in shortcutKey" :key="key.description">
          <!-- tag展示 -->
          <div class="tag-container">
            <a-tag v-for="tag in key.combo" :key="tag">{{tag}}</a-tag>
          </div>
          <!-- 描述 -->
          <span class="description" v-if="key.description">{{key.description}}</span>
        </div>
      </template>
      <a-icon class="action help-action" type="question-circle"></a-icon>
    </a-popover>

    <LayerModal v-if="layerVisible" :modalData="modalData" @close="onModalClose"></LayerModal>
  </div>
</template>

<script>
import LayerModal from './layerModal.vue'

export default {
  props: {
    layout: {
      type: Array,
      required: true
    },
    layer: {
      type: Number,
      required: true
    },
    scale: {
      type: Number,
      required: true
    },
    root: null
  },
  components: { LayerModal },
  data () {
    return {
      shortcutKey: [
        {
          combo: ['ctrl > up', 'command > up'],
          description: '放大画布'
        },
        {
          combo: ['ctrl > down', 'command > down'],
          description: '缩小画布'
        },
        {
          combo: ['ctrl+shift > k', 'command+shift > k'],
          description: '画布网格线'
        },
        {
          combo: ['ctrl > delete', 'command > delete'],
          description: '删除组件'
        }
      ],
      modalData: {},
      layerVisible: false
    }
  },
  methods: {
    onScale (direction) {
      this.$emit('change-scale', direction)
    },
    onCreateLayer () {
      this.modalData.modalType = 'create'
      this.modalData.name = '图层' + (this.layout.length + 1)
      this.layerVisible = true
    },
    onEditLayer () {
      this.modalData = {
        modalType: 'edit',
        name: this.layout[this.layer].name,
        key: this.layout[this.layer].key
      }
      this.layerVisible = true
    },
    onChangeLayer (item) {
      this.$emit('change-layer', item.key) 
    },
    onClear () {
      let _this = this
      _this.$confirm({
        title: '确认清空？',
        content: '',
        confirmLoading: true,
        okText: '确定',
        cancelText: '取消',
        async onOk () {
          _this.root.init()
        },
        onCancel () { }
      })
    },
    onModalClose (data) {
      if (data) {
        switch (this.modalData.modalType) {
          case 'create':
            this.$emit('create-layer', data)
            break
          case 'edit':
            this.$emit('edit-layer', data)
            break
          default:
            break
        }
      }
      this.modalData = {}
      this.layerVisible = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
