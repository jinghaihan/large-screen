<template>
  <a-tabs v-model="activeKey">
    <a-tab-pane v-for="conf in configure" :key="conf.key" :tab="conf.name">
      <!-- 基础配置 -->
      <FormModel ref="basicForm"
                 v-if="conf.config"
                 :config="conf.config"
                 @change="onChange">
      </FormModel>
      <!-- 折叠面板 -->
      <a-collapse v-if="conf.collapse" :bordered="false">
        <a-collapse-panel v-for="collapse in conf.collapse"
                          :key="collapse.key"
                          :header="collapse.name"
                          forceRender>
          <FormModel ref="collapseForm"
                     :config="collapse.config || []"
                     @change="onChange"></FormModel>
        </a-collapse-panel>
      </a-collapse>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import FormModel from '../form/formModel.vue'

export default {
  props: {
    config: {
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
  components: { FormModel },
  data () {
    return {
      configure: [],
      activeKey: null
    }
  },
  watch: {
    component: {
      deep: true,
      immediate: true,
      handler: function (data) {
        if (data.props) {
          this.init()
        }
      }
    }
  },
  methods: {
    init () {
      this.configure = this.component.props.configure
      this.activeKey = this.configure[0].key
    },
    onChange () {
      let form = {}
      if (this.$refs.basicForm) {
        form = { ...this.$refs.basicForm[0].form }
      }
      if (this.$refs.collapseForm) {
        let refs = this.$refs.collapseForm
        refs.forEach(ref => {
          form = { ...form, ...ref.form }
        })
      }
      let ref = this.root.$refs.paper.$refs.layoutContainer.$refs.layer[this.layer].$refs['renderer-' + this.component.props.key][0]
      let option = this.handleChartOption(form, ref.chart.getOption())
      ref.chart.update(option)
    },
    handleChartOption (data, current) {
      let option = {}
      // 标题设置
      option.title = {
        text: data.titleText || '',
        left: data.titlePosition,
        textStyle: {
          fontSize: data.titleFontSize || 18,
          fontWeight: data.titleFontWeight
        }
      }
      return { ...current, ...option }
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.ant-collapse-content-box{
    padding: 0;
  }
</style>
