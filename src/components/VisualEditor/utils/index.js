import _ from 'lodash'
import { v4 as uuid } from 'uuid'
import html2Canvas from 'html2canvas'

export function getUUID () {
  return uuid()
}

export function getThumbnail (el, ratio) {
  return new Promise((resolve, reject) => {
    html2Canvas(el, {
      allowTaint: false,
      taintTest: false,
      logging: false,
      useCORS: true,
      dpi: window.devicePixelRatio * (ratio || 2),
      scale: ratio || 2,
      height: el.scrollHeight,
      windowHeight: el.scrollHeight
    }).then(canvas => {
      resolve(canvas.toDataURL('image/png'))
    })
  })
}

export function upperCaseFirst (str) {
  str = str.toLowerCase()
  return str.replace(/\b\w|\s\w/g, fw => {
    return fw.toUpperCase()
  })
}

export function handleConfigData (config, configMap, type) {
  if (!configMap[type]) return {}
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

export function getLineClamp (el, fontSize, lineHeight) {
  let rect = el.getBoundingClientRect()
  lineHeight = lineHeight || 1.5
  let count = rect.height / (fontSize * lineHeight)
  return Math.round(count) 
}
