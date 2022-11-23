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
    <a-form :form="form" autocomplete="off">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item v-bind="formItemLayout" label="主题">
            <a-select
              v-decorator="[
                'theme',
                {
                  initialValue: 'default',
                  rules: [
                    { required: true, message: '请选择主题' },
                  ]
                }
              ]"
              placeholder="请选择主题"
              :options="themeOption"
            >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>

const themeOption = [
  { label: '默认', value: 'default' },
  { label: 'light', value: 'light' },
  { label: 'macarons', value: 'macarons' },
  { label: 'infographic', value: 'infographic' },
  { label: 'shine', value: 'shine' },
  { label: 'roma', value: 'roma' }
]

export default {
  props: {
    editor: null
  },
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      themeOption
    }
  },
  methods: {
    onSubmit () {
      let _this = this
      _this.form.validateFields(async (err, values) => {
        if (err) return
        let params = { ...values }
        this.editor.batchEdit(params)
        
        // _this.closeModal(params)
      })
    },
    closeModal (data) {
      this.$emit('close', data)
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
