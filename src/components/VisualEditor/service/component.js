import request from '@/utils/request'

const url = 'mock'

export function getImageComponent (params) {
  return request.get(`/${url}/component/image`, { params: params })
}

export function getVideoComponent (params) {
  return request.get(`/${url}/component/video`, { params: params })
}

export function getAudioComponent (params) {
  return request.get(`/${url}/component/audio`, { params: params })
}
