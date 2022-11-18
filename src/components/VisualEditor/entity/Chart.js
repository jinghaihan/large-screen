import _ from 'lodash'
import * as Echarts from 'echarts'
// Echarts主题
import 'echarts/theme/macarons'
import 'echarts/theme/infographic'
import 'echarts/theme/shine'
import 'echarts/theme/roma'

const option = {
  'bar': {
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'X',
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  },
  'bar-stack': {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
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
  'line': {
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'X',
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  },
  'line-area': {
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
        name: 'X',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }
    ]
  },
  'pie': {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'X',
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
  'pie-ring': {
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
  'scatter': {
    xAxis: {},
    yAxis: {},
    series: [
      {
        name: 'X',
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
  'bubble': {
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
  'radar': {
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
  }
}

class Chart {
  constructor (data) {
    let { vm, key, el, type } = data
    this.vm = vm
    this.key = key
    this.el = el
    this.type = type
    this.option = option[this.type]
    this.chart = null
    this.theme = 'default'

    this.init()
  }
  async init (theme) {
    if (this.chart) this.chart.dispose()
    this.theme = theme || 'default'
    await this.vm.$nextTick()
    this.chart = Echarts.init(this.el, this.theme)
    this.chart.setOption(this.option)
  }
  update (option) {
    this.option = option
    if (this.chart) {
      this.chart.setOption(this.option, true)
    }
  }
  resize () {
    this.chart.resize()
  }
}

export default Chart
