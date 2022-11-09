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
    <div ref="container" class="container" id="config-container">
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
            <a-switch checked-children="深色" un-checked-children="浅色" @change="onTheme"/>
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
            <ComponentPanel v-if="panelVisible"
                            :layout="layout"
                            :colNum="colNum"
                            :root="getRef()"
                            @drop="onDrop"></ComponentPanel>
          </div>
          <div class="paper-container">
            <!-- 画布 -->
            <div class="paper">
              <Paper ref="paper"
                     :layout="layout"
                     :colNum="colNum"
                     @rendered="onPaperRendered"></Paper>
            </div>
            <!-- 表单面板 -->
            <div class="form-container" id="form-container">
              <div class="trigger-container" @click="onTrigger">
                <tooltip-icon :icon="'double-' + trigger"
                              :title="trigger === 'right' ? '收缩' : '展开'" >
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
import _ from 'lodash'
import Paper from './paper/paper.vue'
import ComponentPanel from './panel/component/dragEl.vue'

export default {
  name: 'configModal',
  components: { Paper, ComponentPanel },
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
          { name: '清空', icon: 'delete', key: 'delete' },
          { name: '保存', icon: 'save', key: 'save' }
        ]
      },
      activeKey: 'chart',
      trigger: 'right',
      theme: 'light',
      // 画布
      layout: [],
      colNum: 100,
      // 面板
      panelVisible: false
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
    onTheme (value) {
      let dom = this.$refs.container
      this.theme = value ? 'dark' : 'light'
      if (this.theme === 'dark') {
        dom.style.setProperty('--background-color', '#151515')
        dom.style.setProperty('--bar-color', '#151515')
        dom.style.setProperty('--paper-container-color', '#151515')
        dom.style.setProperty('--paper-color', '#080e15')
        dom.style.setProperty('--panel-color', '#24282e')
        dom.style.setProperty('--active-color', '#24282e')
        dom.style.setProperty('--icon-color', '#fff')
        dom.style.setProperty('--shadow-color', '#080e15')
      } else {
        dom.style.setProperty('--background-color', '#fff')
        dom.style.setProperty('--bar-color', '#f5f5f5')
        dom.style.setProperty('--paper-container-color', '#f5f5f5')
        dom.style.setProperty('--paper-color', '#fff')
        dom.style.setProperty('--panel-color', '#fff')
        dom.style.setProperty('--active-color', '#fff')
        dom.style.setProperty('--icon-color', '#333')
        dom.style.setProperty('--shadow-color', '#f0f0f0')
      }
    },
    closeModal (refresh) {
      this.$emit('close', refresh)
    },
    onPaperRendered () {
      this.panelVisible = true
    },
    onDrop (layout) {
      this.layout = _.cloneDeep(layout)
    },
    getRef () {
      return this
    }
  }
}
</script>

<style lang="less" scoped>
  #config-container{
    --background-color: #fff;
    --bar-color: #f5f5f5;
    --paper-container-color: #f5f5f5;
    --paper-color: #fff;
    --panel-color: #fff;
    --active-color: #fff;
    --icon-color: #333;
    --shadow-color: #f0f0f0;
  }
  /deep/.ant-modal-body{
    padding: 0;
  }
  .container{
    height: 100%;
    display: flex;
    .side-bar{
      height: 100%;
      width: 45px;
      background: var(--bar-color);
      color: var(--icon-color);
    }
    .content{
      height: 100%;
      width: calc(~"100% - 45px");
      .nav-bar{
        height: 45px;
        background: var(--bar-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        .operation-container{
          height: 100%;
          display: flex;
          align-items: center;
          color: var(--icon-color);
        }
      }
      .config-container{
        height: calc(~"100% - 45px");
        background: var(--background-color);
        display: flex;
        .component-container{
          height: 100%;
          width: 280px;
          background: var(--panel-color);
          padding: 8px;
        }
        .paper-container{
          position: relative;
          height: 100%;
          width: calc(~"100% - 280px");
          background: var(--paper-container-color);
          display: flex;
          .paper{
            height: 100%;
            width: 100%;
          }
          .form-container{
            z-index: 100;
            position: absolute;
            right: 0;
            height: 100%;
            width: 460px;
            background: var(--panel-color);
            box-shadow: 0px 3px 8px var(--shadow-color);
            .trigger-container{
              z-index: 100;
              position: absolute;
              top: 0;
              bottom: 0;
              left: -25px;
              margin: auto;
              background: var(--panel-color);
              width: 45px;
              height: 45px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              color: var(--icon-color);
              font-size: 18px;
              box-shadow: 0px 3px 8px var(--shadow-color);
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
      background: var(--active-color);
      color: #1890ff;
    }
  }
</style>
