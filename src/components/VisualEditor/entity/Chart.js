import _ from 'lodash'
import * as Echarts from 'echarts'
// Echarts主题
import 'echarts/theme/macarons'
import 'echarts/theme/infographic'
import 'echarts/theme/shine'
import 'echarts/theme/roma'
// Echarts地图
import chinaMap from '@/assets/VisualEditor/map/china.json'

import { option, config, configMap } from '../config/chart'

Echarts.registerMap('china', chinaMap)

class Chart {
  constructor (data) {
    let { vm, key, el, type, parentOption, parentConfig, parentConfigData } = data
    this.componentType = 'chart'
    this.vm = vm
    this.key = key
    this.el = el
    this.type = type
    this.option = parentOption || _.cloneDeep(option[this.type])
    this.chart = null

    this.config = parentConfig || handleConfigData(this.type)
    this.configData = parentConfigData || {
      theme: 'default',
      axisFlip: null,
      formData: null,
      switch: null,
      collapse: null
    }

    this.init(this.configData.theme)
  }
  async init (theme) {
    if (this.chart) this.chart.dispose()
    this.configData.theme = theme || 'default'
    await this.vm.$nextTick()

    this.chart = Echarts.init(this.el, this.configData.theme)
    this.chart.setOption(this.option)
  }
  update (option) {
    this.option = option
    if (this.chart) {
      this.chart.setOption(this.option, true)
    }
  }
  resize () {
    this.chart.resize()
  }
  change (data, type, switchKeys) {
    if (data.theme && data.theme !== this.configData.theme) {
      this.init(data.theme)
    }
    let option = handleOption(data, this.option)
    // 区域缩放
    handleDataZoomOption(data, option)
    // 坐标轴翻转
    handleAxisFlipOption(data, option, this)
    // 半径
    handleRadiusOption(data, option)
    // 清除无用配置
    handleUselessOption(type, option, this.config, switchKeys)

    this.update(option)
  }
  changeAttr (data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key]
    })
  }
  setConfigData (data) {
    this.configData = _.cloneDeep({
      ...data,
      theme: this.configData.theme,
      axisFlip: this.configData.axisFlip
    })
  }
}

function handleOption (data, chartOption) {
  let option = { ...chartOption }
  let list = Object.keys(data)
  let whiteList = ['theme', 'dataZoomX', 'dataZoomXHeight', 'dataZoomY', 'dataZoomXWidth', 'axisFlip', 'radius', 'radiusInner', 'radiusOuter']
  
  list.forEach(key => {
    if (whiteList.includes(key)) return
    let keys = key.split('/').map(item => item.split('-'))
    let values = typeof data[key] === 'string' && data[key].includes('/') 
      ? data[key].split('/') : [data[key]]
    // 补全缺省
    if (values.length < keys.length) {
      for (let i = 0; i < keys.length - values.length; i++) {
        values.push(data[key])
      }
    }
    keys.forEach((item, index) => {
      recursive(item, option, values[index])
    })
  })

  function recursive (keys, option, data) {
    let key = keys[0]
    if (!option[key]) {
      option[key] = {}
    } else {
      // 数组类型-循环遍历
      if (option[key] instanceof Array) {
        keys.splice(0, 1)
        option[key].forEach(item => {
          recursive(keys, item, data)
        })
        return
      }
    }
    keys.splice(0, 1)
    if (keys.length) {
      recursive(keys, option[key], data)
    } else {
      if (data || data === 0 || typeof data === 'boolean') {
        if (key.match(/\?percent/g)) {
          key = key.replace(/\?percent/g, '')
          option[key] = data + '%'
        } else {
          option[key] = data.hex ? data.hex : data
        }
      } else {
        delete option[key]
      }
    }
  }

  return option
}

// 区域缩放
function handleDataZoomOption (data, chartOption) {
  delete chartOption.dataZoom
  if (data.dataZoomX) {
    if (!chartOption.dataZoom) chartOption.dataZoom = []
    chartOption.dataZoom.push({
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'none',
      height: data.dataZoomXHeight || 15
    })
    chartOption.dataZoom.push({
      type: 'inside',
      xAxisIndex: 0,
      filterMode: 'none'
    })
  }
  if (data.dataZoomY) {
    if (!chartOption.dataZoom) chartOption.dataZoom = []
    chartOption.dataZoom.push({
      type: 'slider',
      yAxisIndex: 0,
      filterMode: 'none',
      width: data.dataZoomXWidth || 15
    })
    chartOption.dataZoom.push({
      type: 'inside',
      yAxisIndex: 0,
      filterMode: 'none'
    })
  }
}

// 坐标轴翻转
function handleAxisFlipOption (data, chartOption, vm) {
  if (data.axisFlip || typeof data.axisFlip === 'boolean') {
    if (data.axisFlip !== vm.configData.axisFlip && typeof vm.configData.axisFlip === 'boolean') {
      let xAxis = chartOption.yAxis
      let yAxis = chartOption.xAxis
      chartOption.xAxis = xAxis
      chartOption.yAxis = yAxis
    }
    vm.configData.axisFlip = data.axisFlip
  }
}

// 饼状图/环状图半径
function handleRadiusOption (data, chartOption) {
  if (data.radius) {
    // 饼状图
    chartOption.series.forEach(item => {
      item.radius = data.radius + '%'
    })
  }
  if (data.radiusInner && data.radiusOuter) {
    // 环状图
    chartOption.series.forEach(item => {
      item.radius = [data.radiusInner + '%', data.radiusOuter + '%']
    })
  }
}

// 删除无用配置
const mapDefaultList = [
  'map-geo-label',
  'map-geo-itemStyle',
  'map-geo-emphasis',
  'map-series-label',
  'map-series-itemStyle',
  'map-series-emphasis'
]
function handleUselessOption (type, chartOption, config, keys) {
  // 删除未激活折叠面板配置
  config.forEach(tab => {
    if (tab.collapse && tab.collapse.length) {
      tab.collapse.forEach(collapse => {
        if (collapse.key && !keys.includes(collapse.key) && collapse.switch) {
          delete chartOption[collapse.key]
          // 地图类型-还原默认配置
          handleMapDefaultOption(collapse.key)
        }
      })
    }
  })

  function handleMapDefaultOption (key) {
    if (mapDefaultList.includes(key)) {
      switch (key) {
        case 'map-geo-label':
          chartOption.geo.label = _.cloneDeep(option[type].geo.label)
          break
        case 'map-geo-itemStyle':
          chartOption.geo.itemStyle = _.cloneDeep(option[type].geo.itemStyle)
          break
        case 'map-geo-emphasis':
          chartOption.geo.emphasis = _.cloneDeep(option[type].geo.emphasis)
          break
        case 'map-series-label':
          chartOption.series.forEach(item => {
            item.label = _.cloneDeep(option[type].series[0].label)
          })
          break
        case 'map-series-itemStyle':
          chartOption.series.forEach(item => {
            item.itemStyle = _.cloneDeep(option[type].series[0].itemStyle)
          })
          break
        case 'map-series-emphasis':
          chartOption.series.forEach(item => {
            item.emphasis = _.cloneDeep(option[type].series[0].emphasis)
          })
          break
        default:
          break
      }
    }
  }
}

// 配置面板数据
function handleConfigData (type) {
  let result = []
  Object.keys(configMap[type]).forEach(key => {
    result.push({
      name: configMap[type][key].name,
      key: key
    })
  })
  result.forEach(item => {
    item.config = []
    item.collapse = []
    let data = _.cloneDeep(config[item.key])
    configMap[type][item.key].config.forEach(key => {
      item[data[key].type].push({
        ...data[key],
        type: key,
        key
      })
    })
  })
  return result
}

export default Chart
