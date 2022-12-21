import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import domtoimage from 'dom-to-image'

export function downloadFile (fileName, content) {
  let aLink = document.createElement('a')
  let blob = base64ToBlob(content)
  let evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', true, true)
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  // aLink.dispatchEvent(evt);
  aLink.click()
}

export function base64ToBlob (code) {
  let parts = code.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1])
  let rawLength = raw.length
  let uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}

export function getImage (el, scale) {
  return new Promise((resolve, reject) => {
    domtoimage.toPng(el)
      .then(function (dataUrl) {
        resolve(dataUrl)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export function getPdf (el) {
  return new Promise((resolve, reject) => {
    html2Canvas(el).then(canvas => {
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
