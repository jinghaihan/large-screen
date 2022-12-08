import _ from 'lodash'
import { v4 as uuid } from 'uuid'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export function getUUID () {
  return uuid().replace(/-/g, '')
}

export function getImage (el, ratio) {
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

export function getPdf (el, ratio) {
  return new Promise((resolve, reject) => {
    html2Canvas(el, {
      allowTaint: false,
      taintTest: false,
      logging: false,
      useCORS: true,
      dpi: window.devicePixelRatio * ratio || 2,
      scale: ratio || 2,
      height: el.scrollHeight,
      windowHeight: el.scrollHeight
    }).then(canvas => {
      let pdf = new JsPDF('p', 'mm', 'a4')
      let ctx = canvas.getContext('2d')
      let width = 190
      let height = 277
      let imgHeight = Math.floor(height * canvas.width / width)
      let renderedHeight = 0
      while (renderedHeight < canvas.height) {
        let page = document.createElement('canvas')
        page.width = canvas.width
        page.height = Math.min(imgHeight, canvas.height - renderedHeight)
 
        page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
        pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, width, Math.min(height, width * page.height / page.width))
 
        renderedHeight += imgHeight
        if (renderedHeight < canvas.height) {
          pdf.addPage()
        }
      }
      resolve(pdf.output('dataurlstring').substring(28))
    })
  })
}

export function upperCaseFirst (str) {
  str = str.toLowerCase()
  return str.replace(/\b\w|\s\w/g, fw => {
    return fw.toUpperCase()
  })
}
