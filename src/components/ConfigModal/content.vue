<template>
  <div ref="container"
      class="config-container"
      id="config-container">
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
        <div class="toolbox-container">
          <Toolbox :layout="layout"
                    :layer="layer"
                    :scale="scale"
                    @create-layer="onCreateLayer"
                    @change-layer="onChangeLayer"
                    @change-scale="onChangeScale"></Toolbox>
        </div>
        <div class="operation-container">
          <a-switch checked-children="深色" un-checked-children="浅色" @change="onSwitchTheme"/>
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
                          :colNum="colNum"
                          :layer="layer"
                          :root="getRootRef()"></ComponentPanel>
        </div>
        <div class="paper-container">
          <!-- 画布 -->
          <div class="paper">
            <Paper ref="paper"
                    :layout="layout"
                    :layer="layer"
                    :maxLayer="maxLayer"
                    :scale="scale"
                    :ratio="ratio"
                    :colNum="colNum"
                    :grid="grid"
                    :component="component"
                    :theme="theme"
                    :root="getRootRef()"
                    @rendered="onPaperRenderd"></Paper>
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
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import keyboard from 'keyboardjs'
import Paper from './paper/paper.vue'
import Toolbox from './toolbox/toolbox.vue'
import ComponentPanel from './panel/component.vue'
import { getKey } from './utils'
import './theme.less'

export default {
  components: { Paper, Toolbox, ComponentPanel },
  data () {
    return {
      // 页面框架
      operation: {
        sidebar: [
          { name: '可视化组件', icon: 'area-chart', key: 'chart' },
          { name: '多媒体组件', icon: 'video-camera', key: 'multiMedia' },
          { name: '文本组件', icon: 'font-colors', key: 'text' }
        ],
        navbar: [
          { name: '截图', icon: 'picture', key: 'screenshot' },
          { name: '保存', icon: 'save', key: 'save' }
        ]
      },
      activeKey: 'chart',
      trigger: 'right',
      theme: 'light',
      // 画布
      layout: [],
      layer: 0,
      maxLayer: 5,
      ratio: { width: 16, height: 9 },
      scale: 1,
      colNum: 100,
      grid: false,
      component: {},
      // 面板
      panelVisible: false
    }
  },
  created () {
    this.layout.push({
      key: getKey(),
      name: '图层1',
      layout: []
    })
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
    onSwitchTheme (value) {
      let dom = this.$refs.container
      this.theme = value ? 'dark' : 'light'
      if (this.theme === 'dark') {
        dom.style.setProperty('--primary-color', '#151515')
        dom.style.setProperty('--normal-color', '#24282e')
        dom.style.setProperty('--shadow-color', '#080e15')
        dom.style.setProperty('--font-color', '#fff')
        dom.style.setProperty('--highlight-color', '#151515')
      } else {
        dom.style.setProperty('--primary-color', '#fff')
        dom.style.setProperty('--normal-color', '#f5f5f5')
        dom.style.setProperty('--shadow-color', '#f0f0f0')
        dom.style.setProperty('--font-color', '#333')
        dom.style.setProperty('--highlight-color', '#ddd')
      }
    },
    onPaperRenderd () {
      this.panelVisible = true
      this.grid = true
      this.initShortcutKey()
    },
    initShortcutKey () {
      keyboard.bind(['ctrl+shift > up', 'command+shift > up'], (e) => {
        this.onChangeScale('up')
      })
      keyboard.bind(['ctrl+shift > down', 'command+shift > down'], (e) => {
        this.onChangeScale('down')
      })
      keyboard.bind(['ctrl+shift > k', 'command+shift > k'], (e) => {
        this.grid = !this.grid
      })
    },
    onCreateLayer () {
      if (this.layout.length >= this.maxLayer) {
        this.$notification.error({ message: '错误', description: '最多支持5个图层' })
        return
      }
      this.layout.push({
        key: getKey(),
        name: '图层' + (this.layout.length + 1),
        layout: []
      })
      this.layer = this.layout.length - 1
    },
    onChangeLayer (key) {
      try {
        this.layout.forEach((data, index) => {
          if (data.key === key) {
            this.layer = index
            throw new Error()
          }
        })
      } catch (error) {}
    },
    onChangeScale (direction) {
      let scale = this.scale
      if (direction === 'up') {
        scale += 0.1
      } else {
        scale -= 0.1
      }
      if (scale < 0.5) scale = 0.5
      if (scale > 1.5) scale = 1.5
      this.scale = scale
    },
    updateSelectedComponent (el) {
      this.component = _.cloneDeep(el)
    },
    getRootRef () {
      return this
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
