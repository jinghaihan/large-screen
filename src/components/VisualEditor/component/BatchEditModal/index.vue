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
    <div id="batch-edit-modal">
      <FormModel :config="config" @change="onChange"></FormModel>
    </div>
  </a-modal>
</template>

<script>
import FormModel from '../ConfigPanel/FormModel/formModel.vue'
import config from './config'

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
  #batch-edit-modal{
    --primary-color: #fff;
    --normal-color: #f5f5f5;
    --shadow-color: #f0f0f0;
    --font-color: #333;
    --highlight-color: #ddd;
  }
</style>
