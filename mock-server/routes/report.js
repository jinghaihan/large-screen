var express = require('express')
var router = express.Router()

// var Mock = require('mockjs')
// var Random = Mock.Random

let data = {
  'e66059084b21421ab0cf13aa5da96183': [
    {
      'M_2': 22,
      'D_0': '西城区',
      'M_6': 7,
      'D_2': '北京',
      'D_1': '202212',
      'M_0': 342
    },
    {
      'M_2': 25,
      'D_0': '东城区',
      'M_6': 7,
      'D_2': '北京',
      'D_1': '202212',
      'M_0': 421
    },
    {
      'M_2': 31,
      'D_0': '海淀区',
      'M_6': 8,
      'D_2': '北京',
      'D_1': '202212',
      'M_0': 298
    },
    {
      'M_2': 29,
      'D_0': '朝阳区',
      'M_6': 5,
      'D_2': '北京',
      'D_1': '202212',
      'M_0': 333
    },
    {
      'M_2': 12,
      'D_0': '攀枝花市',
      'M_6': 4,
      'D_2': '四川',
      'D_1': '202212',
      'M_0': 124
    },
    {
      'M_2': 21,
      'D_0': '成都市',
      'M_6': 3,
      'D_2': '四川',
      'D_1': '202212',
      'M_0': 211
    },
    {
      'M_2': 16,
      'D_0': '南充市',
      'M_6': 2,
      'D_2': '四川',
      'D_1': '202212',
      'M_0': 156
    },
    {
      'M_2': 18,
      'D_0': '乐山市',
      'M_6': 1,
      'D_2': '四川',
      'D_1': '202212',
      'M_0': 159
    }
  ]
}

router.post('/chart/data', (request, response) => {
  let query = request.body
  if (query.isCount) {
    response.json(
      {
        success: true,
        desc: '查询成功',
        data: {
          'dataCount': 100,
          'nextPageCount': 0,
          'data': null,
          'sql': null
        }
      }
    )
  } else {
    response.json(
      {
        success: true,
        desc: '查询成功',
        data: {
          dataCount: 0,
          nextPageCount: 0,
          data: data[query.chartId]
        }
      }
    )
  }
})

router.post('/table/data', (request, response) => {
  response.json(
    {
      success: true,
      desc: '查询成功',
      data: ''
    }
  )
})

module.exports = router
