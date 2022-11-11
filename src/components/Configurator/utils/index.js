import html2Canvas from 'html2canvas'

export function getUUID () {
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let maxPos = $chars.length
  let key = ''
  for (let i = 0; i < 32; i++) {
    key += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return key
}

export function getThumbnail (dom, ratio) {
  return new Promise((resolve, reject) => {
    html2Canvas(dom, {
      allowTaint: false,
      taintTest: false,
      logging: false,
      useCORS: true,
      dpi: window.devicePixelRatio * (ratio || 2),
      scale: ratio || 2,
      height: dom.scrollHeight,
      windowHeight: dom.scrollHeight
    }).then(canvas => {
      resolve(canvas.toDataURL('image/png'))
    })
  })
}
