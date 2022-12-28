import _ from 'lodash'
import { getModelData } from '../service/model'
import { setCell, triggerCellUpdate } from '../utils/config'
import { postChartData, postTableData } from '../service/report'

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
    // 组件配置
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
    setCell(config, this)
  }
  triggerCellUpdate (cell, componentType) {
    triggerCellUpdate(cell, componentType)
  }
  setSearch (config) {
    this.defaultValue = {}
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
      this.defaultValue[key] = cell.configData.dataModelData.defaultValue
      
      // 父子维度联动
      this.triggerObserverCallback()
    })
  }
  triggerObserverCallback () {
    Object.keys(this.cell).forEach(key => {
      if (this.cell[key].componentType !== 'search') return
      if (this.cell[key].type === 'searchPanel' || this.cell[key].type === 'conditionPanel') return

      let cell = this.cell[key]
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
  // 查询
  handleSearch () {
    let queryParmas = this.getQueryParams()
    let queryTypes = ['table', 'chart']

    return Promise.all(Object.keys(this.cell).map(key => {
      return new Promise(async (resolve, reject) => {
        let cell = this.cell[key]
        // 非查询类型组件直接执行resolve
        if (!queryTypes.includes(cell.componentType)) {
          resolve()
          return
        }
        this.searchComponent(cell, queryParmas, resolve, reject)
        resolve()
      })
    }))
  }
  async searchComponent (cell, queryParmas, resolve, reject) {
    cell.handleLoading(true)
    let params = { ...queryParmas }
    let response
    // 表格类型数据量
    let dataCount
    // 表格类型
    if (cell.componentType === 'table') {
      params.currentPage = cell.vm.$refs.component.pagination.current - 1
      params.numberPerPage = cell.vm.$refs.component.pagination.pageSize

      // 先请求count-再请求报表内容
      if (cell.type === 'complexTable') {
        params.tableId = cell.key
        response = await postTableData({ ...params, isCount: true })
        if (!this.responseHandler(response, reject)) return
        dataCount = response.data.data
        // 复杂报表
        response = await postTableData(params)
      } else {
        params.chartId = cell.key
        response = await postChartData({ ...params, isCount: true })
        if (!this.responseHandler(response, reject)) return
        dataCount = response.data.data
        // 简单报表
        response = await postChartData(params)
      }
    } else {
      params.chartId = cell.key
      params.currentPage = 0
      params.numberPerPage = 100
      response = await postChartData(params)
    }

    cell.handleData(this.responseHandler(response, reject, resolve, dataCount), this)
    cell.handleLoading(false)
  }
  responseHandler (response, reject, resolve, dataCount) {
    let flag = true
    if (!response.data.success) {
      this.vm.$notification.error({ message: '错误', description: response.data.desc, duration: 0 })
      reject(new Error(response.data.desc))
      flag = false
    } else {
      if (resolve) {
        let data = { ...response.data.data }
        if (dataCount) {
          data.dataCount = dataCount.dataCount
          data.nextPageCount = dataCount.nextPageCount
        }
        return data
      }
    }
    return flag
  }
  getQueryParams () {
    let queryParmas = {}

    // 条件面板
    if (this.instance['conditionPanel']) {
      let params = this.getConditionPanelParams(
        this.instance['conditionPanel'].condition,
        this.cell
      )
      queryParmas = params
    }
    // 查询参数
    queryParmas.filterConditions = this.getFilterConditions(this.cell)

    return queryParmas
  }
  getConditionPanelParams (data, cell) {
    let queryParmas = {}
    // 维度
    queryParmas.dimensionIds = Object.keys(data[0].checked).map(key => {
      return key
    }).filter(key => key !== 'all')

    // 聚合配置
    let tableKey = Object.keys(cell).find(key => {
      if (cell[key].componentType === 'table') return true
      return false
    })
    let tableCell = cell[tableKey]
    let key = Object.keys(tableCell.configData.dataModelData)[0]
    queryParmas.isGroupBy = tableCell.configData.dataModelData[key].isGroupBy

    // 指标
    queryParmas.measureInfos = Object.keys(data[2].checked).map(key => {
      return {
        id: key,
        // 允许聚合-SUM
        aggregationType: queryParmas.isGroupBy === '1' ? 'SUM' : ''
      }
    }).filter(item => item.id !== 'all')

    return queryParmas
  }
  getFilterConditions (cell) {
    let filterConditions = []
     
    Object.keys(cell).forEach(key => {
      if (cell[key].componentType === 'search') {
        if (cell[key].type !== 'searchPanel' && cell[key].type !== 'conditionPanel') {
          let value = cell[key].vm.$refs.component.value
          filterConditions.push({
            fieldId: cell[key].configData.dataModelData.dimension,
            values: value instanceof Array ? value : [value]
          })
        }
      }
    })

    return filterConditions
  }
  // 重置
  handleReset () {
    Object.keys(this.defaultValue).forEach(key => {
      this.cell[key].vm.$refs.component.value = (!this.defaultValue[key] && this.defaultValue[key] !== 0) ? undefined : this.defaultValue
    })
    this.triggerObserverCallback()
  }
}

export default Viewer
