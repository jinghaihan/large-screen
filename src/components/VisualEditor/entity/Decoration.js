import _ from 'lodash'
import { config, configMap } from '../config/decoration'
import { handleConfigData, handleVmData } from '../utils/config'

class Decoration {
  constructor (data) {
    let { vm, key, el, type, props, parentConfig, parentConfigData } = data
    this.componentType = 'decoration'
    this.vm = vm
    this.key = key
    this.el = el
    this.type = type
    this.props = props
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
    this.component = require(`../component/Decoration/index.vue`).default
  }
  update (data) {
    this.props = {
      ...this.props,
      primaryColor: data.primaryColor.hex8 || data.primaryColor.hex || this.props.primaryColor,
      deputyColor: data.deputyColor.hex8 || data.deputyColor.hex || this.props.deputyColor
    }
    this.vm.$refs.component.props = this.props
  }
  resize () {
    this.vmm.$refs.component.resize()
  }
  setConfigData (data) {
    this.configData = _.cloneDeep({
      ...data
    })
  }
}

export default Decoration
