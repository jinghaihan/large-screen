import _ from 'lodash'
import { config, configMap } from '../../config/search'
import { upperCaseFirst } from '../../utils'
import { handleConfigData, handleVmData } from '../../utils/config'
import { postChartData, postTableData } from '../../service/report'

class Search {
  constructor (data) {
    let { vm, key, el, type, props, parentConfig, parentConfigData } = data
    this.componentType = 'search'
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
    this.component = require(`../../component/Template/Search/${value}.vue`).default
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
  resize () {
    if (this.vm.$refs.component.resize) {
      this.vm.$refs.component.resize()
    }
  }
  setConfigData (data) {
    this.configData = _.cloneDeep({
      ...this.configData,
      ...data
    })
  }
  changeTimePicker (data) {
    this.vm.$refs.component.propsData = data
  }
  // 触发监听回调函数
  triggerObserver (observer, value) {
    if (observer) {
      let dimension = this.configData.dataModelData.dimension
      if (observer[dimension]) {
        Object.keys(observer[dimension]).forEach(key => {
          observer[dimension][key](value)
        })
      }
    }
  }
  handleSearch (entity) {
    let queryParmas = this.getQueryParams(entity)
    let queryTypes = ['table', 'chart']

    return Promise.all(Object.keys(entity.cell).map(key => {
      return new Promise(async (resolve, reject) => {
        let cell = entity.cell[key]
        // 非查询类型组件直接执行resolve
        if (!queryTypes.includes(cell.componentType)) {
          resolve()
          return
        }
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

        let data = this.responseHandler(response, reject, resolve, dataCount)
        cell.handleData(data, entity)

        resolve()
      })
    }))
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
  getQueryParams (entity) {
    let queryParmas = {}

    // 条件面板
    if (entity.instance['conditionPanel']) {
      let params = this.getConditionPanelParams(
        entity.instance['conditionPanel'].condition,
        entity.cell
      )
      queryParmas = params
    }
    // 查询参数
    queryParmas.filterConditions = this.getFilterConditions(entity.cell)

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
}

export default Search
