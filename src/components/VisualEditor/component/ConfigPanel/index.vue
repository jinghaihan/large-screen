<template>
  <div class="config-panel-container">
    <!-- 配置区域 -->
    <div class="config-container">
      <!-- 基础配置 -->
      <BasicPanel v-show="activeKey === 'basic'"
                  :editor="editor"
                  :ratio="ratio"
                  :grid="grid">
      </BasicPanel>
      <!-- 图层配置 -->
      <!-- 组件配置 -->
    </div>
    <!-- Tab切换 -->
    <div class="tab-container">
      <div :class="activeKey !== tab.key? 'tab' : 'tab tab-selected'"
           v-for="tab in editor.operation.configPanel"
           :key="tab.key"
           @click="onChange(tab)">
        {{tab.name}}
      </div>
    </div>
  </div>
</template>

<script>
import BasicPanel from './basicPanel.vue'

export default {
  props: {
    editor: null,
    ratio: {
      type: Object,
      required: true
    },
    grid: {
      type: Object,
      required: true
    }
  },
  components: { BasicPanel },
  data () {
    return {
      activeKey: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.editor.setInstance({ configPanel: this })
      this.activeKey = this.editor.operation.configPanel[0].key
    },
    onChange (tab) {
      this.activeKey = tab.key
    }
  }
}
</script>

<style lang="less" scoped>
  .config-panel-container{
    height: 100%;
    width: 100%;
    display: flex;
    .config-container{
      height: 100%;
      width: calc(~"100% - 26px");
      overflow-x: hidden;
      overflow-y: auto;
    }
    .tab-container{
      width: 26px;
      display: flex;
      flex-direction: column;
      border-left: 1px solid var(--highlight-color);
      .tab{
        cursor: pointer;
        text-align: center;
        padding: 12px 0;
        font-size: 13px;
        color: var(--font-color);
      }
      .tab-selected{
        background: #1890ff;
        color: #fff;
      }
    }
  }
  
</style>
