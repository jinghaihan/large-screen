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
    <slot></slot>
  </a-modal>
</template>

<script>

export default {
  name: 'configModal',
  props: {
    modalData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      visible: true
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
  /deep/.ant-modal:first-of-type {
    padding-bottom: 0;
    top: 0 !important;
  }
  /deep/.ant-modal-body:first-of-type{
    height: 100vh !important;
    max-height: none !important;
    padding: 0;
  }
</style>
