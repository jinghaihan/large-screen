import _ from 'lodash'
import { config, configMap } from '../config/text'
import { upperCaseFirst } from '../utils'
import { handleConfigData, handleVmData } from '../utils/config'
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

    let props = { ...data }
    delete props['vm-border-component']
    handleVmData(props, this.vm.$refs.component)
    handleVmData({
      'vm-border-component': data['vm-border-component']
    }, this.vm, true)
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
