
import * as Echarts from 'echarts'
class Config {
  constructor (type) {
    this.type = type
  }
  getConfig () {
    return config[this.type]
  }
}

const component = {
  'chart': [
    {
      name: '柱状图',
      col: 12,
      image: require('@/assets/configurator/component/bar.png'),
      w: 20,
      h: 20,
      type: 'bar',
      option: {
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      },
      init: initChart
    },
    {
      name: '堆叠柱状图',
      col: 12,
      image: require('@/assets/configurator/component/bar-stack.png'),
      w: 25,
      h: 20,
      type: 'bar-stack',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        xAxis: [
          {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'X',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Y',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Z',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      },
      init: initChart
    },
    {
      name: '折线图',
      col: 12,
      image: require('@/assets/configurator/component/line.png'),
      w: 20,
      h: 20,
      type: 'line',
      option: {
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      },
      init: initChart
    },
    {
      name: '面积图',
      col: 12,
      image: require('@/assets/configurator/component/line-area.png'),
      w: 20,
      h: 20,
      type: 'line-area',
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      },
      init: initChart
    },
    {
      name: '饼状图',
      col: 12,
      image: require('@/assets/configurator/component/pie.png'),
      w: 20,
      h: 20,
      type: 'pie',
      option: {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'A' },
              { value: 735, name: 'B' },
              { value: 580, name: 'C' },
              { value: 484, name: 'D' },
              { value: 300, name: 'E' }
            ]
          }
        ]
      },
      init: initChart
    },
    {
      name: '环状图',
      col: 12,
      image: require('@/assets/configurator/component/pie-ring.png'),
      w: 20,
      h: 20,
      type: 'pie-ring',
      option: {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            data: [
              { value: 1048, name: 'A' },
              { value: 735, name: 'B' },
              { value: 580, name: 'C' },
              { value: 484, name: 'D' },
              { value: 300, name: 'E' }
            ]
          }
        ]
      },
      init: initChart
    },
    {
      name: '散点图',
      col: 12,
      image: require('@/assets/configurator/component/scatter.png'),
      w: 20,
      h: 20,
      type: 'scatter',
      option: {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68]
            ],
            type: 'scatter'
          }
        ]
      },
      init: initChart
    },
    {
      name: '气泡图',
      col: 12,
      image: require('@/assets/configurator/component/bubble.png'),
      w: 40,
      h: 30,
      type: 'bubble',
      option: {
        xAxis: {},
        yAxis: {
          scale: true
        },
        series: [
          {
            name: 'A',
            data: [
              [28604, 77, 17096869, 'Australia', 1990],
              [31163, 77.4, 27662440, 'Canada', 1990],
              [1516, 68, 1154605773, 'China', 1990],
              [13670, 74.7, 10582082, 'Cuba', 1990],
              [28599, 75, 4986705, 'Finland', 1990],
              [29476, 77.1, 56943299, 'France', 1990],
              [31476, 75.4, 78958237, 'Germany', 1990],
              [28666, 78.1, 254830, 'Iceland', 1990],
              [1777, 57.7, 870601776, 'India', 1990],
              [29550, 79.1, 122249285, 'Japan', 1990],
              [2076, 67.9, 20194354, 'North Korea', 1990],
              [12087, 72, 42972254, 'South Korea', 1990],
              [24021, 75.4, 3397534, 'New Zealand', 1990],
              [43296, 76.8, 4240375, 'Norway', 1990],
              [10088, 70.8, 38195258, 'Poland', 1990],
              [19349, 69.6, 147568552, 'Russia', 1990],
              [10670, 67.3, 53994605, 'Turkey', 1990],
              [26424, 75.7, 57110117, 'United Kingdom', 1990],
              [37062, 75.4, 252847810, 'United States', 1990]
            ],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2
            }
          },
          {
            name: 'B',
            data: [
              [44056, 81.8, 23968973, 'Australia', 2015],
              [43294, 81.7, 35939927, 'Canada', 2015],
              [13334, 76.9, 1376048943, 'China', 2015],
              [21291, 78.5, 11389562, 'Cuba', 2015],
              [38923, 80.8, 5503457, 'Finland', 2015],
              [37599, 81.9, 64395345, 'France', 2015],
              [44053, 81.1, 80688545, 'Germany', 2015],
              [42182, 82.8, 329425, 'Iceland', 2015],
              [5903, 66.8, 1311050527, 'India', 2015],
              [36162, 83.5, 126573481, 'Japan', 2015],
              [1390, 71.4, 25155317, 'North Korea', 2015],
              [34644, 80.7, 50293439, 'South Korea', 2015],
              [34186, 80.6, 4528526, 'New Zealand', 2015],
              [64304, 81.6, 5210967, 'Norway', 2015],
              [24787, 77.3, 38611794, 'Poland', 2015],
              [23038, 73.13, 143456918, 'Russia', 2015],
              [19360, 76.5, 78665830, 'Turkey', 2015],
              [38225, 81.4, 64715810, 'United Kingdom', 2015],
              [53354, 79.1, 321773631, 'United States', 2015]
            ],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2
            }
          }
        ]
      },
      init: initChart
    },
    {
      name: '雷达图',
      col: 12,
      image: require('@/assets/configurator/component/radar.png'),
      w: 30,
      h: 30,
      type: 'radar',
      option: {
        radar: {
          indicator: [
            { name: 'A', max: 6500 },
            { name: 'B', max: 16000 },
            { name: 'C', max: 30000 },
            { name: 'D', max: 38000 },
            { name: 'E', max: 52000 },
            { name: 'F', max: 25000 }
          ]
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'X'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Y'
              }
            ]
          }
        ]
      },
      init: initChart
    }
  ],
  'multiMedia': [
    
  ],
  'text': []
}

async function initChart (vm, dom, option) {
  await vm.$nextTick()
  vm.chart = Echarts.init(dom)
  vm.chart.setOption(option)
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
          col: 12,
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
          col: 12,
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
          col: 12,
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
          col: 12,
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
          col: 12,
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
    component
  }
}

export default Config
