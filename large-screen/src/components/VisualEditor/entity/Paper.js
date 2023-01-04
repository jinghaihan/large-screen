import _ from 'lodash'
import { setCell } from '../utils/config'

const proxy = [
  'copyCell',
  'deleteClipBoardCell',
  'changeComponent',
  'changeRatio',
  'changeGrid',
  'triggerCellUpdate'
]
const fontColor = [
  'xAxis-axisLine-lineStyle-color/yAxis-axisLine-lineStyle-color',
  'legend-textStyle-color',
  'radar-axisName-color',
  'geo-emphasis-label-color',
  'geo-label-color',
  'series-label-color',
  'series-emphasis-label-color',
  'series-label-color',
  'series-detail-color',
  'series-axisLabel-color'
]

class Paper {
  constructor (option) {
    this.key = option.key
    this.instance = {}
    this.builtinConditions = null
    
    // 当前画布组件
    this.ownCell = {}
    this.configData = {}
    this.layout = option.layout || []
    this.editor = option.editor
    // 全量组件
    this.cell = option.editor.cell
    this.operation = option.editor.operation
    this.config = option.editor.config
    this.modelData = null

    proxyMethods(this, option.editor, proxy)
  }
  setInstance (data) {
    Object.keys(data).forEach(key => {
      this.instance[key] = data[key]
    })
  }
  storeCell (data, cell) {
    this.ownCell[data.key] = cell
    this.editor.storeCell(data, cell)
  }
  deleteCell (data) {
    if (data.type === 'searchPanel') {
      Object.keys(this.ownCell).forEach(key => {
        if (this.ownCell[key].componentType === 'search') {
          delete this.ownCell[key]
        }
      })
    }
    delete this.ownCell[data.key]

    this.editor.storeCell(data)
  }
  changeBackground (image) {
    this.instance.layout.backgroundStyle = _.cloneDeep({
      ...this.instance.layout.backgroundStyle,
      backgroundImage: !image || image === 'none' ? 'none' : `url(${image})`
    })
  }
  changeName (name) {
    let data = this.instance['editor'].paper.name
    data[this.key] = name
    this.instance['editor'].paper.name = { ...data }
  }
  notifyComponent (modelData) {
    // 通知条件面板实例
    if (this.instance['conditionPanel']) {
      this.instance['conditionPanel'].getModelConfig()
    }
    // 通知组件面板实例
    if (this.instance['componentPanel']) {
      this.instance['componentPanel'].onModelChange()
    }
    // 通知表格组件
    Object.keys(this.ownCell).forEach(key => {
      if (this.ownCell[key].componentType === 'table') {
        this.ownCell[key].initDimensionAndMeasure(modelData)
      }
    })
    this.modelData = { ...modelData }
  }
  clearModelConfig () {
    // 清除默认数据限制器配置
    this.builtinConditions = null
    // 清除组件数据模型配置
    Object.keys(this.ownCell).forEach(key => {
      delete this.ownCell[key].configData.dataModelData
    })
    this.changeComponent()
  }
  update (data) {
    Object.keys(data).forEach(key => {
      this.configData[key] = { ...data[key] }
    })
  }
  onTabChange () {
    // 基础配置
    if (this.instance['basicPanel']) {
      this.instance['basicPanel'].$refs.formModel.form = { ...this.configData.basic }
    }
    // 模型配置
    if (this.configData.model) {
      Object.keys(this.configData.model).forEach(key => {
        this.instance['model'][key] = _.cloneDeep(this.configData['model'][key])
      })
    }
  }
  // 保存
  getConfig () {
    let global = this.getGlobal()
    let cell = this.getCell(global.data)
    let config = {
      global: { style: global.style, data: global.data },
      layout: this.getLayout(),
      searchs: cell.searchs,
      views: { ...cell.views, ...cell.tables }
    }

    return config
  }
  getGlobal () {
    let style = this.configData.basic
    // 全局模型
    let data = {
      dataModel: {
        type: 'model',
        id: this.configData.model.model
      },
      builtinConditions: null
    }
    // 全局默认限制器
    if (this.builtinConditions) {
      data.builtinConditions = this.builtinConditions.map(data => {
        let arr = data.field.split('-')
        return {
          fieldId: arr[0],
          fieldType: arr[1],
          option: data.option,
          // 介于
          values: data.option === 'BETWEEN' ? JSON.parse(data.values) : [data.values]
        }
      })
    }
    return { style, data }
  }
  getCell (global) {
    const cell = {
      searchs: {},
      views: {},
      tables: {}
    }
    Object.keys(this.ownCell).forEach(key => {
      let { configData, dataModelData, theme, axisFlip } = this.ownCell[key].configData
      // 数据模型配置
      let config = { 
        type: this.ownCell[key].type,
        id: key,
        style: {
          ui: configData,
          switchKeys: this.ownCell[key].configData.switchKeys,
          collapseKeys: this.ownCell[key].configData.collapseKeys,
          theme,
          axisFlip
        },
        data: null
      }
      let target
      switch (this.ownCell[key].componentType) {
        // 查询组件
        case 'search':
          if (this.ownCell[key].type !== 'searchPanel' && this.ownCell[key].type !== 'conditionPanel') {
            target = 'searchs'
            config.data = this.getSearchCellData(_.cloneDeep(dataModelData))
          } else {
            target = 'views'
            config.data = this.getViewsCellData(_.cloneDeep(dataModelData))
          }
          break
        // 表格组件
        case 'table':
          target = 'tables'
          config.data = this.getTableCellData(_.cloneDeep(dataModelData))
          break
        // 其余组件
        default:
          target = 'views'
          config.data = this.getViewsCellData(_.cloneDeep(dataModelData))
          break
      }
      
      cell[target][key] = {
        ...config,
        data: {
          ...config.data,
          dataModel: config.data.dataModel
            ? { ...config.data.dataModel, ...global.dataModel } : global.dataModel,
          builtinConditions: global.builtinConditions
        }
      }
    })
    return cell
  }
  getViewsCellData (data) {
    if (!data) return {}
    let dimension
    let measure
    let order

    // 维度配置
    if (data.dimension) {
      dimension = data.dimension.map(item => {
        let arr = item.split('-')
        return {
          fieldId: arr[2],
          id: arr[0],
          name: arr[1]
        }
      })
      delete data.dimension
    }

    // 指标配置
    if (data.measure) {
      measure = data.measure.map(item => {
        let arr = item.measure.split('-')
        return {
          fieldId: item.fieldId,
          id: arr[0],
          name: arr[1],
          aggregationType: item.aggregationType,
          ...item.calculate,
          ...item.point
        }
      })
      delete data.measure
    }

    // 默认排序配置
    if (data.orderFieldId) {
      let arr = data.orderFieldId.split('-')
      order = {
        fieldId: arr[2],
        fieldType: arr[3],
        orderType: data.orderType
      }
      delete data.orderType
      delete data.orderFieldId
    }

    return { ...data, dimension, measure, order } 
  }
  getSearchCellData (data) {
    if (!data) return {}

    // 数据模型
    const dataModel = {
      dimensionId: data.dimension,
      values: data.defaultValue instanceof Array ? data.defaultValue : [data.defaultValue]
    }
    delete data.dimension
    delete data.defaultValue

    // 外链
    const open = {
      isOpen: data.isOpen,
      isLock: data.isLock,
      isHide: data.isHide
    }
    delete data.isOpen
    delete data.isLock
    delete data.isHide

    return { ...data, open, dataModel }
  }
  getTableCellData (data) {
    if (!data) return {}

    let globalData = {
      isGroupBy: null,
      order: null
    }

    Object.keys(data).forEach(coord => {
      let arr

      // 聚合配置
      globalData.isGroupBy = data[coord].isGroupBy
      delete data[coord].isGroupBy

      // 默认排序
      if (!globalData.order && data[coord].orderFieldId) {
        arr = data[coord].orderFieldId.split('-')
        const order = {
          fieldId: arr[0],
          fieldType: arr[1],
          orderType: data[coord].orderType
        }
        delete data[coord].orderFieldId
        delete data[coord].orderType
        globalData.order = order
      }

      // 字段配置
      let fieldData = {}
      if (data[coord].fieldData) {
        arr = data[coord].fieldData.split('-')
        fieldData = {
          type: data[coord].type,
          // 文字类型
          fieldData: arr.length > 1 ? undefined : arr[0],
          // 字段类型
          filedId: arr.length > 1 ? arr[0] : undefined,
          filedType: arr.length > 1 ? arr[1] : undefined,
          aggregationType: data[coord].aggregationType,
          ...data[coord].calculate,
          ...data[coord].point
        }
        delete data[coord].type
        delete data[coord].fieldData
        delete data[coord].aggregationType
        delete data[coord].calculate
        delete data[coord].point
      }

      data[coord] = { ...data[coord], ...fieldData }
    })

    return { ...globalData, data }
  }
  getLayout () {
    const layout = {
      paper: _.cloneDeep(this.instance.layout.$refs.layout.layout)
    }
    if (this.instance.searchPanel) {
      layout.searchs = _.cloneDeep(this.instance.searchPanel.layout)
    }

    return layout
  }
  // 回显
  async setConfig (config, type) {
    config = JSON.parse(config)
    // 画布样式配置
    this.instance.basicPanel.$refs.formModel.form = config.global.style
    // 智能报表
    if (type === 'smartReport' || type === 'complexReport') {
      // 全局模型/全局过滤条件
      this.setGlobal(config.global)
    }
    // layout布局
    await this.setLayout(config.layout)
    await this.instance.editor.$nextTick()
    // Cell配置
    this.setCell(config)
  }
  setGlobal (global) {
    // 全局模型
    if (this.instance['model']) {
      if (global.data.dataModel.id) {
        this.instance['model'].model = global.data.dataModel.id
        this.instance['model'].changeModel(global.data.dataModel.id)
      }
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
  async setLayout (data) {
    // 全局布局
    await this.instance.layout.$refs.layout.onUpdate(data.paper || [])
    this.instance.layout.$refs.layout.updatePromise = null
    // 查询面板布局
    if (this.instance.searchPanel) {
      await this.instance.searchPanel.onUpdate(data.searchs || [])
      this.instance.searchPanel.updatePromise = null
    }
  }
  setCell (config) {
    setCell(config, this)
  }
  // 批量修改
  edit (data) {
    Object.keys(this.ownCell).forEach(key => {
      let componentType = this.ownCell[key].componentType
      let formData = _.cloneDeep(this.ownCell[key].configData.configData)
      switch (componentType) {
        case 'chart':
          this.editChart(data, formData)
          break
        case 'text':
          this.editText(data, formData)
          break
        default:
          break
      }
      this.ownCell[key].configData.configData = formData
      this.triggerCellUpdate(this.ownCell[key], componentType)
    })
  }
  editChart (data, formData) {
    Object.keys(data).forEach(key => {
      switch (key) {
        case 'fontColor':
          Object.keys(formData).forEach(item => {
            if (fontColor.includes(item)) {
              formData[item] = data[key]
            }
          })
          break
        default:
          formData[key] = data[key]
          break
      }
    })
  }
  editText (data, formData) {
    Object.keys(data).forEach(key => {
      switch (key) {
        case 'fontColor':
          Object.keys(formData).forEach(item => {
            if (item.match(/-color/g)) {
              formData[item] = data[key]
            }
          })
          break
        default:
          formData[key] = data[key]
          break
      }
    })
  }
}

function proxyMethods (instance, target, methods) {
  methods.forEach(method => {
    instance[method] = target[method]
  })
}

export default Paper
