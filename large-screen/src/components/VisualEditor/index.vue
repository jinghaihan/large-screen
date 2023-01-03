<template>
  <div class="visual-editor-container" id="visual-editor-container">
    <!-- 侧边栏 -->
    <div class="side-bar">
      <!-- 操作按钮 -->
      <div class="action-container">
        <div v-for="item in editor.operation.sidebar"
             :key="item.key"
             :class="activeKey === item.key && item.active
                    ? 'action action-active' : 'action'">
          <TooltipIcon :title="item.name"
                       :icon="item.icon"
                       placement="right"
                       @click="onOperation(item)">
          </TooltipIcon>
        </div>
      </div>
      <!-- 展开/收缩 -->
      <div class="trigger" @click="onTrigger('drag')">
        <TooltipIcon :icon="'double-' + trigger.drag"
                     :title="trigger.drag === 'right' ? '展开' : '收缩'">
        </TooltipIcon>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 导航栏 -->
      <div class="nav-bar">
        <!-- 模板库/主题库 -->
        <div class="library-container">
          <a-button v-for="item in editor.operation.library"
                    class="button"
                    size="small"
                    :key="item.key"
                    :icon="item.icon"
                    :type="item.type"
                    @click="onOperation(item)">
            {{item.name}}
          </a-button>
        </div>
        <!-- 工具 -->
        <ToolBox :entity="editor"
                 :layout="layout"
                 :scale="scale">
        </ToolBox>
        <!-- 操作按钮 -->
        <div class="action-container">
          <div v-for="item in editor.operation.navbar"
              :key="item.key"
              class="action">
            <TooltipIcon :title="item.name"
                        :icon="item.icon"
                        placement="bottom"
                        @click="onOperation(item)">
            </TooltipIcon>
          </div>
        </div>
      </div>
      <div class="content">
        <!-- 拖拽面板 -->
        <div ref="drag" class="drag-container">
          <DragPanel v-if="rendered"
                     :entity="editor"
                     :config="config.component"
                     :type="activeKey">
          </DragPanel>
        </div>
        <div ref="paper" class="paper-container">
          <!-- 画布 -->
          <Paper :entity="editor"
                 :layout="layout"
                 :scale="scale"
                 :ratio="ratio"
                 :grid="grid"
                 :component="component"
                 @rendered="onRendered"></Paper>
          <!-- 配置面板 -->
          <div ref="config" class="config-container">
            <ConfigPanel :entity="editor"
                         :layout="layout"
                         :ratio="ratio"
                         :grid="grid"
                         :component="component">
            </ConfigPanel>
            <!-- 展开/收缩 -->
            <div class="trigger" @click="onTrigger('config')">
              <TooltipIcon :icon="'double-' + trigger.config"
                          :title="trigger.config === 'right' ? '收缩' : '展开'">
              </TooltipIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 批量修改 -->
    <EditModal v-if="batchEditVisible" :entity="editor" @close="onModalClose"></EditModal>
    <!-- 模板库 -->
    <TemplateModal v-if="templateVisible" :entity="editor" @submit="onTemplateSubmit" @close="onModalClose"></TemplateModal>
    <!-- 默认数据限制器 -->
    <LimitModal v-if="limitVisible" :entity="editor" @close="onModalClose"></LimitModal>
    <!-- 预览 -->
    <ViewModal v-if="viewVisible" :entity="editor" :grid="grid" @close="onModalClose"></ViewModal>
  </div>
</template>

<script>
import $ from 'jquery'
import Editor from './entity/Editor'
import DragPanel from './component/DragPanel'
import Paper from './component/Paper'
import ConfigPanel from './component/ConfigPanel'
import ToolBox from './component/Widget/ToolBox'
import TooltipIcon from './component/Widget/TooltipIcon'
import EditModal from './component/Widget/EditModal'
import TemplateModal from './component/Widget/TemplateModal'
import LimitModal from './component/Widget/LimitModal'
import ViewModal from './component/Widget/ViewModal'
import config from './config'

export default {
  name: 'VisualEditor',
  components: {
    TooltipIcon,
    DragPanel,
    Paper,
    ToolBox,
    ConfigPanel,
    EditModal,
    TemplateModal,
    LimitModal,
    ViewModal
  },
  data () {
    return {
      editor: new Editor(),
      activeKey: null,
      trigger: { drag: 'left', config: 'right' },
      rendered: false,
      layout: [],
      scale: 1,
      ratio: { width: 16, height: 9 },
      grid: { show: false, count: 100, color: { r: 240, g: 240, b: 240, a: 1 } },
      component: {},
      config,
      // 弹窗
      batchEditVisible: false,
      templateVisible: false,
      themeVisible: false,
      limitVisible: false,
      viewVisible: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.editor.setInstance({ editor: this })
      this.activeKey = this.editor.operation.sidebar.find(item => item.active).key
    },
    // 操作
    onOperation (operation) {
      let _this = this
      if (operation.active) {
        _this.activeKey = operation.key
      }
      switch (operation.key) {
        // 批量修改
        case 'edit':
          _this.handleEdit()
          break
        // 截图
        case 'screenshot':
          this.editor.output('png')
          break
        // 导出pdf
        case 'pdf':
          this.editor.output('pdf')
          break
        // 保存
        case 'save':
          _this.handleSave()
          break
        // 退出
        case 'close':
          _this.handleClose()
          break
        // 模板库
        case 'template':
          _this.handleTemplate()
          break
        // 主题库
        case 'theme':
          _this.handleTheme()
          break
        // 默认数据限制器
        case 'limit':
          _this.handleLimit()
          break
        case 'view':
          _this.handleView()
          break
        default:
          break
      }
    },
    handleEdit () {
      this.editor.changeComponent()
      this.batchEditVisible = true
    },
    handleSave () {
      let config = this.editor.getConfig()

      console.log('handleSave', config)
    },
    handleClose () {
      let _this = this
      _this.$confirm({
        title: `您确定退出编辑吗？`,
        content: '未保存的数据将会丢失',
        confirmLoading: true,
        okText: '确定',
        cancelText: '取消',
        onOk () {
          _this.$emit('close')
        },
        onCancel () { }
      })
    },
    handleTemplate () {
      this.editor.changeComponent()
      this.templateVisible = true
    },
    handleTheme () {
      this.editor.changeComponent()
      this.themeVisible = true
    },
    handleLimit () {
      this.limitVisible = true
    },
    handleView () {
      this.viewVisible = true
    },
    // 展开/收缩
    onTrigger (type) {
      switch (type) {
        case 'drag':
          let drag = $(this.$refs.drag)
          let paper = $(this.$refs.paper)
          if (this.trigger.drag === 'right') {
            drag.css({ 'width': '240px', 'padding': '8px', 'transition': '0.3s' })
            paper.css({ 'width': 'calc(100% - 240px)', 'transition': '0.3s' })
            this.trigger.drag = 'left'
          } else {
            drag.css({ 'width': '0px', 'padding': '0px', 'transition': '0.3s' })
            paper.css({ 'width': '100%', 'transition': '0.3s' })
            this.trigger.drag = 'right'
          }
          break
        case 'config':
          let config = $(this.$refs.config)
          if (this.trigger.config === 'right') {
            config.css({ 'right': '-460px', 'transition': '0.3s' })
            this.trigger.config = 'left'
          } else {
            config.css({ 'right': '0px', 'transition': '0.3s' })
            this.trigger.config = 'right'
          }
          break
        default:
          break
      }
    },
    // 画布渲染完毕
    onRendered () {
      this.rendered = true
      this.editor.initHotKey()
      this.grid.show = true
    },
    onModalClose () {
      this.batchEditVisible = false
      this.templateVisible = false
      this.themeVisible = false
      this.limitVisible = false
      this.viewVisible = false
    },
    // 加载模板
    onTemplateSubmit (config) {
      this.editor.setConfig(config)
    }
  }
}
</script>

<style lang="less" scoped>
  #visual-editor-container{
    --primary-color: #fff;
    --normal-color: #f5f5f5;
    --shadow-color: #f0f0f0;
    --font-color: #333;
    --highlight-color: #ddd;
  }
  .visual-editor-container{
    height: 100%;
    display: flex;
    .side-bar{
      height: 100%;
      width: 45px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: var(--normal-color);
      color: var(--font-color);
      .trigger{
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .content-container{
      height: 100%;
      width: calc(~"100% - 45px");
      .nav-bar{
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 8px;
        background: var(--normal-color);
        .library-container{
          width: 240px;
          .button{
            margin-right: 8px;
          }
        }
        .action-container{
          width: 460px;
          display: flex;
          flex-direction: row;
          justify-content: right;
        }
      }
      .content{
        height: calc(~"100% - 45px");
        display: flex;
        background: var(--normal-color);
        .drag-container{
          height: 100%;
          width: 240px;
          overflow-x: hidden;
          overflow-y: auto;
          background: var(--primary-color);
        }
        .paper-container{
          position: relative;
          height: 100%;
          width: calc(~"100% - 240px");
          display: flex;
        }
        .config-container{
          height: 100%;
          width: 460px;
          z-index: 10;
          position: absolute;
          right: 0;
          background: var(--primary-color);
          box-shadow: 0px 3px 8px var(--shadow-color);
          .trigger{
            height: 80px;
            width: 26px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 20;
            position: absolute;
            top: 0;
            bottom: 0;
            left: -25px;
            margin: auto;
            font-size: 14px;
            border-radius: 5px 0 0 5px;
            background: var(--primary-color);
            color: var(--font-color);
            box-shadow: 0px 3px 8px var(--shadow-color);
          }
        }
      }
    }
  }
  /deep/.visual-editor-modal{
    padding-top: 100px;
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
    background: var(--primary-color);
    color: #1890ff;
  }
</style>
