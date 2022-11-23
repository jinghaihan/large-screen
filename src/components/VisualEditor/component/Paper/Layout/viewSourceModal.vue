<template>
  <a-modal
    :visible="true"
    @cancel="closeModal()"
    :maskClosable="false"
    :keyboard="false"
    :width="900"
    :footer="null"
    title="查看源码"
  >
    <div class="content">
      <textarea ref="textarea"></textarea>
    </div>
  </a-modal>
</template>

<script>
import * as CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      let _this = this
      await _this.$nextTick()
      _this.cm = CodeMirror.fromTextArea(_this.$refs.textarea, {
        lineNumbers: true
      })
      _this.cm.setSize('100%', '100%')
      _this.cm.setOption('readOnly', true)
      _this.cm.setOption('value', JSON.stringify(this.data, null, '\t'))
      _this.cm.refresh()
    },
    closeModal (data) {
      this.$emit('close', data)
    }
  }
}
</script>

<style lang="less" scoped>
  .content{
    height: 600px;
  }
  /deep/.ant-modal-body{
    padding: 0;
  }
</style>
