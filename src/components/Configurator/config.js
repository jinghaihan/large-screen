
class Config {
  constructor (type) {
    this.type = type
  }
  getConfig () {
    return config[this.type]
  }
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
      'basic': [
        {
          type: 'input',
          label: '名称',
          key: 'name',
          col: 24,
          defaultValue: null,
          rules: [
            { required: true, message: '请输入名称', whitespace: true }
          ],
          props: {
            placeholder: '请输入名称',
            disabled: false,
            allowClear: true
          }
        },
        {
          type: 'input-number',
          label: '长比例',
          key: 'ratio-width',
          col: 24,
          defaultValue: null,
          rules: [
            { required: true, message: '请输入长比例' }
          ],
          props: {
            placeholder: '长比例',
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '宽比例',
          key: 'ratio-height',
          col: 24,
          defaultValue: null,
          rules: [
            { required: true, message: '请输入宽比例' }
          ],
          props: {
            placeholder: '宽比例',
            disabled: false
          }
        },
        {
          type: 'textarea',
          label: '描述',
          key: 'description',
          col: 24,
          defaultValue: null,
          rules: [
            { required: false, message: '请输入描述', whitespace: true }
          ],
          props: {
            maxLength: 300,
            placeholder: '请输入描述',
            disabled: false,
            allowClear: true
          }
        },
        {
          type: 'material-library',
          label: '背景',
          key: 'background',
          col: 24,
          defaultValue: null,
          rules: [
            { required: false, message: '请选择背景' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    component: {
      'chart': [
        {
          name: '柱状图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/bar-background.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'bar'
        },
        {
          name: '垂直堆叠柱状图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/bar-brush.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'bar-vertical'
        },
        {
          name: '水平堆叠柱状图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/bar-y-category-stack.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'bar-horizontal'
        },
        {
          name: '折线图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/line-simple.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'line'
        },
        {
          name: '堆叠折线图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/area-basic.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'line-area'
        },
        {
          name: '饼状图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/pie-simple.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'pie'
        },
        {
          name: '环状图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/pie-doughnut.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'ring'
        },
        {
          name: '散点图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/scatter-simple.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'scatter'
        },
        {
          name: '气泡图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/bubble-gradient.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'bubble'
        },
        {
          name: '雷达图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/radar.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'radar'
        },
        {
          name: '地图',
          col: 24,
          image: 'https://echarts.apache.org/examples/data/thumb/map-HK.webp?_v_=1668349111222',
          w: 20,
          h: 10,
          type: 'map'
        }
        // {
        //   name: '表格',
        //   col: 24,
        //   image: require('@/assets/configurator/component/table.svg'),
        //   w: 20,
        //   h: 10,
        //   type: 'table'
        // },
        // {
        //   name: '简单表格',
        //   col: 24,
        //   image: require('@/assets/configurator/component/excel.svg'),
        //   w: 20,
        //   h: 10,
        //   type: 'excel'
        // }
      ],
      'multiMedia': [],
      'text': []
    }
  }
}

export default Config
