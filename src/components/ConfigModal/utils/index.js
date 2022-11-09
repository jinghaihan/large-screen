export function getKey () {
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let maxPos = $chars.length
  let key = ''
  for (let i = 0; i < 32; i++) {
    key += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return key
}
