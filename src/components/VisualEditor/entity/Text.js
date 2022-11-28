import _ from 'lodash'
import { config, configMap } from '../config/text'
import { upperCaseFirst } from '../utils'
import { handleConfigData } from '../utils/config'

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
    Object.keys(data).forEach(item => {
      recursive(item.split('-'), instance, data[item])
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
          target[key] = data && data.hex ? data.hex : data
        }
      }
    }
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
