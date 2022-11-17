<template>
  <a-tabs v-model="activeKey">
    <a-tab-pane v-for="conf in configure"
                :key="conf.key"
                :tab="conf.name">
      <!-- 基础配置 -->
      <div class="component-basic-container">
        <FormModel ref="basicForm"
                  v-if="conf.config"
                  :config="conf.config"
                  @change="onChange">
        </FormModel>
      </div>
      <!-- 折叠面板 -->
      <a-collapse v-if="conf.collapse"
                  :activeKey="collapseKeys"
                  :bordered="false"
                  destroyInactivePanel>
        <a-collapse-panel v-for="(collapse, index) in conf.collapse"
                          :key="collapse.key"
                          :header="collapse.name"
                          :disabled="collapse.switch ? !switchKeys.includes(collapse.key) : false">
          <div slot="extra" @click="e => e.stopPropagation()" v-if="collapse.switch">
            <a-switch :checked="switchKeys.includes(collapse.key)"
                      @change="onSwitch($event, collapse, index)"
                      size="small"></a-switch>
          </div>
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
      activeKey: null,
      // 该折叠面板是否可配
      switchKeys: [],
      // 折叠面板展开
      collapseKeys: []
    }
  },
  watch: {
    component: {
      deep: true,
      immediate: true,
      handler: function (value, oldValue) {
        if (value.props) {
          if (value.i !== oldValue.i) {
            this.init()
          }
        }
      }
    }
  },
  methods: {
    async init () {
      this.configure = []
      await this.$nextTick()

      this.initConfig()
      this.initKey()
      
      this.onChange()
    },
    initConfig () {
      let ref = this.getChartRef()
      let formData = ref.chart.getFormData()
      if (formData) {
        // 初始化表单数据
        this.configure = this.component.props.configure.map(conf => {
          if (conf.config) {
            conf.config.forEach(item => {
              item.defaultValue = formData[item.key] || item.defaultValue
            })
          }
          if (conf.collapse) {
            conf.collapse.forEach(collapse => {
              collapse.config.forEach(item => {
                item.defaultValue = formData[item.key] || item.defaultValue
              })
            })
          }
          return conf
        })
      } else {
        this.configure = this.component.props.configure
      }
    },
    initKey () {
      let ref = this.getChartRef()
      let key = ref.chart.getKey()
      let { switchKeys, collapseKeys } = key
      if (switchKeys || collapseKeys) {
        this.switchKeys = switchKeys
        this.collapseKeys = collapseKeys
        this.activeKey = this.configure[0].key
      } else {
        this.activeKey = this.configure[0].key
        this.configure.forEach(conf => {
          if (conf.collapse) {
            conf.collapse.forEach(collapse => {
              if (collapse.switch && collapse.defaultValue) {
                this.switchKeys.push(collapse.key)
                this.collapseKeys.push(collapse.key)
              }
              if (!collapse.switch) {
                this.collapseKeys.push(collapse.key)
              }
            })
          }
        })
      }
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
      let ref = this.getChartRef()
      let option = this.handleChartOption(form, ref.chart.getOption())
      if (ref.chart.theme !== form.theme) {
        ref.chart.init(form.theme)
      }
      ref.chart.update(option)
      ref.chart.setFormData(form)
      ref.chart.setKey({ switchKeys: this.switchKeys, collapseKeys: this.collapseKeys })
    },
    handleChartOption (data, current) {
      let option = { ...current }
      this.handleChartTitle(option, data)
      this.handleChartlegend(option, data)
      return option
    },
    // 标题设置
    handleChartTitle (option, data) {
      if (data.titleText) {
        option.title = {
          text: data.titleText || '',
          left: data.titlePosition,
          textStyle: {
            fontSize: data.titleFontSize || 18,
            fontWeight: data.titleFontWeight,
            color: data.titleFontColor ? data.titleFontColor.hex : '#333'
          }
        }
      } else {
        delete option.title
      }
    },
    // 图例设置
    handleChartlegend (option, data) {
      if (data.legendPosition) {
        option.legend = {
          show: true,
          orient: data.legendOrient,
          icon: data.legendIcon,
          textStyle: {
            color: data.legendFontColor ? data.legendFontColor.hex : '#333'
          }
        }
        let arr = data.legendPosition.split('-')
        let pos = {}
        arr.forEach((item, index) => {
          if (!(index % 2)) {
            pos[item] = arr[index + 1]
          }
        })
        option.legend = { ...option.legend, ...pos }
      } else {
        delete option.legend
      }
    },
    async onSwitch (checked, collapse, index) {
      if (checked) {
        this.switchKeys.push(collapse.key)
        this.collapseKeys.push(collapse.key)
      } else {
        this.switchKeys = this.switchKeys.filter(key => key !== collapse.key)
        this.collapseKeys = this.collapseKeys.filter(key => key !== collapse.key)
      }
      // 触发配置更新
      await this.$nextTick()
      this.onChange()
    },
    getChartRef () {
      return this.root.$refs.paper.$refs.layoutContainer.$refs.layer[this.layer].$refs['renderer-' + this.component.props.key][0]
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.ant-tabs-bar{
    margin: 0;
  }
  /deep/.ant-collapse-content-box{
    padding: 0;
  }
</style>
