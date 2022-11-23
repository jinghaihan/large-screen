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
                       :form.sync="form">
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
import FormModelItem from './formModelItem.vue'

export default {
  props: {
    config: {
      type: Array,
      required: true
    }
  },
  components: { FormModelItem },
  data () {
    return {
      visible: false,
      form: {},
      rules: {},
      configData: _.cloneDeep(this.config),
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
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
        // 默认值
        form[conf.key] = this.getValue(conf.defaultValue)
        // 规则
        rules[conf.key] = (conf.rules ? conf.rules : []).map(rule => {
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
    getValue (defaultValue) {
      if (!defaultValue && typeof defaultValue !== 'boolean' && defaultValue !== 0) {
        return undefined
      }
      return defaultValue
    },
    onChange () {
      this.$emit('change', this.form)
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
