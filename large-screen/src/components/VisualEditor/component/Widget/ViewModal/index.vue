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
        <Viewer v-if="mounted"
                :container="$refs.container"
                :config="config"
                :grid="grid"
                @inited="inited">
        </Viewer>
        <a-spin class="spin"
                v-show="loading"
                :spinning="loading"
                size="large">
        </a-spin>
      </div>
    </a-card>
  </a-modal>
</template>

<script>
import { getConfigPaper, getConfigSearch } from '../../../service/config'
import Viewer from '../../Viewer'
import TooltipIcon from '../TooltipIcon'

export default {
  name: 'viewModal',
  props: {
    grid: {
      type: Object,
      required: true
    }
  },
  components: { Viewer, TooltipIcon },
  data () {
    return {
      config: null,
      mounted: false,
      loading: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.loading = true
      // 获取paper配置
      let res = await getConfigPaper()
      let paper = JSON.parse(res.data.data)

      // 获取查询条件默认值
      res = await getConfigSearch()
      let search = res.data.data
      this.config = { paper, search }

      // 弹窗通过zoom展开，需要0.3s
      setTimeout(() => {
        this.mounted = true
      }, 300)
    },
    inited () {
      this.loading = false
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
    .spin{
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
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
