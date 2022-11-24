import _, { map } from 'lodash'
import { config, configMap } from '../config/text'
import { upperCaseFirst } from '../utils'

class Text {
  constructor (data) {
    let { vm, key, type, parentConfig, parentConfigData } = data
    this.componentType = 'text'
    this.vm = vm
    this.key = key
    this.type = type
    this.component = null

    this.config = parentConfig || handleConfigData(this.type)
    this.configData = parentConfigData || {
      formData: null,
      switch: null,
      collapse: null
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
    this.component = require(`../component/Text/${value}.vue`).default
  }
  update (data) {
    this.vm.$refs.component.text = data.text
  }
  setConfigData (data) {
    this.configData = _.cloneDeep({
      ...data
    })
  }
}

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

export default Text
