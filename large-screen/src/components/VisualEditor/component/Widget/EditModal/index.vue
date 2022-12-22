<template>
  <a-modal
    :visible="true"
    @ok="onSubmit"
    @cancel="closeModal()"
    :maskClosable="false"
    :keyboard="false"
    :width="600"
    title="批量修改"
    :getContainer="getContainer()"
    wrapClassName="visual-editor-modal"
  >
    <FormModel :config="config" @change="onChange"></FormModel>
  </a-modal>
</template>

<script>
import FormModel from '../../ConfigPanel/FormModel/formModel.vue'
import color from '../../../config/color'

const config = [
  {
    type: 'select',
    label: '主题',
    key: 'theme',
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    },
    defaultValue: 'default',
    props: {
      options: [
        { label: '默认', value: 'default' },
        { label: 'light', value: 'light' },
        { label: 'macarons', value: 'macarons' },
        { label: 'infographic', value: 'infographic' },
        { label: 'shine', value: 'shine' },
        { label: 'roma', value: 'roma' }
      ]
    }
  },
  {
    type: 'color-picker',
    label: '字体颜色',
    key: 'fontColor',
    col: 12,
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    defaultValue: { hex: '#333' }
  },
  {
    type: 'color-picker',
    label: '边框主色',
    key: 'vm-border-primaryColor',
    col: 12,
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    defaultValue: { hex: color['dataV-primary-color'] }
  },
  {
    type: 'color-picker',
    label: '边框副色',
    key: 'vm-border-deputyColor',
    col: 12,
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    defaultValue: { hex: color['dataV-deputy-color'] }
  },
  {
    type: 'color-picker',
    label: '边框背景色',
    key: 'vm-border-backgroundColor',
    col: 12,
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    defaultValue: { hex: color['dataV-background-color'] }
  }
]

export default {
  props: {
    editor: null
  },
  components: { FormModel },
  data () {
    return {
      formData: null,
      config
    }
  },
  methods: {
    onSubmit () {
      this.editor.batchEdit(this.formData)
      this.closeModal()
    },
    onChange (data) {
      this.formData = data
    },
    closeModal (data) {
      this.$emit('close', data)
    },
    getContainer () {
      return () => document.getElementById('visual-editor-container')
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
