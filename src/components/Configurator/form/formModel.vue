<template>
  <a-form-model
    v-if="visible && configData.length"
    ref="form"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-row>
      <a-col v-for="conf in configData" :key="conf.key">
        <FormModelItem :config="conf"
                       :configData="configData"
                       :form.sync="form"
                       :ratio="ratio"
                       :gridColor="gridColor"
                       v-if="isVisible(conf)">
        </FormModelItem>
      </a-col>
    </a-row>
  </a-form-model>
  <div class="empty-container" v-else>
    <a-empty></a-empty>
  </div>
</template>

<script>
import _ from 'lodash'
import FormModelItem from './formModeltem.vue'

export default {
  props: {
    config: {
      type: Array,
      required: true
    },
    ratio: {
      type: Object,
      required: false
    },
    gridColor: {
      type: Object,
      required: false
    },
    labelCol: {
      default: { span: 5 }
    },
    wrapperCol: {
      default: { span: 18 }
    }
  },
  components: { FormModelItem },
  data () {
    return {
      visible: false,
      form: {},
      rules: {},
      configData: _.cloneDeep(this.config)
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function (form) {
        this.onChange()
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let form = {}
      let rules = {}

      this.configData.forEach(conf => {
        switch (conf.key) {
          case 'ratioWidth':
            form[conf.key] = this.ratio.width
            break
          case 'ratioHeight':
            form[conf.key] = this.ratio.height
            break
          case 'gridColor':
            form[conf.key] = this.gridColor
            break
          default:
            form[conf.key] = conf.defaultValue || undefined
            break
        }

        // 规则
        rules[conf.key] = conf.rules.map(rule => {
          return {
            ...rule,
            trigger: ['change', 'blur']
          }
        })
      })
      this.form = _.cloneDeep(form)
      this.rules = _.cloneDeep(rules)
      this.visible = true
    },
    onChange () {
      this.$emit('change', this.form)
    },
    isVisible (config) {
      if (typeof config.visible === 'boolean') {
        return config.visible
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
