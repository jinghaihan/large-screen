import _ from 'lodash'
import * as Echarts from 'echarts'
// Echarts主题
import 'echarts/theme/macarons'
import 'echarts/theme/infographic'
import 'echarts/theme/shine'
import 'echarts/theme/roma'

const chart = [
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
          name: 'X',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }
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
    }
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
          name: 'X',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }
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
          name: 'X',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }
      ]
    }
  },
  {
    name: '饼状图',
    col: 12,
    image: require('@/assets/configurator/component/pie.png'),
    w: 30,
    h: 30,
    type: 'pie',
    option: {
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
    }
  },
  {
    name: '环状图',
    col: 12,
    image: require('@/assets/configurator/component/pie-ring.png'),
    w: 30,
    h: 30,
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
    }
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
    }
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
    }
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
    }
  }
]

class Chart {
  constructor (vm, dom, option) {
    this.vm = vm
    this.dom = dom
    this.option = option
    this.chart = null
    this.formData = null
    this.theme = 'default'
    this.switchKeys = null
    this.collapseKeys = null

    this.init()
  }
  async init (theme) {
    if (this.chart) this.chart.dispose()
    this.theme = theme || 'default'
    await this.vm.$nextTick()
    this.chart = Echarts.init(this.dom, this.theme)
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
  change (data) {
    if (data.theme !== this.theme) {
      this.init(data.theme)
    }
    this.option = this.handleOption(data)
    this.update(this.option)
  }
  handleOption (data) {
    let option = { ...this.option }
    this.handleTooltipOption(option, data)
    this.handleTitleOption(option, data)
    this.handleLegendOption(option, data)
    this.handleDataZoomOption(option, data)
    this.handleAxisOption(option, data)
    return option
  }
  handleTooltipOption (option, data) {
    if (data.tooltip) {
      option.tooltip = {
        show: true
      }
    } else {
      delete option.tooltip
    }
  }
  handleTitleOption (option, data) {
    if (data.titleText) {
      option.title = {
        text: data.titleText || '',
        left: data.titlePosition,
        textStyle: {
          fontSize: data.titleFontSize || 18,
          fontWeight: data.titleFontWeight,
          color: data.titleFontColor ? data.titleFontColor.hex : '#333'
        }
      }
    } else {
      delete option.title
    }
  }
  handleLegendOption (option, data) {
    if (data.legendPosition) {
      option.legend = {
        show: true,
        orient: data.legendOrient,
        icon: data.legendIcon,
        textStyle: {
          color: data.legendFontColor ? data.legendFontColor.hex : '#333'
        }
      }
      let arr = data.legendPosition.split('-')
      let pos = {}
      arr.forEach((item, index) => {
        if (!(index % 2)) {
          pos[item] = arr[index + 1]
        }
      })
      option.legend = { ...option.legend, ...pos }
    } else {
      delete option.legend
    }
  }
  handleDataZoomOption (option, data) {
    delete option.dataZoom
    if (data.dataZoomX) {
      if (!option.dataZoom) option.dataZoom = []
      option.dataZoom.push({
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'none',
        height: data.dataZoomXHeight || 15
      })
      option.dataZoom.push({
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'none'
      })
    }
    if (data.dataZoomY) {
      if (!option.dataZoom) option.dataZoom = []
      option.dataZoom.push({
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'none',
        width: data.dataZoomXWidth || 15
      })
      option.dataZoom.push({
        type: 'inside',
        yAxisIndex: 0,
        filterMode: 'none'
      })
    }
  }
  handleAxisOption (option, data) {
    let keys = ['xAxis', 'yAxis']
    keys.forEach(key => {
      if (option[key] instanceof Array) {
        option[key].forEach(config => {
          setOption(config, key)
        })
      } else {
        setOption(option[key], key)
      }
    })
    function setOption (target, key) {
      if (data.axisFontColor) {
        target.axisLine = {}
        target.axisLine.lineStyle = {
          color: data.axisFontColor.hex
        }
      }
      if (data.axisSplitColor) {
        target.splitLine = {
          show: key === 'yAxis' ? data.axisSplitShow : false
        }
        target.splitLine.lineStyle = {
          color: data.axisSplitColor.hex
        }
      }
      target.axisLabel = {
        fontSize: data.axisFontSize
      }

      console.log(option)
    }
  }
  setData (data) {
    let { formData, switchKeys, collapseKeys } = data
    this.formData = formData
    this.switchKeys = _.cloneDeep(switchKeys)
    this.collapseKeys = _.cloneDeep(collapseKeys)
  }
}

const configure = [
  {
    name: '配置',
    key: 'config',
    config: [
      {
        type: 'select',
        label: '主题',
        key: 'theme',
        defaultValue: 'default',
        rules: [
          { required: false, message: '请选择主题' }
        ],
        props: {
          placeholder: '请选择主题',
          disabled: false,
          options: [
            { label: '默认', value: 'default' },
            { label: 'light', value: 'light' },
            { label: 'macarons', value: 'macarons' },
            { label: 'infographic', value: 'infographic' },
            { label: 'shine', value: 'shine' },
            { label: 'roma', value: 'roma' }
          ]
        }
      },
      {
        type: 'switch',
        label: '提示框',
        key: 'tooltip',
        defaultValue: true,
        rules: [
          { required: false, message: '请选择' }
        ],
        props: {
          disabled: false
        }
      }
    ],
    collapse: [
      {
        name: '标题设置',
        key: 'title',
        switch: true,
        defaultValue: false,
        config: [
          {
            type: 'input',
            label: '标题名称',
            key: 'titleText',
            defaultValue: '标题',
            rules: [
              { required: false, message: '请输入标题' }
            ],
            props: {
              placeholder: '请输入标题',
              disabled: false,
              allowClear: true
            }
          },
          {
            type: 'input-number',
            label: '标题字号',
            key: 'titleFontSize',
            defaultValue: 18,
            rules: [
              { required: false, message: '请输入标题字号' }
            ],
            props: {
              placeholder: '标题字号',
              disabled: false
            }
          },
          {
            type: 'select',
            label: '字体粗细',
            key: 'titleFontWeight',
            defaultValue: 'bolder',
            rules: [
              { required: false, message: '请选择字体粗细' }
            ],
            props: {
              placeholder: '请选择字体粗细',
              disabled: false,
              options: [
                { label: '默认', value: 'normal' },
                { label: '粗', value: 'bold' },
                { label: '加粗', value: 'bolder' },
                { label: '细', value: 'lighter' }
              ]
            }
          },
          {
            type: 'select',
            label: '标题位置',
            key: 'titlePosition',
            defaultValue: 'left',
            rules: [
              { required: false, message: '请选择标题位置' }
            ],
            props: {
              placeholder: '请选择标题位置',
              disabled: false,
              options: [
                { label: '左', value: 'left' },
                { label: '中', value: 'center' },
                { label: '右', value: 'right' }
              ]
            }
          },
          {
            type: 'color-picker',
            label: '字体颜色',
            key: 'titleFontColor',
            defaultValue: {
              hex: '#333'
            },
            rules: [
              { required: false, message: '请选择字体颜色' }
            ],
            props: {
              disabled: false
            }
          }
        ]
      },
      {
        name: '图例设置',
        key: 'legend',
        switch: true,
        defaultValue: true,
        config: [
          {
            type: 'select',
            label: '图例位置',
            key: 'legendPosition',
            defaultValue: 'left-center',
            rules: [
              { required: false, message: '请选择图例位置' }
            ],
            props: {
              placeholder: '请选择图例位置',
              disabled: false,
              options: [
                { label: '左上', value: 'left-left' },
                { label: '上', value: 'left-center' },
                { label: '右上', value: 'left-right' },
                { label: '右', value: 'left-right-top-middle' },
                { label: '右下', value: 'left-right-top-bottom' },
                { label: '下', value: 'top-bottom' },
                { label: '左下', value: 'left-left-top-bottom' },
                { label: '左', value: 'left-left-top-middle' }
              ]
            }
          },
          {
            type: 'select',
            label: '图例布局',
            key: 'legendOrient',
            defaultValue: 'horizontal',
            rules: [
              { required: false, message: '请选择图例布局' }
            ],
            props: {
              placeholder: '请选择图例布局',
              disabled: false,
              options: [
                { label: '横排', value: 'horizontal' },
                { label: '竖排', value: 'vertical' }
              ]
            }
          },
          {
            type: 'select',
            label: '图例形状',
            key: 'legendIcon',
            defaultValue: 'roundRect',
            rules: [
              { required: false, message: '请选择图例布局' }
            ],
            props: {
              placeholder: '请选择图例布局',
              disabled: false,
              options: [
                { label: '默认', value: 'roundRect' },
                { label: '矩形', value: 'rect' },
                { label: '圆形', value: 'circle' },
                { label: '三角形', value: 'triangle' },
                { label: '钻石', value: 'diamond' },
                { label: '箭头', value: 'arrow' },
                { label: '无', value: 'none' }
              ]
            }
          },
          {
            type: 'color-picker',
            label: '字体颜色',
            key: 'legendFontColor',
            defaultValue: {
              hex: '#333'
            },
            rules: [
              { required: false, message: '请选择字体颜色' }
            ],
            props: {
              disabled: false
            }
          }
        ]
      },
      {
        name: '坐标轴设置',
        key: 'axis',
        switch: true,
        defaultValue: true,
        config: [
          {
            type: 'input-number',
            label: '字体大小',
            key: 'axisFontSize',
            defaultValue: 12,
            rules: [
              { required: false, message: '请输入字体大小' }
            ],
            props: {
              placeholder: '请输入字体大小',
              disabled: false
            }
          },
          {
            type: 'color-picker',
            label: '字体/轴线颜色',
            key: 'axisFontColor',
            defaultValue: {
              hex: '#333'
            },
            rules: [
              { required: false, message: '请选择字体颜色' }
            ],
            props: {
              disabled: false
            }
          },
          {
            type: 'switch',
            label: '分割线',
            key: 'axisSplitShow',
            defaultValue: false,
            rules: [
              { required: false, message: '请选择' }
            ],
            props: {
              disabled: false
            }
          },
          {
            type: 'color-picker',
            label: '分割线颜色',
            key: 'axisSplitColor',
            defaultValue: {
              hex: '#ccc'
            },
            rules: [
              { required: false, message: '请选择字体颜色' }
            ],
            props: {
              disabled: false
            }
          }
        ]
      },
      {
        name: '区域缩放设置',
        key: 'zoom',
        switch: true,
        defaultValue: false,
        config: [
          {
            type: 'switch',
            label: '水平方向',
            key: 'dataZoomX',
            defaultValue: false,
            rules: [
              { required: false, message: '请选择' }
            ],
            props: {
              disabled: false
            }
          },
          {
            type: 'input-number',
            label: '水平高度',
            key: 'dataZoomXHeight',
            defaultValue: 15,
            rules: [
              { required: false, message: '请输入水平高度' }
            ],
            props: {
              placeholder: '请输入水平高度',
              disabled: false
            }
          },
          {
            type: 'switch',
            label: '垂直方向',
            key: 'dataZoomY',
            defaultValue: false,
            rules: [
              { required: false, message: '请选择' }
            ],
            props: {
              disabled: false
            }
          },
          {
            type: 'input-number',
            label: '垂直高度',
            key: 'dataZoomXWidth',
            defaultValue: 15,
            rules: [
              { required: false, message: '请输入垂直高度' }
            ],
            props: {
              placeholder: '请输入垂直高度',
              disabled: false
            }
          }
        ]
      },
      {
        name: '颜色设置',
        key: 'color',
        switch: true,
        defaultValue: false,
        config: []
      }
    ] 
  },
  {
    name: '数据',
    key: 'data'
  },
  {
    name: '交互',
    key: 'event'
  }
]

export default chart.map(item => {
  let data = { ...item, componentType: 'chart', configure, Chart }
  return data
})
