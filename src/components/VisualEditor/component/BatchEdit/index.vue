<template>
  <a-modal
    :visible="true"
    @ok="onSubmit"
    @cancel="closeModal()"
    :maskClosable="false"
    :keyboard="false"
    :width="600"
    title="批量修改"
  >
    <FormModel :config="config" @change="onChange"></FormModel>
  </a-modal>
</template>

<script>
import FormModel from '../ConfigPanel/FormModel/formModel.vue'

const config = [
  {
    type: 'select',
    label: '主题',
    key: 'theme',
    defaultValue: 'default',
    rules: [
      { required: false, message: '请选择主题' }
    ],
    props: {
      placeholder: '请选择主题',
      disabled: false,
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
    defaultValue: { hex: '#333' },
    rules: [
      { required: false, message: '请选择字体颜色' }
    ],
    props: {
      disabled: false
    }
  }
]

export default {
  props: {
    editor: null
  },
  components: { FormModel },
  data () {
    return {
      config,
      formData: null
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
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
