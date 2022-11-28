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

// 视频列表
router.get('/video', (request, response) => {
  response.json(
    Mock.mock({
      success: true,
      desc: '查询成功',
      data: {
        count: Random.integer(20, 30),
        'rows|1-2': [
          {
            'id': '@guid()',
            'type': 'video',
            'src': 'https://img-blog.csdnimg.cn/2019110817503031.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzE5NTUxMg==,size_16,color_FFFFFF,t_70',
            'col': 24,
            'w': 40,
            'h': 25,
            'props': {
              'src': 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
            }
          }
        ]
      }
    })
  )
})

// 音频列表
router.get('/audio', (request, response) => {
  response.json(
    Mock.mock({
      success: true,
      desc: '查询成功',
      data: {
        count: Random.integer(20, 30),
        'rows|1-2': [
          {
            'id': '@guid()',
            'type': 'audio',
            'src': 'http://vjs.zencdn.net/v/oceans.mp4',
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
