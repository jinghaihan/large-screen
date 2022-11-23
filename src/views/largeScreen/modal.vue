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
  /deep/.ant-modal-body{
    padding: 0;
  }
</style>
