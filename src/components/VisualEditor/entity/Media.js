import { upperCaseFirst } from '../utils'

class Meida {
  constructor (data) {
    let { vm, key, el, type, src, parentConfig, parentConfigData } = data
    this.componentType = 'media'
    this.vm = vm
    this.key = key
    this.el = el
    this.type = type
    this.src = src
    this.component = null

    this.config = parentConfig || {}
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
}

export default Meida
