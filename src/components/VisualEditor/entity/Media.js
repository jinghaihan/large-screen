import _ from 'lodash'
import { config, configMap } from '../config/media'
import { upperCaseFirst } from '../utils'
import { handleConfigData, handleVmData } from '../utils/config'

class Meida {
  constructor (data) {
    let { vm, key, el, type, src, thumbnail, parentConfig, parentConfigData } = data
    this.componentType = 'media'
    this.vm = vm
    this.key = key
    this.el = el
    this.type = type
    this.src = src
    this.thumbnail = thumbnail
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
    this.type.split('-').forEach((item, index) => {
      if (!index) {
        value += item
      } else {
        value += upperCaseFirst(item)
      }
    })
    this.component = require(`../component/Media/${value}.vue`).default
  }
  update (data) {
    let instance = this.vm.$refs.component
    
    let props = { ...data }
    delete props['vm-border-component']
    handleVmData(props, this.vm.$refs.component)
    handleVmData({
      'vm-border-component': data['vm-border-component']
    }, this.vm, true)

    // 自动播放 / 循环播放
    if (data['vm-option-autoplay']) {
      instance.$refs.player.play()
    } else {
      if (!data['vm-option-loop']) {
        instance.$refs.player.pause()
      }
    }
  }
  setConfigData (data) {
    this.configData = _.cloneDeep({
      ...data
    })
  }
}

export default Meida
