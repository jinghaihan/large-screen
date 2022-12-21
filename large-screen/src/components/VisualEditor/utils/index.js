import _ from 'lodash'
import { v4 as uuid } from 'uuid'

export function getUUID () {
  return uuid().replace(/-/g, '')
}

export function upperCaseFirst (str) {
  str = str.toLowerCase()
  return str.replace(/\b\w|\s\w/g, fw => {
    return fw.toUpperCase()
  })
}
