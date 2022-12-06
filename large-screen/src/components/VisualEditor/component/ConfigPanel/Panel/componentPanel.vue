<template>
  <a-tabs v-model="activeKey" v-if="configData.length">
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
          <component :is="comp.component"
                     :data="{
                        component: comp.config
                     }">
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
import DataModel from '../../DataModel'

export default {
  props: {
    editor: null,
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
      switchKeys: []
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
    this.onChange = _.debounce(this.onChange, 50)
  },
  methods: {
    onChange () {
      let formData = {}
      const formType = ['basicForm', 'collapseForm']
      formType.forEach(type => {
        if (this.$refs[type] && this.$refs[type].length) {
          let refs = this.$refs[type]
          refs.forEach(ref => {
            formData = { ...formData, ...ref.form }
          })
        }
      })
      switch (this.component.componentType) {
        case 'chart':
          this.cell.change(formData, this.component.type, this.switchKeys)
          break
        default:
          this.cell.update(formData)
          break
      }
      let data = {
        collapse: this.collapseKeys,
        switch: this.switchKeys
      }
      data[this.activeKey + 'Data'] = formData
      this.cell.setConfigData(data)
    },
    async init () {
      await this.$nextTick()

      this.configData = []
      this.collapseKeys = []
      this.switchKeys = []
      this.cell = this.editor.cell[this.component.key]

      if (this.cell.config && this.cell.config.length) {
        this.initConfig()
        this.initKey()
        this.onChange()
      }

      console.log(this.configData)
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
      let switchKeys = this.cell.configData.switch
      let collapseKeys = this.cell.configData.collapse

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