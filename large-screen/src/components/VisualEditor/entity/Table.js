import _ from 'lodash'
import { config, configMap } from '../config/table'
import { upperCaseFirst } from '../utils'
import { handleConfigData, handleVmData } from '../utils/config'

class Table {
  constructor (data) {
    let { vm, key, el, type, props, parentConfig, parentConfigData } = data
    this.componentType = 'table'
    this.vm = vm
    this.key = key
    this.el = el
    this.type = type
    this.props = {
      ...props,
      enable: true
    }
    this.component = null

    this.config = parentConfig || handleConfigData(config, configMap, this.type)
    this.configData = parentConfigData || {
      switchKeys: null,
      collapseKeys: null
    }

    this.init()
  }
  init () {
    let value = ''
    this.type.split('-').forEach((text, index) => {
      if (!index) {
        value += text
      } else {
        value += upperCaseFirst(text)
      }
    })
    this.component = require(`../component/Template/Table/${value}.vue`).default
  }
  initDimensionAndMeasure (modelData) {
    if (this.type === 'simpleTable') {
      // 首行展示dimension和measure
      if (modelData.dimensions && modelData.measures) {
        // dataModelData初始化 -> 调用loadData
        if (!this.configData.dataModelData) {
          this.configData.dataModelData = {}
        }
        let data = modelData.dimensions.concat(modelData.measures)
        data.forEach((item, col) => {
          this.configData.dataModelData['0-' + col] = {
            type: 'field',
            fieldData: item.id + '-' + item.name
          }
        })

        this.loadData()
      }
    }
  }
  update (data) {
    if (!data) return

    let props = { ...data }
    delete props['vm-border-component']
    delete props['vm-border-primaryColor']
    delete props['vm-border-deputyColor']
    delete props['vm-border-backgroundColor']
    delete props['vm-border-padding']
    handleVmData(props, this.vm.$refs.component)
    
    handleVmData({
      'vm-border-component': data['vm-border-component'],
      'vm-border-primaryColor': data['vm-border-primaryColor'],
      'vm-border-deputyColor': data['vm-border-deputyColor'],
      'vm-border-backgroundColor': data['vm-border-backgroundColor'],
      'vm-border-padding': data['vm-border-padding']
    }, this.vm)
  }
  loadData () {
    let sheetData = this.vm.$refs.component.$refs.sheet.xsSheet.getData()
    let rows = { len: 100 }
    // 整理rows数据
    Object.keys(this.configData.dataModelData).forEach(coord => {
      if (this.configData.dataModelData[coord].type && this.configData.dataModelData[coord].fieldData) {
        let pos = coord.split('-')
        if (!rows[pos[0]]) {
          rows[pos[0]] = { cells: {} }
        }
        if (!rows[pos[0]].cells[pos[1]]) {
          rows[pos[0]].cells[pos[1]] = {
            text: this.configData.dataModelData[coord].type === 'text'
              ? this.configData.dataModelData[coord].fieldData
              : '【' + this.configData.dataModelData[coord].fieldData.split('-')[1] + '】'
          }
        }
      }
    })
    sheetData.rows = rows
    this.vm.$refs.component.$refs.sheet.xsSheet.loadData(sheetData)
  }
  resize () {
    if (this.vm.$refs.component.resize) {
      this.vm.$refs.component.resize()
    }
  }
  setConfigData (data) {
    let dataModelData = {
      ...this.configData.dataModelData || {},
      ...data.dataModelData || {}
    }
    this.configData = _.cloneDeep({
      ...this.configData,
      ...data,
      dataModelData
    })

    this.loadData()
  }
}

export default Table
