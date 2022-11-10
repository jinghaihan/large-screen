<template>
  <a-form-model
    v-if="visible"
    ref="form"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-row :gutter="[8, 8]">
      <a-col v-for="conf in config" :key="conf.key">
        <form-item :config="conf" :form="form"></form-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
import formItem from './formItem.vue'

export default {
  props: {
    config: {
      type: Array,
      required: true
    },
    labelCol: {
      default: { span: 4 }
    },
    wrapperCol: {
      default: { span: 18 }
    }
  },
  components: { formItem },
  data () {
    return {
      visible: false,
      form: {},
      rules: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.config.forEach(conf => {
        this.form[conf.key] = conf.defaultValue || undefined
        this.rules[conf.key] = conf.rules
      })
      this.visible = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
