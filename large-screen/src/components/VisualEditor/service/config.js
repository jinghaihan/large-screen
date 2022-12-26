import request from '@/utils/request'

const url = 'mock'

export function getConfigPaper (params) {
  return request.get(`/${url}/config/paper`, { params: params })
}

export function getConfigSearch (params) {
  return request.get(`/${url}/config/search`, { params: params })
}
