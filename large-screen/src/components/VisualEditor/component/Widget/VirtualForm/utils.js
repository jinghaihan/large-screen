export function getUniqueKey (len) {
  len = len || 32
  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let maxPos = $chars.length
  let key = ''
  for (let i = 0; i < len; i++) {
    key += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return key
}

export function getFieldsValue (data) {
  let result = []
  data.forEach(item => {
    let formData = {}
    Object.keys(item).forEach(field => {
      if (field === 'key') return
      formData[field] = item[field].value
    })
    result.push(formData)
  })

  return result
}

export function getFieldError (current, errors) {
  return [...new Set(current.concat(errors))]
}
