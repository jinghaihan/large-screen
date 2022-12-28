import request from '@/utils/request'

const url = 'mock'

export function postChartData (params) {
  return request({
    url: `/${url}/report/chart/data`,
    method: 'POST',
    data: params
  })
}

export function postTableData (params) {
  return request({
    url: `/${url}/report/table/data`,
    method: 'POST',
    data: params
  })
}
