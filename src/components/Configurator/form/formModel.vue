<template>
  <a-form-model
    v-if="visible && config.length"
    ref="form"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-row>
      <a-col v-for="conf in config" :key="conf.key">
        <FormModelItem :config="conf"
                       :form.sync="form"
                       :ratio="ratio"
                       :gridColor="gridColor">
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
      required: true
    },
    gridColor: {
      type: Object,
      required: true
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
      rules: {}
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
    console.log(this.ratio.width)
    this.init()
  },
  methods: {
    async init () {
      let form = {}
      let rules = {}
      let fields = []
      this.config.forEach(conf => {
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

        if (form[conf.key]) fields.push(conf.key)
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

      await this.$nextTick()
      if (this.$refs.form) {
        this.$refs.form.validateField(fields)
      }
    },
    onChange () {
      this.$emit('change', this.form)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
