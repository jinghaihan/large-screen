<template>
  <a-modal
    :visible="visible"
    @cancel="closeModal(false)"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    :closable="false"
    width="100%"
    height="100%"
    wrapClassName="fullModalWithoutHeader"
  >
    <Content :config="config" @close="closeModal"></Content>
  </a-modal>
</template>

<script>
import Content from './content.vue'
import Config from './config'

export default {
  name: 'configModal',
  components: { Content },
  props: {
    modalData: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: true,
      config: new Config(this.type).getConfig()
    }
  },
  methods: {
    closeModal (refresh) {
      this.$emit('close', refresh)
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.ant-modal-body{
    padding: 0;
  }
</style>
