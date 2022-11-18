<template>
  <a-modal
    :visible="true"
    @ok="onSubmit"
    @cancel="closeModal()"
    :maskClosable="false"
    :keyboard="false"
    :width="500"
    title="图层"
  >
    <a-form :form="form" autocomplete="off">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item v-bind="formItemLayout" label="图层名称">
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: modalData.name,
                  rules: [
                    { required: true, message: '请输入图层名称', whitespace: true },
                  ]
                }
              ]"
              placeholder="请输入图层名称"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>

export default {
  props: {
    modalData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      }
    }
  },
  methods: {
    onSubmit () {
      let _this = this
      _this.form.validateFields(async (err, values) => {
        if (err) return
        _this.loading = true

        let params = { ...values, key: this.modalData.key }
        
        _this.closeModal(params)
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
