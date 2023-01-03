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
import config from './config'

export default {
  props: {
    entity: null
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
      this.entity.batchEdit(this.formData)
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
