
import _ from 'lodash'
import chart from './config/chart'
import basic from './config/basic'
class Config {
  constructor (type) {
    this.type = type
  }
  getConfig () {
    let data = _.cloneDeep(config[this.type])
    return data
  }
}

const component = {
  'chart': chart,
  'multiMedia': [
    
  ],
  'text': []
}

const config = {
  'largeScreen': {
    operation: {
      'navbar': [
        { name: '截图', icon: 'picture', key: 'screenshot' },
        { name: '保存', icon: 'save', key: 'save' }
      ],
      'sidebar': [
        { name: '可视化组件', icon: 'area-chart', key: 'chart' },
        { name: '多媒体组件', icon: 'video-camera', key: 'multiMedia' },
        { name: '文本组件', icon: 'font-colors', key: 'text' }
      ],
      'configure': [
        { name: '基础配置', key: 'basic' },
        { name: '图层配置', key: 'layer' },
        { name: '组件配置', key: 'component' }
      ],
      'layer': [
        { name: '修改名称', icon: 'edit', key: 'edit' },
        { name: '删除图层', icon: 'delete', key: 'delete' }
      ],
      'renderer': [
        { name: '复制', key: 'copy', icon: 'copy' },
        { name: '删除', key: 'delete', icon: 'delete' }
      ]
    },
    configure: {
      'basic': basic
    },
    component
  }
}

export default Config
