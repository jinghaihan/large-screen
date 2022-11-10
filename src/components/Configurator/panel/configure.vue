<template>
  <div class="configure-container">
    <!-- 表单配置 -->
    <div class="configure-form-container">
      <FormModel :config="config"></FormModel>
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

export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'basic'
    }
  },
  components: { FormModel },
  data () {
    return {
      config: new Config(this.type).getConfig(),
      tabs: [
        { name: '基础配置', key: 'basic' },
        { name: '图层配置', key: 'layer' },
        { name: '组件配置', key: 'component' }
      ],
      activeKey: this.type
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
