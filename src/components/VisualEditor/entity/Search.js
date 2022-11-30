import _ from 'lodash'
import { config, configMap } from '../config/search'
import { upperCaseFirst } from '../utils'
import { handleConfigData, handleVmData } from '../utils/config'

class Search {
  constructor (data) {
    let { vm, key, el, type, props, parentConfig, parentConfigData } = data
    this.componentType = 'search'
    this.vm = vm
    this.key = key
    this.el = el
    this.type = type
    this.props = {
      ...props,
      enable: true
    }
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
    this.component = require(`../component/Search/${value}.vue`).default
  }
  update (data) {
    if (!data) return

    let props = { ...data }
    delete props['vm-border-component']
    delete props['vm-border-primaryColor']
    delete props['vm-border-deputyColor']
    delete props['vm-border-backgroundColor']
    delete props['vm-border-padding']
    handleVmData(props, this.vm.$refs.component)
    
    handleVmData({
      'vm-border-component': data['vm-border-component'],
      'vm-border-primaryColor': data['vm-border-primaryColor'],
      'vm-border-deputyColor': data['vm-border-deputyColor'],
      'vm-border-backgroundColor': data['vm-border-backgroundColor'],
      'vm-border-padding': data['vm-border-padding']
    }, this.vm)
  }
  resize () {

  }
  setConfigData (data) {
    this.configData = _.cloneDeep({
      ...data
    })
  }
}

export default Search