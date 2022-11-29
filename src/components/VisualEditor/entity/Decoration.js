import { config, configMap } from '../config/decoration'
import { handleConfigData } from '../utils/config'

class Decoration {
  constructor (data) {
    let { vm, key, el, type, parentConfig, parentConfigData } = data
    this.componentType = 'decoration'
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
}
