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
    let data = { ..._.cloneDeep(globalConfig[item.key]), ..._.cloneDeep(config[item.key]) }
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
