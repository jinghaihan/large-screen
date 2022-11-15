<template>
  <div class="configure-container">
    <!-- 表单配置 -->
    <div class="configure-form-container">
      <!-- 基础配置 -->
      <FormModel v-show="activeKey === 'basic'"
                :config="config['configure']['basic']"
                :ratio="ratio"
                :gridColor="gridColor"
                :component="component"
                @change="onModelChange">
      </FormModel>
      <!-- 图层配置 -->
      <LayerPanel v-if="activeKey === 'layer'"
                  :layout="layout"
                  :layer="layer"
                  :root="root">
      </LayerPanel>
      <!-- 组件配置 -->
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
    component: {
      type: Object,
      required: true
    },
    root: null
  },
  components: { FormModel, LayerPanel },
  data () {
    return {
      activeKey: 'basic'
    }
  },
  watch: {
    component: {
      deep: true,
      immediate: true,
      handler: function (data) {
        if (data.props) {
          this.activeKey = 'component'
        }
      }
    }
  },
  methods: {
    onChange (tab) {
      this.activeKey = tab.key
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
