import _ from 'lodash'
import globalConfig from '../config/config'

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
    let data = { ...globalConfig[item.key], ..._.cloneDeep(config[item.key]) }
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
