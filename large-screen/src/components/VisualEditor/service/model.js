import request from '@/utils/request'

const url = 'mock'

export function getModelList (params) {
  return request.get(`/${url}/model/list`, { params: params })
}

export function getModelData (params) {
  return request.get(`/${url}/model/data`, { params: params })
}
