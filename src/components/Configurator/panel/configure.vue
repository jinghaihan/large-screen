<template>
  <div class="configure-container">
    <!-- 表单配置 -->
    <div class="configure-form-container">
      <!-- 表单配置 -->
      <FormModel v-if="activeKey !== 'layer'"
                :config="formConfig"
                :ratio="ratio"
                :gridColor="gridColor"
                @change="onModelChange">
      </FormModel>
      <!-- 图层配置 -->
      <LayerPanel v-else
                  :layout="layout"
                  :layer="layer"
                  :root="root">
      </LayerPanel>
    </div>
    <!-- 切换 -->
    <div class="tab-container">
      <div :class="activeKey !== tab.key? 'tab' : 'tab tab-selected'"
           v-for="tab in config.operation['configure']"
           :key="tab.key"
           @click="onChange(tab)">
        {{tab.name}}
      </div>
    </div>
  </div>
</template>

<script>
import FormModel from '../form/formModel.vue'
import LayerPanel from './layer.vue'

export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    layout: {
      type: Array,
      required: true
    },
    ratio: {
      type: Object,
      required: true
    },
    gridColor: {
      type: Object,
      required: true
    },
    layer: {
      type: Number,
      required: true
    },
    root: null
  },
  components: { FormModel, LayerPanel },
  data () {
    return {
      formConfig: this.config['configure']['basic'],
      activeKey: 'basic'
    }
  },
  methods: {
    onChange (tab) {
      this.activeKey = tab.key
      this.formConfig = this.config['configure'][this.activeKey] || []
    },
    onModelChange (data) {
      switch (this.activeKey) {
        case 'basic':
          // 画布尺寸
          if (data['ratioWidth'] && data['ratioHeight']) {
            this.root.ratio.width = data['ratioWidth']
            this.root.ratio.height = data['ratioHeight']
          }
          // 背景
          if (data['background']) {
            this.root.$refs.paper.updateBackground(data['background'])
          }
          // 网格线颜色
          if (data['gridColor']) {
            this.root.gridColor = data['gridColor']
          }
          break
        case 'component':
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.ant-form-item-label{
    >label{
      font-size: 13px;
    }
  }
</style>
