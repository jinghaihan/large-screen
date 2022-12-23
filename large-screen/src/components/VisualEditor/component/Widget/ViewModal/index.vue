<template>
  <a-modal
    :visible="true"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    :closable="false"
    width="100%"
    height="100%"
    wrapClassName="fullModalWithoutHeader"
  >
    <a-card title="预览">
      <template slot="extra">
        <TooltipIcon title="退出" icon="close" @click="closeModal"></TooltipIcon>
      </template>
      <div ref="container" class="container">
        <Viewer v-if="mounted" :container="$refs.container" :config="config" :grid="grid"></Viewer>
      </div>
    </a-card>
  </a-modal>
</template>

<script>
import Viewer from '../../Viewer'
import TooltipIcon from '../TooltipIcon'

export default {
  name: 'viewModal',
  props: {
    editor: null,
    grid: {
      type: Object,
      required: true
    }
  },
  components: { Viewer, TooltipIcon },
  data () {
    return {
      config: null,
      mounted: false
    }
  },
  created () {
    this.init()
  },
  async mounted () {
    await this.$nextTick()
    this.mounted = true
  },
  methods: {
    init () {
      this.config = this.editor.getConfig()
    },
    closeModal (refresh) {
      this.$emit('close', refresh)
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    position: relative;
    height: calc(~"100vh - 56px");
    overflow: auto;
    .layout-container{
      height: 100%;
      .vue-grid-layout{
        height: 100% !important;
      }
    }
  }
  /deep/.ant-card-body{
    padding: 0;
  }
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
