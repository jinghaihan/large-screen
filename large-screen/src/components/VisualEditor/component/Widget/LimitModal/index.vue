<template>
  <a-modal
    :visible="true"
    @cancel="closeModal()"
    :maskClosable="false"
    :keyboard="false"
    :width="1000"
    title="默认数据限制器"
    :getContainer="getContainer()"
    wrapClassName="visual-editor-modal"
    :footer="null"
  >
    <VirtualForm :header="header"></VirtualForm> 
  </a-modal>
</template>

<script>
import VirtualForm from '../../Widget/VirtualForm'

const header = [
  {
    column: 6,
    name: '字段',
    required: false
  },
  {
    column: 4,
    name: '字段格式',
    required: false
  },
  {
    column: 4,
    name: '限制条件',
    required: false
  },
  {
    column: 8,
    name: '限制条件值',
    required: false
  },
  {
    column: 2,
    name: '操作',
    required: false,
    center: true
  }
]

export default {
  props: {
    editor: null
  },
  components: { VirtualForm },
  data () {
    return {
      data: [],
      loading: false,
      header
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      
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
  .container{
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
