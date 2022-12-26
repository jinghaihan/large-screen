import _ from 'lodash'
import { getModelData } from '../service/model'

class Viewer {
  constructor (vm) {
    this.vm = vm
    this.instance = {}
    this.cell = {}
  }
  setInstance (data) {
    Object.keys(data).forEach(key => {
      this.instance[key] = data[key]
    })
  }
  storeCell (data, cell) {
    this.cell[data.key] = cell
  }
  async setConfig (config) {
    // 全局模型/全局过滤条件
    await this.setGlobal(config.global)
    await this.setLayout(config.layout)

    await this.vm.$nextTick()
    this.setCell(config)
  }
  async setGlobal (global) {
    if (global.data) {
      if (global.data.dataModel.id) {
        if (!this.instance.model) this.instance.model = {}
        this.instance.model.model = global.data.dataModel.id
        let res = await getModelData(global.data.dataModel.id)
        this.instance.model.modelData = res.data.data
      }
      // 全局默认限制器
      if (global.data.builtinConditions) {
        this.builtinConditions = global.data.builtinConditions.map(data => {
          return {
            field: data.fieldId + '-' + data.fieldType,
            option: data.option,
            values: data.values.length > 1 ? JSON.stringify(data.values) : data.values[0]
          }
        })
      }
    }
  }
  async setLayout (data) {
    // 全局布局
    await this.instance.layout.onUpdate(data.paper || [])
    this.instance.layout.updatePromise = null
    // 查询面板布局
    if (this.instance.searchPanel) {
      await this.instance.searchPanel.onUpdate(data.searchs || [])
      this.instance.searchPanel.updatePromise = null
    }
  }
  setCell (config) {
    // TODO-dataModelData
    Object.keys(this.cell).forEach(key => {
      // 获取配置
      let cell = config.searchs[key] || config.views[key]
      if (cell) {
        this.cell[key].configData = {
          ...this.cell[key].configData,
          switchKeys: cell.style.switchKeys,
          collapseKeys: cell.style.collapseKeys,
          configData: cell.style.ui
        }
        this.triggerCellUpdate(this.cell[key], this.cell[key].componentType)
      }
    })
  }
  triggerCellUpdate (cell, componentType) {
    switch (componentType) {
      case 'chart':
        cell.change(
          cell.configData.configData,
          cell.configData.switchKeys
        )
        break
      default:
        cell.update(cell.configData.configData)
        break
    }
  }
  setSearch (config) {
    Object.keys(config).forEach(key => {
      let cell = this.cell[key]
      switch (cell.type) {
        case 'select':
          cell.vm.$refs.component.setOptions(config[key].values.map(item => {
            return {
              label: item['DISPLAY'],
              value: item['ACTUAL']
            }
          }))
          break
        default:
          break
      }
    })
  }
}

export default Viewer
