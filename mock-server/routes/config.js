var express = require('express')
var router = express.Router()

// var Mock = require('mockjs')
// var Random = Mock.Random

router.get('/paper', (request, response) => {
  response.json(
    {
      success: true,
      desc: '查询成功',
      data: '{"global":{"style":{"ratioWidth":16,"ratioHeight":9,"gridColor":{"rgba":{"r":240,"g":240,"b":240,"a":1}},"background":"none"},"data":{"dataModel":{"type":"model","id":"ff80808183d44d52018450ef1736000d"},"builtinConditions":null}},"layout":{"paper":[{"x":0,"y":0,"w":100,"h":10,"i":"6365efa1b5e847b794bab41718d563a3","props":{"key":"6365efa1b5e847b794bab41718d563a3","component":"Search","type":"conditionPanel","enable":false,"name":"条件面板","componentType":"search"}},{"x":0,"y":10,"w":100,"h":10,"i":"f04fa1ff22634963896a9fd0d383979f","props":{"key":"f04fa1ff22634963896a9fd0d383979f","component":"Search","type":"searchPanel","enable":false,"name":"查询面板","componentType":"search"}},{"x":0,"y":20,"w":100,"h":20,"i":"e66059084b21421ab0cf13aa5da96183","props":{"key":"e66059084b21421ab0cf13aa5da96183","component":"Table","type":"simpleTable","enable":false,"name":"简单表格","componentType":"table"}}],"searchs":[{"x":0,"y":0,"w":10,"h":5,"i":"ea6a2539b9a94ad3bba1eafd8b7dd1d9","props":{"key":"ea6a2539b9a94ad3bba1eafd8b7dd1d9","component":"Search","type":"select","enable":false,"name":"下拉框","componentType":"search"}},{"x":10,"y":0,"w":10,"h":5,"i":"2016b8fde5d543188dd5ecbf49698e3d","props":{"key":"2016b8fde5d543188dd5ecbf49698e3d","component":"Search","type":"select","enable":false,"name":"下拉框","componentType":"search"}},{"x":20,"y":0,"w":10,"h":5,"i":"bc6539b8773b40a9983afa8d93a89788","props":{"key":"bc6539b8773b40a9983afa8d93a89788","component":"Search","type":"time-picker","enable":false,"name":"时间选择框","componentType":"search"}}]},"searchs":{"ea6a2539b9a94ad3bba1eafd8b7dd1d9":{"type":"select","id":"ea6a2539b9a94ad3bba1eafd8b7dd1d9","style":{"ui":{"zIndex":0,"vm-props-label":"省份名称","vm-props-size":"default","vm-color-color":{"hex":"#000000A6"},"vm-color-placeholderColor":{"hex":"#808080"},"vm-color-backgroundColor":{"hex":"#fff"},"vm-color-borderColor":{"hex":"#d9d9d9"},"vm-border-component":"none","vm-border-padding":0,"vm-border-primaryColor":{"hex":"#4fd2dd"},"vm-border-deputyColor":{"hex":"#235fa7"},"vm-border-backgroundColor":{"hex":"#00000000"}},"switchKeys":[],"collapseKeys":["color","border"]},"data":{"isGroupBy":"1","required":false,"open":{"isOpen":false,"isLock":false,"isHide":false},"dataModel":{"dimensionId":"22469a2af0854f9483b9c2ed6c27a5a2","values":[null],"type":"model","id":"ff80808183d44d52018450ef1736000d"},"builtinConditions":null}},"2016b8fde5d543188dd5ecbf49698e3d":{"type":"select","id":"2016b8fde5d543188dd5ecbf49698e3d","style":{"ui":{"zIndex":0,"vm-props-label":"区县名称","vm-props-size":"default","vm-color-color":{"hex":"#000000A6"},"vm-color-placeholderColor":{"hex":"#808080"},"vm-color-backgroundColor":{"hex":"#fff"},"vm-color-borderColor":{"hex":"#d9d9d9"},"vm-border-component":"none","vm-border-padding":0,"vm-border-primaryColor":{"hex":"#4fd2dd"},"vm-border-deputyColor":{"hex":"#235fa7"},"vm-border-backgroundColor":{"hex":"#00000000"}},"switchKeys":[],"collapseKeys":["color","border"]},"data":{"isGroupBy":"1","required":false,"hasParent":true,"parentDim":"22469a2af0854f9483b9c2ed6c27a5a2","open":{"isOpen":false,"isLock":false,"isHide":false},"dataModel":{"dimensionId":"fe06af53bc404e3bbbcbb851fe310d4b","values":[null],"type":"model","id":"ff80808183d44d52018450ef1736000d"},"builtinConditions":null}},"bc6539b8773b40a9983afa8d93a89788":{"type":"time-picker","id":"bc6539b8773b40a9983afa8d93a89788","style":{"ui":{"zIndex":0,"vm-props-label":"时间","vm-props-size":"default","vm-color-color":{"hex":"#000000A6"},"vm-color-placeholderColor":{"hex":"#808080"},"vm-color-backgroundColor":{"hex":"#fff"},"vm-color-borderColor":{"hex":"#d9d9d9"},"vm-border-component":"none","vm-border-padding":0,"vm-border-primaryColor":{"hex":"#4fd2dd"},"vm-border-deputyColor":{"hex":"#235fa7"},"vm-border-backgroundColor":{"hex":"#00000000"}},"switchKeys":[],"collapseKeys":["color","border"]},"data":{"isGroupBy":"1","required":false,"format":"yyyyMMdd","open":{"isOpen":false,"isLock":false,"isHide":false},"dataModel":{"dimensionId":"9cd78dfbf42b49ea9c16fac2bc3810a2","values":[null],"type":"model","id":"ff80808183d44d52018450ef1736000d"},"builtinConditions":null}}},"views":{"6365efa1b5e847b794bab41718d563a3":{"type":"conditionPanel","id":"6365efa1b5e847b794bab41718d563a3","style":{"ui":{"zIndex":0,"vm-titleStyle-color":{"hex":"#fff"},"vm-titleStyle-backgroundColor":{"hex":"#1890ff"},"vm-columnStyle-color":{"hex":"#333"},"vm-columnStyle-backgroundColor":{"hex":"#fff"},"vm-columnStyle-tagColor":{"hex":"#1890ff"},"vm-columnStyle-tagHighlightColor":{"hex":"#fff"},"vm-border-component":"none","vm-border-padding":0,"vm-border-primaryColor":{"hex":"#4fd2dd"},"vm-border-deputyColor":{"hex":"#235fa7"},"vm-border-backgroundColor":{"hex":"#00000000"}},"switchKeys":[],"collapseKeys":["border"]},"data":{"dataModel":{"type":"model","id":"ff80808183d44d52018450ef1736000d"},"builtinConditions":null}},"f04fa1ff22634963896a9fd0d383979f":{"type":"searchPanel","id":"f04fa1ff22634963896a9fd0d383979f","style":{"ui":{"vm-button-right?pixel":0,"vm-button-bottom?pixel":0,"vm-button-margin?pixel":8,"vm-button-size":"default","vm-button-search":"primary","vm-button-reset":"default","zIndex":0,"vm-border-component":"none","vm-border-padding":0,"vm-border-primaryColor":{"hex":"#4fd2dd"},"vm-border-deputyColor":{"hex":"#235fa7"},"vm-border-backgroundColor":{"hex":"#00000000"}},"switchKeys":[],"collapseKeys":["border"]},"data":{"dataModel":{"type":"model","id":"ff80808183d44d52018450ef1736000d"},"builtinConditions":null}},"e66059084b21421ab0cf13aa5da96183":{"type":"simpleTable","id":"e66059084b21421ab0cf13aa5da96183","style":{"ui":{"zIndex":0,"vm-border-component":"none","vm-border-padding":0,"vm-border-primaryColor":{"hex":"#4fd2dd"},"vm-border-deputyColor":{"hex":"#235fa7"},"vm-border-backgroundColor":{"hex":"#00000000"}},"switchKeys":[],"collapseKeys":["border"]},"data":{"isGroupBy":"1","order":null,"data":{"0-0":{"loop":false,"type":"text","fieldData":"省份名称"},"1-0":{"type":"field","filedId":"22469a2af0854f9483b9c2ed6c27a5a2","filedType":"dimension"},"0-1":{"loop":false,"type":"text","fieldData":"时间"},"1-1":{"type":"field","filedId":"9cd78dfbf42b49ea9c16fac2bc3810a2","filedType":"dimension"},"0-2":{"loop":false,"type":"text","fieldData":"区县名称"},"1-2":{"type":"field","filedId":"fe06af53bc404e3bbbcbb851fe310d4b","filedType":"dimension"},"0-3":{"loop":false,"type":"text","fieldData":"省份id1"},"1-3":{"type":"field","filedId":"2686ffe65c35457fbd1e33f38806df37","filedType":"measure"},"0-4":{"loop":false,"type":"text","fieldData":"诈骗量"},"1-4":{"type":"field","filedId":"303133e0e12e4051afb81275a3f959a8","filedType":"measure"},"0-5":{"loop":false,"type":"text","fieldData":"区县id"},"1-5":{"type":"field","filedId":"76f078919cd345fe86aba9deba5fc769","filedType":"measure"},"0-6":{"loop":false,"type":"text","fieldData":"省份id"},"1-6":{"type":"field","filedId":"800a78be9a1b4ec98cd5a23ce0500143","filedType":"measure"},"0-7":{"loop":false,"type":"text","fieldData":"city_id"},"1-7":{"type":"field","filedId":"b06646c03bd6475e832b9c0eb41fa927","filedType":"measure"},"0-8":{"loop":false,"type":"text","fieldData":"关停号码量"},"1-8":{"type":"field","filedId":"b96a9b8c19dc434681d2239659204816","filedType":"measure"},"0-9":{"loop":false,"type":"text","fieldData":"province_id"},"1-9":{"type":"field","filedId":"bfcd467438424d0b9873cc843d8a3153","filedType":"measure"},"0-10":{"loop":false,"type":"text","fieldData":"诈骗类型"},"1-10":{"type":"field","filedId":"d9a7b0cc3cc04378966b0aad18ea7406","filedType":"measure"}},"dataModel":{"type":"model","id":"ff80808183d44d52018450ef1736000d"},"builtinConditions":null}}}}'
    }
  )
})

router.get('/search', (request, response) => {
  response.json(
    {
      success: true,
      desc: '查询成功',
      data: {
        'ea6a2539b9a94ad3bba1eafd8b7dd1d9': {
          'values': [
            {
              'ACTUAL': '1',
              'DISPLAY': '北京'
            },
            {
              'ACTUAL': '2',
              'DISPLAY': '四川'
            }
          ]
        },
        '2016b8fde5d543188dd5ecbf49698e3d': {
          'values': [
            {
              'ACTUAL': '1',
              'DISPLAY': '西城区',
              'PARENT': '1'
            },
            {
              'ACTUAL': '2',
              'DISPLAY': '东城区',
              'PARENT': '1'
            },
            {
              'ACTUAL': '3',
              'DISPLAY': '海淀区',
              'PARENT': '1'
            },
            {
              'ACTUAL': '4',
              'DISPLAY': '朝阳区',
              'PARENT': '1'
            },
            {
              'ACTUAL': '11',
              'DISPLAY': '攀枝花市',
              'PARENT': '2'
            },
            {
              'ACTUAL': '12',
              'DISPLAY': '成都市',
              'PARENT': '2'
            },
            {
              'ACTUAL': '13',
              'DISPLAY': '南充市',
              'PARENT': '2'
            },
            {
              'ACTUAL': '14',
              'DISPLAY': '乐山市',
              'PARENT': '2'
            },
            {
              'ACTUAL': '15',
              'DISPLAY': '巴中市',
              'PARENT': '2'
            }
          ]
        }
      }
    }
  )
})

module.exports = router
