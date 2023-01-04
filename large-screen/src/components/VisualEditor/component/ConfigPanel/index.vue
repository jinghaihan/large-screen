<template>
  <div class="config-panel-container">
    <!-- 配置区域 -->
    <div class="config-container">
      <!-- 基础配置 -->
      <BasicPanel v-show="activeKey === 'basic'"
                  :entity="entity"
                  :ratio="ratio"
                  :grid="grid"
                  :paper="paper"
                  :tabBasicName="tabBasicName">
      </BasicPanel>
      <ModelPanel v-show="activeKey === 'model'"
                  :entity="entity"
                  :paper="paper"
      >
      </ModelPanel>
      <!-- 组件配置 -->
      <ComponentPanel v-show="activeKey === 'component'"
                      :entity="editor"
                      :component="component">
      </ComponentPanel>
    </div>
    <!-- Tab切换 -->
    <div class="tab-container">
      <div :class="activeKey !== tab.key? 'tab' : 'tab tab-selected'"
           v-for="tab in entity.operation.configPanel"
           :key="tab.key"
           @click="onChange(tab)">
        {{tab.name}}
      </div>
    </div>
  </div>
</template>

<script>
import BasicPanel from './Panel/basicPanel.vue'
import ComponentPanel from './Panel/componentPanel.vue'
import ModelPanel from './Panel/modelPanel.vue'

export default {
  props: {
    editor: null,
    entity: null,
    ratio: {
      type: Object,
      required: true
    },
    grid: {
      type: Object,
      required: true
    },
    component: {
      type: Object,
      required: true
    },
    paper: {
      type: String,
      required: true
    },
    tabBasicName: {
      type: String,
      required: true
    }
  },
  components: { BasicPanel, ComponentPanel, ModelPanel },
  data () {
    return {
      activeKey: null
    }
  },
  watch: {
    component: {
      deep: true,
      immediate: true,
      handler: function (data) {
        if (data.key) {
          this.activeKey = 'component'
        } else {
          if (this.activeKey === 'component') {
            this.activeKey = 'basic'
          }
        }
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.activeKey = this.entity.operation.configPanel[0].key
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
