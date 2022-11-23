const chart = {
  'bar': {
    name: '柱状图',
    type: 'bar',
    image: require('@/assets/VisualEditor/component/bar.png'),
    col: 12,
    w: 25,
    h: 20,
    props: {}
  },
  'bar-stack': {
    name: '堆叠柱状图',
    type: 'bar-stack',
    image: require('@/assets/VisualEditor/component/bar-stack.png'),
    col: 12,
    w: 30,
    h: 20,
    props: {}
  },
  'line': {
    name: '折线图',
    type: 'line',
    image: require('@/assets/VisualEditor/component/line.png'),
    col: 12,
    w: 30,
    h: 20,
    props: {}
  },
  'line-area': {
    name: '面积图',
    type: 'line-area',
    image: require('@/assets/VisualEditor/component/line-area.png'),
    col: 12,
    w: 30,
    h: 20,
    props: {}
  },
  'pie': {
    name: '饼状图',
    type: 'pie',
    image: require('@/assets/VisualEditor/component/pie.png'),
    col: 12,
    w: 25,
    h: 25,
    props: {}
  },
  'pie-ring': {
    name: '环状图',
    type: 'pie-ring',
    image: require('@/assets/VisualEditor/component/pie-ring.png'),
    col: 12,
    w: 25,
    h: 25,
    props: {}
  },
  'pie-rose': {
    name: '玫瑰图',
    type: 'pie-rose',
    image: require('@/assets/VisualEditor/component/pie-rose.png'),
    col: 12,
    w: 25,
    h: 25,
    props: {}
  },
  'funnel': {
    name: '漏斗图',
    type: 'funnel',
    image: require('@/assets/VisualEditor/component/funnel.png'),
    col: 12,
    w: 30,
    h: 20,
    props: {}
  },
  'gauge': {
    name: '仪表盘',
    type: 'gauge',
    image: require('@/assets/VisualEditor/component/gauge.png'),
    col: 12,
    w: 25,
    h: 25,
    props: {}
  },
  'scatter': {
    name: '散点图',
    type: 'scatter',
    image: require('@/assets/VisualEditor/component/scatter.png'),
    col: 12,
    w: 20,
    h: 20,
    props: {}
  },
  'bubble': {
    name: '气泡图',
    type: 'bubble',
    image: require('@/assets/VisualEditor/component/bubble.png'),
    col: 12,
    w: 40,
    h: 30,
    props: {}
  },
  'radar': {
    name: '雷达图',
    type: 'radar',
    image: require('@/assets/VisualEditor/component/radar.png'),
    col: 12,
    w: 30,
    h: 30,
    props: {}
  },
  'map-scatter': {
    name: '散点地图',
    type: 'map-scatter',
    image: require('@/assets/VisualEditor/component/map-scatter.png'),
    col: 12,
    w: 40,
    h: 30,
    props: {}
  },
  'map-density': {
    name: '密度地图',
    type: 'map-density',
    image: require('@/assets/VisualEditor/component/map-density.png'),
    col: 12,
    w: 40,
    h: 30,
    props: {}
  }
}

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
        radius: '70%',
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
  'pie-rose': {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: [
          { value: 235, name: 'A' },
          { value: 274, name: 'B' },
          { value: 310, name: 'C' },
          { value: 335, name: 'D' },
          { value: 400, name: 'E' }
        ],
        roseType: 'radius'
      }
    ]
  },
  'funnel': {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'funnel',
        sort: 'descending',
        top: 60,
        bottom: 20,
        minSize: '0%',
        maxSize: '100%',
        data: [
          { value: 60, name: 'A' },
          { value: 40, name: 'B' },
          { value: 20, name: 'C' },
          { value: 80, name: 'D' },
          { value: 100, name: 'E' }
        ]
      }
    ]
  },
  'gauge': {
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 10
        },
        axisLine: {
          lineStyle: {
            width: 10
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          length: 10,
          distance: 10,
          lineStyle: {
            color: '#63677A',
            width: 3
          }
        },
        axisLabel: {
          show: true,
          distance: 15,
          fontSize: 12
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10
          }
        },
        detail: {
          show: true,
          fontSize: 30,
          valueAnimation: true,
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: 70
          }
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
  },
  'map-scatter': {
    tooltip: {
      show: true,
      formatter (params) {
        return `地区：${params.name}</br>数值：${params.value[2]}`
      }
    },
    geo: {
      show: true,
      map: 'china',
      roam: true,
      zoom: 1.2,
      scaleLimit: {
        min: 0.1,
        max: 12
      },
      label: {
        show: false,
        color: '#333',
        fontSize: 12
      },
      itemStyle: {
        areaColor: '#eee',
        borderColor: '#000'
      },
      emphasis: {
        label: {
          show: false,
          color: '#fff',
          fontSize: 12
        },
        itemStyle: {
          areaColor: '#eee',
          borderColor: '#000'
        }
      }
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        effectType: 'ripple',
        showEffectOn: 'render',
        hoverAnimation: true,
        zlevel: 1,
        rippleEffect: {
          period: 10,
          scale: 10,
          brushType: 'fill'
        },
        data: [
          { name: '北京市', value: [116.405285, 39.904989, 1000] }
        ]
      }
    ]
  },
  'map-density': {
    tooltip: {
      show: true,
      formatter (params) {
        return `地区：${params.name}</br>数值：${params.value || '-'}`
      }
    },
    visualMap: {
      left: 'left',
      min: 800,
      max: 50000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true
    },
    series: [
      {
        type: 'map',
        map: 'china',
        roam: true,
        zoom: 1.2,
        scaleLimit: {
          min: 0.1,
          max: 12
        },
        label: {
          show: false,
          color: '#333',
          fontSize: 12
        },
        itemStyle: {
          areaColor: '#eee',
          borderColor: '#000'
        },
        emphasis: {
          label: {
            show: false,
            color: '#fff',
            fontSize: 12
          },
          itemStyle: {
            areaColor: '#eee',
            borderColor: '#000'
          }
        },
        data: [
          { name: '北京市', value: 1000 },
          { name: '浙江省', value: 50000 },
          { name: '四川省', value: 8000 },
          { name: '江西省', value: 10000 }
        ]
      }
    ]
  }
}

const gridWhiteList = ['pie', 'pie-ring', 'pie-rose', 'funnel', 'gauge', 'map-scatter', 'map-density']
Object.keys(option).forEach(key => {
  if (gridWhiteList.includes(key)) return
  option[key].grid = {
    top: 30,
    bottom: 30,
    width: 'auto',
    height: 'auto'
  }
})

const config = {
  // 配置
  chartConfig: {
    'basic': {
      type: 'config',
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
          key: 'tooltip-show',
          defaultValue: true,
          rules: [
            { required: false, message: '请选择' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'grid': {
      type: 'config',
      config: [
        {
          type: 'input-number',
          label: '上边距',
          key: 'grid-top',
          defaultValue: 30,
          rules: [
            { required: false, message: '请输入上边距' }
          ],
          props: {
            placeholder: '请输入上边距',
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '下边距',
          key: 'grid-bottom',
          defaultValue: 30,
          rules: [
            { required: false, message: '请输入下边距' }
          ],
          props: {
            placeholder: '请输入下边距',
            disabled: false
          }
        }
      ]
    },
    'axis': {
      type: 'collapse',
      name: '坐标轴设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'input-number',
          label: '字体大小',
          key: 'xAxis-axisLabel-fontSize/yAxis-axisLabel-fontSize',
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
          key: 'xAxis-axisLine-lineStyle-color/yAxis-axisLine-lineStyle-color',
          defaultValue: { hex: '#333' },
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
          key: 'yAxis-splitLine-show',
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
          key: 'yAxis-splitLine-lineStyle-color',
          defaultValue: { hex: '#ccc' },
          rules: [
            { required: false, message: '请选择字体颜色' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'legend': {
      type: 'collapse',
      name: '图例设置',
      switch: true,
      defaultValue: true,
      config: [
        {
          type: 'select',
          label: '图例位置',
          key: 'legend-left/legend-top',
          defaultValue: 'center/',
          rules: [
            { required: false, message: '请选择图例位置' }
          ],
          props: {
            placeholder: '请选择图例位置',
            disabled: false,
            options: [
              { label: '左上', value: 'left/' },
              { label: '上', value: 'center/' },
              { label: '右上', value: 'right/' },
              { label: '右', value: 'right/middle' },
              { label: '右下', value: 'right/bottom' },
              { label: '下', value: '/bottom' },
              { label: '左下', value: 'left/bottom' },
              { label: '左', value: 'left/middle' }
            ]
          }
        },
        {
          type: 'select',
          label: '图例布局',
          key: 'legend-orient',
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
          key: 'legend-icon',
          defaultValue: 'roundRect',
          rules: [
            { required: false, message: '请选择图例形状' }
          ],
          props: {
            placeholder: '请选择图例形状',
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
          key: 'legend-textStyle-color',
          defaultValue: { hex: '#333' },
          rules: [
            { required: false, message: '请选择字体颜色' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'title': {
      type: 'collapse',
      name: '标题设置',
      switch: true,
      defaultValue: false,
      config: [
        {
          type: 'input',
          label: '标题名称',
          key: 'title-text',
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
          key: 'title-textStyle-fontSize',
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
          key: 'title-textStyle-fontWeight',
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
          key: 'title-left',
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
          key: 'title-textStyle-color',
          defaultValue: { hex: '#333' },
          rules: [
            { required: false, message: '请选择字体颜色' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'dataZoom': {
      type: 'collapse',
      name: '区域缩放设置',
      switch: true,
      defaultValue: false,
      config: [
        {
          type: 'switch',
          label: '水平方向',
          key: 'dataZoomX',
          defaultValue: true,
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
    'visualMap': {
      type: 'collapse',
      name: '视觉映射设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'select',
          label: '控制器位置',
          key: 'visualMap-left/visualMap-top',
          defaultValue: 'left/bottom',
          rules: [
            { required: false, message: '请选择控制器位置' }
          ],
          props: {
            placeholder: '请选择控制器位置',
            disabled: false,
            options: [
              { label: '左上', value: 'left/top' },
              { label: '上', value: 'center/top' },
              { label: '右上', value: 'right/top' },
              { label: '右', value: 'right/middle' },
              { label: '右下', value: 'right/bottom' },
              { label: '下', value: 'center/bottom' },
              { label: '左下', value: 'left/bottom' },
              { label: '左', value: 'left/middle' }
            ]
          }
        },
        {
          type: 'input-number',
          label: '最大值',
          key: 'visualMap-max',
          defaultValue: 50000,
          rules: [
            { required: false, message: '请输入最大值' }
          ],
          props: {
            placeholder: '请输入最大值',
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '最小值',
          key: 'visualMap-min',
          defaultValue: 800,
          rules: [
            { required: false, message: '请输入最小值' }
          ],
          props: {
            placeholder: '请输入最小值',
            disabled: false
          }
        }
      ]
    },
    'axisFlip': {
      type: 'config',
      config: [
        {
          type: 'switch',
          label: '坐标轴翻转',
          key: 'axisFlip',
          defaultValue: false,
          rules: [
            { required: false, message: '请选择' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'pie-series-label': {
      type: 'collapse',
      name: '文本标签设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'switch',
          label: '标签展示',
          key: 'series-label-show',
          defaultValue: true,
          rules: [
            { required: false, message: '请选择' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'select',
          label: '标签位置',
          key: 'series-label-position',
          defaultValue: 'outside',
          rules: [
            { required: false, message: '请选择标签位置' }
          ],
          props: {
            placeholder: '请选择标签位置',
            disabled: false,
            options: [
              { label: '扇区外侧', value: 'outside' },
              { label: '扇区内部', value: 'inside' },
              { label: '中心', value: 'center' }
            ]
          }
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'series-label-color',
          defaultValue: { hex: '#333' },
          rules: [
            { required: false, message: '请选择字体颜色' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'radius-Number': {
      type: 'config',
      config: [
        {
          type: 'input-number',
          label: '半径',
          key: 'radius',
          defaultValue: 70,
          rules: [
            { required: false, message: '请输入半径' }
          ],
          props: {
            placeholder: '请输入半径',
            disabled: false
          }
        }
      ]
    },
    'radius-Array': {
      type: 'config',
      config: [
        {
          type: 'input-number',
          label: '内半径',
          key: 'radiusInner',
          defaultValue: 40,
          rules: [
            { required: false, message: '请输入内半径' }
          ],
          props: {
            placeholder: '请输入内半径',
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '外半径',
          key: 'radiusOuter',
          defaultValue: 70,
          rules: [
            { required: false, message: '请输入外半径' }
          ],
          props: {
            placeholder: '请输入外半径',
            disabled: false
          }
        }
      ]
    },
    'funnel-basic': {
      type: 'config',
      config: [
        {
          type: 'select',
          label: '数据排序',
          key: 'series-sort',
          defaultValue: 'descending',
          rules: [
            { required: false, message: '请选择数据排序' }
          ],
          props: {
            placeholder: '请选择数据排序',
            disabled: false,
            options: [
              { label: '升序', value: 'ascending' },
              { label: '降序', value: 'descending' },
              { label: '无指定', value: 'none' }
            ]
          }
        },
        {
          type: 'input-number',
          label: '最小宽度占比',
          key: 'series-minSize?percent',
          defaultValue: 0,
          rules: [
            { required: false, message: '请输入最小宽度占比' }
          ],
          props: {
            placeholder: '请输入最小宽度占比',
            disabled: false,
            formatter: value => `${value}%`,
            parser: value => value.replace('%', '')
          }
        },
        {
          type: 'input-number',
          label: '最大宽度占比',
          key: 'series-maxSize?percent',
          defaultValue: 100,
          rules: [
            { required: false, message: '请输入最大宽度占比' }
          ],
          props: {
            placeholder: '请输入最大宽度占比',
            disabled: false,
            formatter: value => `${value}%`,
            parser: value => value.replace('%', '')
          }
        },
        {
          type: 'input-number',
          label: '上边距',
          key: 'series-top',
          defaultValue: 60,
          rules: [
            { required: false, message: '请输入上边距' }
          ],
          props: {
            placeholder: '请输入上边距',
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '下边距',
          key: 'series-bottom',
          defaultValue: 20,
          rules: [
            { required: false, message: '请输入下边距' }
          ],
          props: {
            placeholder: '请输入下边距',
            disabled: false
          }
        }
      ]
    },
    'funnel-series-label': {
      type: 'collapse',
      name: '文本标签设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'switch',
          label: '标签展示',
          key: 'series-label-show',
          defaultValue: true,
          rules: [
            { required: false, message: '请选择' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'select',
          label: '标签位置',
          key: 'series-label-position',
          defaultValue: 'outside',
          rules: [
            { required: false, message: '请选择标签位置' }
          ],
          props: {
            placeholder: '请选择标签位置',
            disabled: false,
            options: [
              { label: '漏斗图外侧', value: 'outside' },
              { label: '漏斗图内部', value: 'inside' }
            ]
          }
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'series-label-color',
          defaultValue: { hex: '#333' },
          rules: [
            { required: false, message: '请选择字体颜色' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'gauge-basic': {
      type: 'config',
      config: [
        {
          type: 'input-number',
          label: '进度条宽度',
          key: 'series-progress-width',
          defaultValue: 10,
          rules: [
            { required: false, message: '请输入进度条宽度' }
          ],
          props: {
            placeholder: '请输入进度条宽度',
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '轴线宽度',
          key: 'series-axisLine-lineStyle-width',
          defaultValue: 10,
          rules: [
            { required: false, message: '请输入轴线宽度' }
          ],
          props: {
            placeholder: '请输入轴线宽度',
            disabled: false
          }
        }
      ]
    },
    'gauge-series-detail': {
      type: 'collapse',
      name: '详情设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'switch',
          label: '详情展示',
          key: 'series-detail-show',
          defaultValue: true,
          rules: [
            { required: false, message: '请选择' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'series-detail-fontSize',
          defaultValue: 30,
          rules: [
            { required: false, message: '请输入字体大小' }
          ],
          props: {
            placeholder: '请输入字体大小',
            disabled: false
          }
        }
      ]
    },
    'gauge-series-axisTick': {
      type: 'collapse',
      name: '刻度线设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'switch',
          label: '刻度线展示',
          key: 'series-axisTick-show',
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
          label: '刻度数',
          key: 'series-axisTick-splitNumber',
          defaultValue: 5,
          rules: [
            { required: false, message: '请输入刻度数' }
          ],
          props: {
            placeholder: '请输入刻度数',
            disabled: false
          }
        }
      ]
    },
    'gauge-series-splitLine': {
      type: 'collapse',
      name: '分割线设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'switch',
          label: '分割线展示',
          key: 'series-splitLine-show',
          defaultValue: true,
          rules: [
            { required: false, message: '请选择' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '分割线长度',
          key: 'series-splitLine-length',
          defaultValue: 10,
          rules: [
            { required: false, message: '请输入分割线长度' }
          ],
          props: {
            placeholder: '请输入分割线长度',
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '分割线间距',
          key: 'series-splitLine-distance',
          defaultValue: 10,
          rules: [
            { required: false, message: '请输入分割线间距' }
          ],
          props: {
            placeholder: '请输入分割线间距',
            disabled: false
          }
        }
      ]
    },
    'gauge-series-axisLabel': {
      type: 'collapse',
      name: '刻度标签设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'switch',
          label: '刻度标签展示',
          key: 'series-axisLabel-show',
          defaultValue: true,
          rules: [
            { required: false, message: '请选择' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'series-axisLabel-fontSize',
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
          type: 'input-number',
          label: '间距',
          key: 'series-axisLabel-distance',
          defaultValue: 15,
          rules: [
            { required: false, message: '请输入间距' }
          ],
          props: {
            placeholder: '请输入间距',
            disabled: false
          }
        }
      ]
    },
    'radar-axisName': {
      type: 'collapse',
      name: '指示器颜色设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'radar-axisName-color',
          defaultValue: { hex: '#333' },
          rules: [
            { required: false, message: '请选择字体颜色' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'map-geo-basic': {
      type: 'config',
      config: [
        {
          type: 'select',
          label: '地图名称',
          key: 'geo-map',
          defaultValue: 'china',
          rules: [
            { required: false, message: '请选择地图名称' }
          ],
          props: {
            placeholder: '请选择地图名称',
            disabled: false,
            options: [
              { label: '中国', value: 'china' }
            ]
          }
        },
        {
          type: 'select',
          label: '鼠标操作',
          key: 'geo-roam',
          defaultValue: true,
          rules: [
            { required: false, message: '请选择鼠标操作' }
          ],
          props: {
            placeholder: '请选择鼠标操作',
            disabled: false,
            options: [
              { label: '鼠标缩放和平移漫游', value: true },
              { label: '鼠标缩放', value: 'scale' },
              { label: '平移漫游', value: 'move' },
              { label: '禁用', value: false }
            ]
          }
        },
        {
          type: 'input-number',
          label: '缩放比例',
          key: 'geo-zoom',
          defaultValue: 1.2,
          rules: [
            { required: false, message: '请输入缩放比例' }
          ],
          props: {
            placeholder: '请输入缩放比例',
            disabled: false,
            step: 0.1
          }
        }
      ]
    },
    'map-geo-label': {
      type: 'collapse',
      name: '文本标签设置',
      switch: true,
      defaultValue: false,
      config: [
        {
          type: 'switch',
          label: '标签展示',
          key: 'geo-label-show',
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
          label: '字体颜色',
          key: 'geo-label-color',
          defaultValue: { hex: '#333' },
          rules: [
            { required: false, message: '请选择字体颜色' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'geo-label-fontSize',
          defaultValue: 12,
          rules: [
            { required: false, message: '请输入字体大小' }
          ],
          props: {
            placeholder: '请输入字体大小',
            disabled: false
          }
        }
      ]
    },
    'map-geo-itemStyle': {
      type: 'collapse',
      name: '地图区域设置',
      switch: true,
      defaultValue: false,
      config: [
        {
          type: 'color-picker',
          label: '区域颜色',
          key: 'geo-itemStyle-areaColor',
          defaultValue: { hex: '#eee' },
          rules: [
            { required: false, message: '请选择区域颜色' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'color-picker',
          label: '描边颜色',
          key: 'geo-itemStyle-borderColor',
          defaultValue: { hex: '#000' },
          rules: [
            { required: false, message: '请选择描边颜色' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'map-geo-emphasis': {
      type: 'collapse',
      name: '高亮状态设置',
      switch: true,
      defaultValue: false,
      config: [
        {
          type: 'switch',
          label: '标签展示',
          key: 'geo-emphasis-label-show',
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
          label: '字体颜色',
          key: 'geo-emphasis-label-color',
          defaultValue: { hex: '#333' },
          rules: [
            { required: false, message: '请选择字体颜色' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'geo-emphasis-label-fontSize',
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
          label: '区域颜色',
          key: 'geo-emphasis-itemStyle-areaColor',
          defaultValue: { hex: '#eee' },
          rules: [
            { required: false, message: '请选择区域颜色' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'color-picker',
          label: '描边颜色',
          key: 'geo-emphasis-itemStyle-borderColor',
          defaultValue: { hex: '#000' },
          rules: [
            { required: false, message: '请选择描边颜色' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'map-scatter-rippleEffect': {
      type: 'collapse',
      name: '涟漪特效设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'input-number',
          label: '动画周期(S)',
          key: 'series-rippleEffect-period',
          defaultValue: 10,
          rules: [
            { required: false, message: '请输入动画周期(S)' }
          ],
          props: {
            placeholder: '请输入动画周期(S)',
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '涟漪比例',
          key: 'series-rippleEffect-scale',
          defaultValue: 10,
          rules: [
            { required: false, message: '请输入涟漪比例' }
          ],
          props: {
            placeholder: '请输入涟漪比例',
            disabled: false
          }
        }
      ]
    },
    'map-series-basic': {
      type: 'config',
      config: [
        {
          type: 'select',
          label: '地图名称',
          key: 'series-map',
          defaultValue: 'china',
          rules: [
            { required: false, message: '请选择地图名称' }
          ],
          props: {
            placeholder: '请选择地图名称',
            disabled: false,
            options: [
              { label: '中国', value: 'china' }
            ]
          }
        },
        {
          type: 'select',
          label: '鼠标操作',
          key: 'series-roam',
          defaultValue: true,
          rules: [
            { required: false, message: '请选择鼠标操作' }
          ],
          props: {
            placeholder: '请选择鼠标操作',
            disabled: false,
            options: [
              { label: '鼠标缩放和平移漫游', value: true },
              { label: '鼠标缩放', value: 'scale' },
              { label: '平移漫游', value: 'move' },
              { label: '禁用', value: false }
            ]
          }
        },
        {
          type: 'input-number',
          label: '缩放比例',
          key: 'series-zoom',
          defaultValue: 1.2,
          rules: [
            { required: false, message: '请输入缩放比例' }
          ],
          props: {
            placeholder: '请输入缩放比例',
            disabled: false,
            step: 0.1
          }
        }
      ]
    },
    'map-series-label': {
      type: 'collapse',
      name: '文本标签设置',
      switch: true,
      defaultValue: false,
      config: [
        {
          type: 'switch',
          label: '标签展示',
          key: 'series-label-show',
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
          label: '字体颜色',
          key: 'series-label-color',
          defaultValue: { hex: '#333' },
          rules: [
            { required: false, message: '请选择字体颜色' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'series-label-fontSize',
          defaultValue: 12,
          rules: [
            { required: false, message: '请输入字体大小' }
          ],
          props: {
            placeholder: '请输入字体大小',
            disabled: false
          }
        }
      ]
    },
    'map-series-itemStyle': {
      type: 'collapse',
      name: '地图区域设置',
      switch: true,
      defaultValue: false,
      config: [
        {
          type: 'color-picker',
          label: '区域颜色',
          key: 'series-itemStyle-areaColor',
          defaultValue: { hex: '#eee' },
          rules: [
            { required: false, message: '请选择区域颜色' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'color-picker',
          label: '描边颜色',
          key: 'series-itemStyle-borderColor',
          defaultValue: { hex: '#000' },
          rules: [
            { required: false, message: '请选择描边颜色' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    },
    'map-series-emphasis': {
      type: 'collapse',
      name: '高亮状态设置',
      switch: true,
      defaultValue: false,
      config: [
        {
          type: 'switch',
          label: '标签展示',
          key: 'series-emphasis-label-show',
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
          label: '字体颜色',
          key: 'series-emphasis-label-color',
          defaultValue: { hex: '#333' },
          rules: [
            { required: false, message: '请选择字体颜色' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'series-emphasis-label-fontSize',
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
          label: '区域颜色',
          key: 'series-emphasis-itemStyle-areaColor',
          defaultValue: { hex: '#eee' },
          rules: [
            { required: false, message: '请选择区域颜色' }
          ],
          props: {
            disabled: false
          }
        },
        {
          type: 'color-picker',
          label: '描边颜色',
          key: 'series-emphasis-itemStyle-borderColor',
          defaultValue: { hex: '#000' },
          rules: [
            { required: false, message: '请选择描边颜色' }
          ],
          props: {
            disabled: false
          }
        }
      ]
    }
  },
  // 数据
  dataSource: {}, 
  // 事件
  event: {}
}

const configMap = {
  'bar': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'grid', 'axisFlip', 'axis', 'legend', 'title', 'dataZoom']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'bar-stack': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'grid', 'axisFlip', 'axis', 'legend', 'title', 'dataZoom']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'line': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'grid', 'axis', 'legend', 'title', 'dataZoom']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'line-area': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'grid', 'axis', 'legend', 'title', 'dataZoom']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'pie': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'radius-Number', 'pie-series-label', 'legend', 'title']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'pie-ring': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'radius-Array', 'pie-series-label', 'legend', 'title']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'pie-rose': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'radius-Number', 'pie-series-label', 'legend', 'title']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'funnel': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'funnel-basic', 'funnel-series-label', 'legend', 'title']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'gauge': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'gauge-basic', 'gauge-series-detail', 'gauge-series-axisTick', 'gauge-series-splitLine', 'gauge-series-axisLabel', 'title']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'scatter': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'grid', 'axis', 'legend', 'title', 'dataZoom']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'bubble': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'grid', 'axis', 'legend', 'title', 'dataZoom']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'radar': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'radar-axisName', 'legend', 'title']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'map-scatter': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'map-geo-basic', 'map-scatter-rippleEffect', 'title', 'map-geo-label', 'map-geo-itemStyle', 'map-geo-emphasis']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  },
  'map-density': {
    'chartConfig': {
      name: '配置',
      config: ['basic', 'map-series-basic', 'visualMap', 'title', 'map-series-label', 'map-series-itemStyle', 'map-series-emphasis']
    },
    'dataSource': {
      name: '数据',
      config: []
    },
    'event': {
      name: '事件',
      config: []
    }
  }
}

export { chart, option, config, configMap }
