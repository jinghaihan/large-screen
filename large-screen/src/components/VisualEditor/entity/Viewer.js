import _ from 'lodash'
import { getModelData } from '../service/model'

class Viewer {
  constructor (vm) {
    this.vm = vm
    this.instance = {}
    this.cell = {}
    // 父子维度联动
    this.searchObserver = {}
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
    Object.keys(this.cell).forEach(key => {
      // 获取配置
      let cell = config.searchs[key] || config.views[key]
      // 样式配置
      this.cell[key].configData = {
        ...this.cell[key].configData,
        switchKeys: cell.style.switchKeys,
        collapseKeys: cell.style.collapseKeys,
        configData: cell.style.ui
      }

      // 数据模型配置
      switch (this.cell[key].componentType) {
        // 查询组件
        case 'search':
          if (this.cell[key].type !== 'searchPanel' && this.cell[key].type !== 'conditionPanel') {
            this.setSearchCellData(this.cell[key].configData, _.cloneDeep(cell.data))
          } else {
            this.setViewsCellData(this.cell[key].configData, _.cloneDeep(cell.data))
          }
          break
        // 表格组件
        case 'table':
          this.setTableCellData(this.cell[key].configData, _.cloneDeep(cell.data))
          break
        // 其余组件
        default:
          this.setViewsCellData(this.cell[key].configData, _.cloneDeep(cell.data))
          break
      }

      this.triggerCellUpdate(this.cell[key], this.cell[key].componentType)
    })
  }
  // chart / decoration / media / text
  setViewsCellData (config, data) {
    let dataModelData = {}
    let fields = {}

    // 维度配置
    if (data.dimension) {
      dataModelData.dimension = data.dimension.map(item => {
        fields[item.fieldId] = {
          id: item.id,
          name: item.name
        }
        return item.id + '-' + item.name + '-' + item.fieldId
      })
      delete data.dimension
    }

    // 指标配置
    if (data.measure) {
      dataModelData.measure = data.measure.map(item => {
        fields[item.fieldId] = {
          id: item.id,
          name: item.name
        }
        return {
          fieldId: item.fieldId,
          measure: item.id + '-' + item.name,
          aggregationType: item.aggregationType,
          calculate: {
            calculation: item.calculation,
            number: item.number,
            aggregatePriority: item.aggregatePriority
          },
          point: {
            decimalPlace: item.decimalPlace,
            truncType: item.truncType
          }
        }
      })
      delete data.measure
    }

    // 默认排序配置
    if (data.order) {
      dataModelData.orderType = data.order.orderType
      dataModelData.orderFieldId = fields[data.order.fieldId].id + '-' + fields[data.order.fieldId].name + '-' + data.order.fieldId + '-' + data.order.fieldType
      delete data.order
    }

    config.dataModelData = { ...data, ...dataModelData }
  }
  // 除searchPanel和conditionPanel以为的查询组件
  setSearchCellData (config, data) {
    let dataModelData = {}

    // 数据模型
    if (data.dataModel) {
      dataModelData.dimension = data.dataModel.dimensionId
      dataModelData.defaultValue = data.dataModel.values.length > 1 ? data.dataModel.values : data.dataModel.values[0]
      delete data.dataModel
    }

    // 外链
    if (data.open) {
      dataModelData.isOpen = data.open.isOpen
      dataModelData.isLock = data.open.isLock
      dataModelData.isHide = data.open.isHide
      delete data.open
    }

    config.dataModelData = { ...data, ...dataModelData }
  }
  // table
  setTableCellData (config, data) {
    let dataModelData = {}
    let globalData = {
      isGroupBy: data.isGroupBy,
      order: data.order || {}
    }

    Object.keys(data.data).forEach(coord => {
      dataModelData[coord] = {
        orderType: globalData.order.orderType,
        orderFieldId: globalData.order.filedId + '-' + globalData.order.filedType,
        type: data.data[coord].type,
        fieldData: data.data[coord].type === 'text' ? data.data[coord].fieldData : data.data[coord].fieldId + '-' + data.data[coord].filedType,
        aggregationType: data.data[coord].aggregationType,
        calculate: {
          calculation: data.data[coord].calculation,
          number: data.data[coord].number,
          aggregatePriority: data.data[coord].aggregatePriority
        },
        point: {
          decimalPlace: data.data[coord].decimalPlace,
          truncType: data.data[coord].truncType
        }
      }
    })

    config.dataModelData = dataModelData
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
      // 枚举值
      let optionsType = ['select', 'select-multiple', 'radio', 'checkbox']
      if (optionsType.includes(cell.type)) {
        let options = config[key].values.map(item => {
          return {
            label: item['DISPLAY'],
            value: item['ACTUAL'],
            title: item['DISPLAY'],
            parent: item['PARENT']
          }
        })
        // 全量枚举值
        cell.vm.$refs.component.options = options
        cell.vm.$refs.component.setProps({ options })
      }
      
      // 父子维度联动
      let dataModelData = cell.configData.dataModelData
      if (dataModelData.hasParent) {
        if (!this.searchObserver[dataModelData.parentDim]) {
          this.searchObserver[dataModelData.parentDim] = {}
        }
        // 绑定事件回调
        this.searchObserver[dataModelData.parentDim][key] = cell.vm.$refs.component.observerCallback

        // 判断父维度当前值，获取父维度对应cell
        let parentKey = Object.keys(this.cell).find(key => {
          if (this.cell[key].configData.dataModelData.dimension === dataModelData.parentDim) return true
          return false
        })
        cell.vm.$refs.component.observerCallback(this.cell[parentKey].vm.$refs.component.value)
      }
    })
  }
}

export default Viewer
