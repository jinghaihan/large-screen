import _ from 'lodash'
import { config, configMap } from '../config/text'
import { handleConfigData, upperCaseFirst } from '../utils'

class Text {
  constructor (data) {
    let { vm, key, el, type, parentConfig, parentConfigData } = data
    this.componentType = 'text'
    this.vm = vm
    this.key = key
    this.el = el
    this.type = type
    this.component = null

    this.config = parentConfig || handleConfigData(config, configMap, this.type)
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
    if (!data) return
    let instance = this.vm.$refs.component
    instance.text = data.text
    instance.tooltip = data.tooltip
    const whiteList = ['text', 'tooltip']
    Object.keys(data).forEach(key => {
      if (!whiteList.includes(key)) {
        if (key.match(/\?pixel/g)) {
          instance.style[key.replace(/\?pixel/g, '')] = data[key] + 'px'
        } else {
          instance.style[key] = data[key].hex ? data[key].hex : data[key]
        }
      }
    })
  }
  resize () {
    this.update(this.configData.formData)
  }
  setConfigData (data) {
    this.configData = _.cloneDeep({
      ...data
    })
  }
}

export default Text
