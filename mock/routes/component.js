var express = require('express')
var router = express.Router()

var Mock = require('mockjs')
var Random = Mock.Random

// 图片列表
router.get('/image', (request, response) => {
  response.json(
    Mock.mock({
      success: true,
      desc: '查询成功',
      data: {
        count: Random.integer(20, 30),
        'rows|1-2': [
          {
            'id': '@guid()',
            'type': 'image',
            'src': 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            'col': 24,
            'w': 20,
            'h': 15
          }
        ]
      }
    })
  )
})

module.exports = router
