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
    <div class="container">
      <!-- 侧边栏 -->
      <div class="side-bar">
        <div class="action">
          <tooltip-icon icon="rollback" title="返回" placement="right" @click="closeModal"></tooltip-icon>
        </div>
        <div :class="activeKey === icon.key ? 'action action-active' : 'action'"
             v-for="icon in operation['sidebar']"
             :key="icon.key">
          <tooltip-icon :title="icon.name"
                        :icon="icon.icon"
                         placement="right"
                        @click="onOperation(icon.key)">
          </tooltip-icon>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <!-- 顶部栏 -->
        <div class="nav-bar">
          <div class="template-container">
            <a-button size="small" icon="fund" type="primary">模板库</a-button>
          </div>
          <div class="operation-container">
            <div class="action"
                  v-for="icon in operation['navbar']"
                  :key="icon.key">
                <tooltip-icon :title="icon.name"
                              :icon="icon.icon"
                              placement="bottom">
                </tooltip-icon>
              </div>
          </div>
        </div>
        <!-- 配置区域 -->
        <div class="config-container">
          <!-- 组件面板 -->
          <div class="component-container">

          </div>
          <div class="paper-container">
            <!-- 画布 -->
            <div class="paper"></div>
            <!-- 表单面板 -->
            <div class="form-container" id="form-container">>
              <div class="trigger-container">
                <tooltip-icon :icon="'double-' + trigger"
                              :title="trigger === 'right' ? '收缩' : '展开'"
                              @click="onTrigger">
                </tooltip-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import $ from 'jquery'

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
      visible: true,
      operation: {
        sidebar: [
          { name: '图表', icon: 'area-chart', key: 'chart' },
          { name: '图片', icon: 'picture', key: 'picture' },
          { name: '文本', icon: 'font-colors', key: 'text' }
        ],
        navbar: [
          { name: '下载', icon: 'cloud-download', key: 'download' },
          { name: '保存', icon: 'save', key: 'save' }
        ]
      },
      activeKey: 'chart',
      trigger: 'right'
    }
  },
  methods: {
    onOperation (key) {
      this.activeKey = key
    },
    onTrigger () {
      let dom = $('#form-container')
      if (this.trigger === 'right') {
        dom.css({ 'right': '-460px', 'transition': '0.3s' })
        this.trigger = 'left'
      } else {
        dom.css({ 'right': '0px', 'transition': '0.3s' })
        this.trigger = 'right'
      }
    },
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
  .container{
    height: 100%;
    display: flex;
    .side-bar{
      height: 100%;
      width: 45px;
      background: #151515;
      color: #fff;
    }
    .content{
      height: 100%;
      width: calc(~"100% - 45px");
      .nav-bar{
        height: 45px;
        background: #151515;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        .operation-container{
          height: 100%;
          display: flex;
          color: #fff;
        }
      }
      .config-container{
        height: calc(~"100% - 45px");
        background: #141414;
        display: flex;
        .component-container{
          height: 100%;
          width: 280px;
          background: #24282e;
        }
        .paper-container{
          position: relative;
          height: 100%;
          width: calc(~"100% - 280px");
          .form-container{
            position: absolute;
            right: 0;
            height: 100%;
            width: 460px;
            background: #24282e;
            .trigger-container{
              position: absolute;
              top: 0;
              bottom: 0;
              left: -25px;
              margin: auto;
              background: #24282e;
              width: 45px;
              height: 45px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #fff;
              font-size: 18px;
            }
          }
        }
      }
    }
    .action{
      height: 45px;
      width: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
    .action-active{
      background: #24282e;
      color: #1890ff;
    }
  }
</style>
