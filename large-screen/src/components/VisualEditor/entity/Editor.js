import _, { values } from 'lodash'
import moment from 'moment'
import hotkeys from 'hotkeys-js'
import { getImage, getPdf, downloadFile } from '../utils/output'
import config from '../config'

// 字体颜色
const fontColorList = [
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

class Editor {
  constructor (option) {
    this.instance = {}
    this.operation = { ...config.operation }
    this.config = { basic: config.basic, model: config.model }
    this.cell = {}
    this.clipBoard = {}
    this.maxClipBoard = 20
    this.builtinConditions = null
    // smartReport / complexReport / largeScreen / dashboard
    this.type = 'smartReport'
  }
  setInstance (data) {
    Object.keys(data).forEach(key => {
      this.instance[key] = data[key]
    })
  }
  initHotKey () {
    hotkeys('ctrl+up, command+up', (event) => {
      this.changeScale('up')
    })
    hotkeys('ctrl+down, command+down', (event) => {
      this.changeScale('down')
    })
    hotkeys('ctrl+shift+k, command+shift+k', (event) => {
      this.instance.editor.grid = _.cloneDeep({
        ...this.instance.editor.grid,
        show: !this.instance.editor.grid.show
      })
    })
    hotkeys('ctrl+c, command+c', async (event) => {
      let component = this.instance.editor.component
      let cell = this.cell[component.key]
      if (!component || !cell) {
        return
      }

      this.copyCell({
        ...cell.vm.data,
        props: {
          ...component,
          image: cell.componentType === 'chart' 
            ? cell.chart.getDataURL() 
            : (cell.type === 'video' ? cell.thumbnail : await getImage(cell.el))
        }
      })
    })
    hotkeys('delete, backspace', (event) => {
      this.deleteComponent()
    })
  }
  changeScale (type) {
    let scale = this.instance.editor.scale
    if (type === 'up') {
      scale += 0.1
    } else {
      scale -= 0.1
    }
    if (scale < 0.5) scale = 0.5
    if (scale > 1.5) scale = 1.5
    this.instance.editor.scale = scale
  }
  changeComponent (data) {
    let component = data && data.props ? data.props : {}
    this.instance.editor.component = _.cloneDeep(component)
  }
  deleteComponent (data) {
    if (this.instance.editor.component.key) {
      this.instance['layout'].$refs.layout.onDelete(this.instance.editor.component)
    }
  }
  async clear () {
    let instance = this.instance.editor
    instance.layout = []
    this.instance['layout'].$refs.layout.layout = []
    this.cell = {}
    this.changeComponent()
  }
  storeCell (data, cell) {
    this.cell[data.key] = cell
  }
  deleteCell (data) {
    if (data.type === 'searchPanel') {
      Object.keys(this.cell).forEach(key => {
        if (this.cell[key].componentType === 'search') {
          delete this.cell[key]
        }
      })
    }
    delete this.cell[data.key]
  }
  copyCell (data) {
    let key = data.props.name ? data.props.name + '-' + moment().format('HH:mm:ss') : moment().format('HH:mm:ss')
    this.clipBoard[key] = {
      name: key,
      type: data.props.type,
      image: data.props.image,
      col: 24,
      w: data.w,
      h: data.h,
      props: {
        componentType: data.props.componentType,
        parentKey: data.props.key
      }
    }
    let keys = Object.keys(this.clipBoard)
    if (keys.length > this.maxClipBoard) {
      delete this.clipBoard[keys[0]]
    }
    this.instance.editor.activeKey = 'clipBoard'
    // 刷新拖拽面板视图
    this.instance.dragPanel.$forceUpdate()
  }
  deleteClipBoardCell (data) {
    let _this = this
    _this.instance.editor.$confirm({
      title: `您确定删除${data.name}记录吗？`,
      content: '',
      confirmLoading: true,
      okText: '确定',
      cancelText: '取消',
      onOk () {
        let key = data.name
        delete _this.clipBoard[key]
        // 刷新拖拽面板视图
        _this.instance.dragPanel.$forceUpdate()
      },
      onCancel () { }
    })
  }
  changeRatio (data) {
    this.instance.editor.ratio = _.cloneDeep(data)
  }
  changeGrid (color) {
    this.instance.editor.grid = _.cloneDeep({
      ...this.instance.editor.grid,
      color: color
    })
  }
  changeBackground (image) {
    this.instance.layout.backgroundStyle = _.cloneDeep({
      ...this.instance.layout.backgroundStyle,
      backgroundImage: !image || image === 'none' ? 'none' : `url(${image})`
    })
  }
  batchEdit (data) {
    Object.keys(this.cell).forEach(key => {
      let componentType = this.cell[key].componentType
      let formData = _.cloneDeep(this.cell[key].configData.configData)
      switch (componentType) {
        case 'chart':
          this.batchEditChart(data, formData)
          break
        case 'text':
          this.batchEditText(data, formData)
          break
        default:
          break
      }
      this.cell[key].configData.configData = formData
      this.triggerCellUpdate(this.cell[key], componentType)
    })
  }
  batchEditChart (data, formData) {
    Object.keys(data).forEach(key => {
      switch (key) {
        case 'fontColor':
          Object.keys(formData).forEach(item => {
            if (fontColorList.includes(item)) {
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
  batchEditText (data, formData) {
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
  async output (type) {
    let data = await this.beforeExport()
    let base64
    switch (type) {
      case 'png':
        base64 = await getImage(this.instance.layout.$refs.paper, this.instance.layout.$refs.scale.transformScale)
        break
      case 'pdf':
        base64 = await getPdf(this.instance.layout.$el)
        break
      default:
        break
    }
    let fileName = this.instance.basicPanel.formData && this.instance.basicPanel.formData.name
      ? this.instance.basicPanel.formData.name : (type === 'png' ? '截图' : '文件')
    downloadFile(fileName + '-' + moment().format('HH:mm:ss') + `.${type}`, base64)

    this.afterExport(data)
  }
  async beforeExport () {
    let editor = this.instance.editor
    let grid = editor.grid

    this.changeComponent()
    editor.grid = _.cloneDeep({ ...editor.grid, show: false })

    await editor.$nextTick()

    return { grid }
  }
  afterExport (data) {
    let editor = this.instance.editor
    if (data.grid.show) {
      editor.grid = _.cloneDeep({ ...editor.grid, show: true })
    }
  }
  clearDataModelConfig () {
    // 清除默认数据限制器配置
    this.builtinConditions = null
    // 清除组件数据模型配置
    Object.keys(this.cell).forEach(key => {
      delete this.cell[key].configData.dataModelData
    })
    this.changeComponent()
  }
  notifyTableComponent (modelData) {
    Object.keys(this.cell).forEach(key => {
      if (this.cell[key].componentType === 'table') {
        this.cell[key].initDimensionAndMeasure(modelData)
      }
    })
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
    let style = this.instance.basicPanel.formData
    // 全局模型
    let data
    if (this.instance['model']) {
      data = {
        dataModel: {
          type: 'model',
          id: this.instance['model'].model
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
    }
    return { style, data }
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
  getCell (global) {
    const cell = {
      searchs: {},
      views: {},
      tables: {}
    }
    Object.keys(this.cell).forEach(key => {
      let { configData, dataModelData, theme, axisFlip } = this.cell[key].configData
      // 数据模型配置
      let config = { 
        type: this.cell[key].type,
        id: key,
        style: {
          ui: configData,
          switchKeys: this.cell[key].configData.switchKeys,
          collapseKeys: this.cell[key].configData.collapseKeys,
          theme,
          axisFlip
        },
        data: null
      }
      let target
      switch (this.cell[key].componentType) {
        // 查询组件
        case 'search':
          if (this.cell[key].type !== 'searchPanel' && this.cell[key].type !== 'conditionPanel') {
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
  // chart / decoration / media / text
  getViewsCellData (data) {
    if (!data) return {}

    // 维度配置
    const dimension = data.dimension.map(item => {
      let arr = item.split('-')
      return {
        fieldId: arr[2],
        id: arr[0],
        name: arr[1]
      }
    })
    delete data.dimension

    // 指标配置
    const measure = data.measure.map(item => {
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

    // 默认排序配置
    let arr = data.orderFieldId.split('-')
    const order = {
      fieldId: arr[2],
      fieldType: arr[3],
      orderType: data.orderType
    }
    delete data.orderType
    delete data.orderFieldId

    return { ...data, dimension, measure, order } 
  }
  // 除searchPanel和conditionPanel以为的查询组件
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
  // table
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
  // 回显
  async setConfig (config) {
    // 清空配置
    this.clear()

    config = JSON.parse(config)
    // 画布样式配置
    this.instance.basicPanel.$refs.formModel.form = config.global.style
    // 智能报表
    if (this.type === 'smartReport') {
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
    // TODO-dataModelData
    Object.keys(this.cell).forEach(key => {
      // 获取配置
      let cell = config.searchs[key] || config.views[key]
      this.cell[key].configData = {
        ...this.cell[key].configData,
        switchKeys: cell.style.switchKeys,
        collapseKeys: cell.style.collapseKeys,
        configData: cell.style.ui
      }
      this.triggerCellUpdate(this.cell[key], this.cell[key].componentType)
    })
  }
}

export default Editor
