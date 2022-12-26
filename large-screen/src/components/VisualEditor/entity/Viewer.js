import { getModelData } from '../service/model'

class Viewer {
  constructor () {
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
    this.setCell(config)
  }
  async setGlobal (global) {
    if (global.data) {
      this.instance.modelPanel = {}
      if (global.data.dataModel.id) {
        this.instance.modelPanel.model = global.data.dataModel.id
        let res = await getModelData(global.data.dataModel.id)
        this.instance.modelPanel.modelData = res.data.data
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
}

export default Viewer
