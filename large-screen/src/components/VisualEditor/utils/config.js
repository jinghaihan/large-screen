import _ from 'lodash'
import globalConfig from '../config/global'

export function handleConfigData (config, configMap, type) {
  if (!configMap[type]) return {}
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
    item.component = []
    let data = { ..._.cloneDeep(globalConfig[item.key]), ..._.cloneDeep(config[item.key]) }
    configMap[type][item.key].config.forEach(key => {
      item[data[key].type].push({
        ...data[key],
        type: key,
        key
      })
    })
  })
  result[0].config = [_.cloneDeep(globalConfig.config['zIndex'])].concat(result[0].config)
  return result
}

export function handleVmData (data, vm) {
  Object.keys(data).forEach(item => {
    if (item.includes('vm-')) {
      let key = item.replace('vm-', '')
      recursive(key.split('-'), vm, data[item])
    }
  })

  function recursive (keys, target, data) {
    let key = keys[0]
    keys.splice(0, 1)
    if (keys.length) {
      recursive(keys, target[key], data)
    } else {
      if (key.match(/\?pixel/g)) {
        key = key.replace(/\?pixel/g, '')
        target[key] = data + 'px'
      } else {
        target[key] = (data && data.hex) ? (data.hex8 || data.hex) : data
      }
    }
  }
}

export function triggerCellUpdate (cell, componentType) {
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

export function setCell (config, vm) {
  Object.keys(vm.cell).forEach(key => {
    // 获取配置
    let cell = config.searchs[key] || config.views[key]
    // 样式配置
    vm.cell[key].configData = {
      ...vm.cell[key].configData,
      switchKeys: cell.style.switchKeys,
      collapseKeys: cell.style.collapseKeys,
      configData: cell.style.ui
    }

    // 数据模型配置
    switch (vm.cell[key].componentType) {
      // 查询组件
      case 'search':
        if (vm.cell[key].type !== 'searchPanel' && vm.cell[key].type !== 'conditionPanel') {
          setSearchCellData(vm.cell[key].configData, _.cloneDeep(cell.data))
        } else {
          setViewsCellData(vm.cell[key].configData, _.cloneDeep(cell.data))
        }
        break
      // 表格组件
      case 'table':
        setTableCellData(vm.cell[key].configData, _.cloneDeep(cell.data))
        break
      // 其余组件
      default:
        setViewsCellData(vm.cell[key].configData, _.cloneDeep(cell.data))
        break
    }

    triggerCellUpdate(vm.cell[key], vm.cell[key].componentType)
  })
}

// chart / decoration / media / text
export function setViewsCellData (config, data) {
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
export function setSearchCellData (config, data) {
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
export function setTableCellData (config, data) {
  let dataModelData = {}
  let globalData = {
    isGroupBy: data.isGroupBy,
    order: data.order
  }

  Object.keys(data.data).forEach(coord => {
    dataModelData[coord] = {
      isGroupBy: globalData.isGroupBy,
      orderType: globalData.order ? globalData.order.orderType : undefined,
      orderFieldId: globalData.order ? globalData.order.filedId + '-' + globalData.order.filedType : undefined,
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
