<template>
  <div class="configure-container">
    <!-- 表单配置 -->
    <div class="configure-form-container">
      <FormModel v-show="activeKey !== 'layer'" :config="config"></FormModel>
      <LayerPanel v-show="activeKey === 'layer'" :layout="layout" :layer="layer" :root="root"></LayerPanel>
    </div>
    <!-- 切换 -->
    <div class="tab-container">
      <div :class="activeKey !== tab.key? 'tab' : 'tab tab-selected'"
           v-for="tab in tabs"
           :key="tab.key"
           @click="onChange(tab)">
        {{tab.name}}
      </div>
    </div>
  </div>
</template>

<script>
import Config from './config'
import FormModel from '../form/formModel.vue'
import LayerPanel from './layer.vue'

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
    root: null
  },
  components: { FormModel, LayerPanel },
  data () {
    return {
      config: new Config('basic').getConfig(),
      tabs: [
        { name: '基础配置', key: 'basic' },
        { name: '图层配置', key: 'layer' },
        { name: '组件配置', key: 'component' }
      ],
      activeKey: 'basic'
    }
  },
  methods: {
    onChange (tab) {
      this.activeKey = tab.key
      this.config = new Config(this.activeKey).getConfig() || []
    }
  }
}
</script>

<style lang="less" scoped>

</style>
