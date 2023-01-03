<template>
  <a-tabs v-model="activeKey"
          v-if="configData.length"
          @change="onTabChange">
    <a-tab-pane v-for="tab in configData"
                :key="tab.key"
                :tab="tab.name">
      <!-- 基础类型 -->
      <div v-if="tab.config.length" class="component-basic-container">
        <FormModel ref="basicForm"
                   v-for="conf in tab.config"
                   :key="conf.key"
                   :config="conf.config || []"
                   @change="onChange">
        </FormModel>
      </div>
      <!-- 折叠面板类型 -->
      <a-collapse v-if="tab.collapse.length"
                  :activeKey="collapseKeys"
                  :bordered="false">
        <a-collapse-panel v-for="(collapse, index) in tab.collapse"
                          :key="collapse.key"
                          :header="collapse.name"
                          :disabled="collapse.switch ? !switchKeys.includes(collapse.key) : false">
          <div slot="extra"
               v-if="collapse.switch"
               @click="e => e.stopPropagation()">
            <a-switch :checked="switchKeys.includes(collapse.key)"
                      @change="onSwitch($event, collapse, index)"
                      size="small">
            </a-switch>
          </div>
          <FormModel ref="collapseForm"
                     :config="collapse.config || []"
                     @change="onChange">
          </FormModel>
        </a-collapse-panel>
      </a-collapse>
      <!-- 组件类型 -->
      <template v-if="tab.component.length">
        <div v-for="comp in tab.component"
             :key="comp.key">
          <component ref="component"
                     :is="comp.component"
                     v-bind="{
                      data: { component: comp.config },
                      entity,
                      component
                     }"
                     @change="onChange">
          </component>
        </div>
      </template>
    </a-tab-pane>
  </a-tabs>
  <div class="empty-container" v-else>
    <a-empty></a-empty>
  </div>
</template>

<script>
import _ from 'lodash'
import FormModel from '../FormModel/formModel.vue'
// 数据模型配置
import DataModel from '../DataModel'

export default {
  props: {
    entity: null,
    component: {
      type: Object,
      required: true
    }
  },
  components: { FormModel, DataModel },
  data () {
    return {
      cell: null,
      configData: [],
      activeKey: null,
      collapseKeys: [],
      switchKeys: [],
      // 简单表格/复杂表格选择
      sheetSelector: {}
    }
  },
  watch: {
    component: {
      deep: true,
      immediate: true,
      handler: function (curr, prev) {
        if (curr.key) {
          prev = prev || {}
          if (curr.key !== prev.key) {
            this.init()
          }
        } else {
          this.cell = null
          this.configData = []
          this.activeKey = null
          this.collapseKeys = []
          this.switchKeys = []
        }
      }
    }
  },
  created () {
    this.entity.setInstance({ componentPanel: this })
    this.onChange = _.debounce(this.onChange, 50)
  },
  methods: {
    onChange (value, fromComponent) {
      // 由维度变化更新label导致的change事件
      if (this.dimensionChangeFlag) {
        this.dimensionChangeFlag = false
        return
      }
      let formData = {}
      if (!fromComponent) {
        const formType = ['basicForm', 'collapseForm']
        formType.forEach(type => {
          if (this.$refs[type] && this.$refs[type].length) {
            let refs = this.$refs[type]
            refs.forEach(ref => {
              formData = { ...formData, ...ref.form }
            })
          }
        })
      } else {
        formData = value
      }
      
      switch (this.component.componentType) {
        case 'chart':
          if (!fromComponent) {
            this.cell.change(formData, this.switchKeys)
          }
          break
        default:
          this.cell.update(formData)
          break
      }
      let data = {
        collapseKeys: this.collapseKeys,
        switchKeys: this.switchKeys
      }
      data[this.activeKey + 'Data'] = formData
      this.cell.setConfigData(data)
    },
    async init () {
      await this.$nextTick()

      this.configData = []
      this.collapseKeys = []
      this.switchKeys = []
      this.cell = this.entity.cell[this.component.key]

      if (this.cell.config && this.cell.config.length) {
        this.initConfig()
        this.initKey()
        this.onChange()
      }
    },
    initConfig () {
      if (this.cell.configData[this.cell.config[0].key + 'Data']) {
        let keys = ['config', 'collapse']
        this.configData = this.cell.config.map(item => {
          let config = this.cell.configData[item.key + 'Data']
          keys.forEach(key => {
            if (item[key] && item[key].length) {
              item[key].forEach(data => {
                data.config.forEach(conf => {
                  conf.defaultValue = this.getValue(config[conf.key], conf.defaultValue)
                })
              })
            }
          })
          return item
        })
      } else {
        this.configData = _.cloneDeep(this.cell.config)
      }
    },
    getValue (value, defaultValue) {
      if (!value && typeof value !== 'boolean' && value !== 0) {
        return defaultValue
      }
      return value
    },
    initKey () {
      this.activeKey = this.configData[0].key
      let switchKeys = this.cell.configData.switchKeys
      let collapseKeys = this.cell.configData.collapseKeys

      if (switchKeys || collapseKeys) {
        this.switchKeys = switchKeys
        this.collapseKeys = collapseKeys
      } else {
        this.configData.forEach(conf => {
          if (conf.collapse) {
            conf.collapse.forEach(collapse => {
              if (collapse.switch && collapse.defaultValue) {
                this.switchKeys.push(collapse.key)
                this.collapseKeys.push(collapse.key)
              }
              if (!collapse.switch) {
                this.collapseKeys.push(collapse.key)
              }
            })
          }
        })
      }
    },
    onTabChange () {
      this.initConfig()
    },
    async onSwitch (checked, collapse, index) {
      if (checked) {
        this.switchKeys.push(collapse.key)
        this.collapseKeys.push(collapse.key)
      } else {
        this.switchKeys = this.switchKeys.filter(key => key !== collapse.key)
        this.collapseKeys = this.collapseKeys.filter(key => key !== collapse.key)
      }
      await this.$nextTick()
      this.onChange()
    },
    // 模型配置-模型选择
    onModelChange () {
      let refs = this.$refs.component
      if (refs && refs.length) {
        refs.forEach(ref => {
          if (ref.onModelChange) {
            ref.onModelChange()
          }
        })
      }
    },
    // 表格配置-表格选择
    onSheetChange (data) {
      this.sheetSelector = data
      let refs = this.$refs.component
      if (refs && refs.length) {
        refs.forEach(ref => {
          if (ref.onSheetChange) {
            ref.onSheetChange(data)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .empty-container{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/.ant-collapse-content-box{
    padding: 0;
  }
</style>
