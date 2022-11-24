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
