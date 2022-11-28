import request from '@/utils/request'

const url = 'mock'

export function getImageComponent (params) {
  return request.get(`/${url}/component/image`, { params: params })
}
