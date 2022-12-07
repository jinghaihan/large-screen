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
      switch: null,
      collapse: null
    }

    this.init()
  }
  init () {
    this.component = require(`../component/Template/Decoration/index.vue`).default
  }
  update (data) {
    this.props = {
      component: this.props.component,
      primaryColor: data.primaryColor.hex || this.props.primaryColor,
      deputyColor: data.deputyColor.hex || this.props.deputyColor,
      duration: data.duration,
      reverse: data.reverse
    }
    this.vm.$refs.component.props = this.props
  }
  resize () {
    this.vm.$refs.component.resize()
  }
  setConfigData (data) {
    this.configData = _.cloneDeep({
      ...this.configData,
      ...data
    })
  }
}

export default Decoration
