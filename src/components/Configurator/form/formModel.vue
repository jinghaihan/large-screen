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
        <form-item :config="conf" :form="form" :ratio="ratio" @change="onChange"></form-item>
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
    ratio: {
      type: Object,
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
    async init () {
      let fields = []
      this.config.forEach(conf => {
        switch (conf.key) {
          case 'ratio-width':
            this.form[conf.key] = this.ratio.width
            break
          case 'ratio-height':
            this.form[conf.key] = this.ratio.height
            break
          default:
            this.form[conf.key] = conf.defaultValue || undefined
            break
        }
        if (conf.defaultValue) fields.push(conf.key)
        this.rules[conf.key] = conf.rules
      })
      this.visible = true
      await this.$nextTick()
      this.$refs.form.validateField(fields)

      console.log(this.rules)
    },
    onChange () {
      this.$emit('change', this.form)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
