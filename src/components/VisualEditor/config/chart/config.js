const config = {
  // 配置
  chartConfig: {
    // 公用配置
    'basic': {
      type: 'config',
      config: [
        {
          type: 'select',
          label: '主题',
          key: 'theme',
          defaultValue: 'default',
          props: {
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
          defaultValue: true
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
          defaultValue: 30
        },
        {
          type: 'input-number',
          label: '下边距',
          key: 'grid-bottom',
          defaultValue: 30
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
          defaultValue: 12
        },
        {
          type: 'color-picker',
          label: '字体/轴线颜色',
          key: 'xAxis-axisLine-lineStyle-color/yAxis-axisLine-lineStyle-color',
          defaultValue: { hex: '#333' }
        },
        {
          type: 'switch',
          label: '分割线',
          key: 'yAxis-splitLine-show',
          defaultValue: false
        },
        {
          type: 'color-picker',
          label: '分割线颜色',
          key: 'yAxis-splitLine-lineStyle-color',
          defaultValue: { hex: '#ccc' }
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
          props: {
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
          props: {
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
          props: {
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
          defaultValue: { hex: '#333' }
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
          key: 'title-text'
        },
        {
          type: 'input-number',
          label: '标题字号',
          key: 'title-textStyle-fontSize',
          defaultValue: 18
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'title-textStyle-fontWeight',
          defaultValue: 'bolder',
          props: {
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
          props: {
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
          defaultValue: { hex: '#333' }
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
          props: {
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
          defaultValue: 50000
        },
        {
          type: 'input-number',
          label: '最小值',
          key: 'visualMap-min',
          defaultValue: 800
        }
      ]
    },
    // 特殊处理
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
          defaultValue: true
        },
        {
          type: 'input-number',
          label: '水平高度',
          key: 'dataZoomXHeight',
          defaultValue: 15
        },
        {
          type: 'switch',
          label: '垂直方向',
          key: 'dataZoomY',
          defaultValue: false
        },
        {
          type: 'input-number',
          label: '垂直高度',
          key: 'dataZoomXWidth',
          defaultValue: 15
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
          defaultValue: false
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
          defaultValue: 70
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
          defaultValue: 40
        },
        {
          type: 'input-number',
          label: '外半径',
          key: 'radiusOuter',
          defaultValue: 70
        }
      ]
    },
    // 饼图
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
          defaultValue: true
        },
        {
          type: 'select',
          label: '标签位置',
          key: 'series-label-position',
          defaultValue: 'outside',
          props: {
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
          defaultValue: { hex: '#333' }
        }
      ]
    },
    // 漏斗图
    'funnel-basic': {
      type: 'config',
      config: [
        {
          type: 'select',
          label: '数据排序',
          key: 'series-sort',
          defaultValue: 'descending',
          props: {
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
          props: {
            formatter: value => `${value}%`,
            parser: value => value.replace('%', '')
          }
        },
        {
          type: 'input-number',
          label: '最大宽度占比',
          key: 'series-maxSize?percent',
          defaultValue: 100,
          props: {
            formatter: value => `${value}%`,
            parser: value => value.replace('%', '')
          }
        },
        {
          type: 'input-number',
          label: '上边距',
          key: 'series-top',
          defaultValue: 60
        },
        {
          type: 'input-number',
          label: '下边距',
          key: 'series-bottom',
          defaultValue: 20
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
          defaultValue: true
        },
        {
          type: 'select',
          label: '标签位置',
          key: 'series-label-position',
          defaultValue: 'outside',
          props: {
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
          defaultValue: { hex: '#333' }
        }
      ]
    },
    // 仪表盘
    'gauge-basic': {
      type: 'config',
      config: [
        {
          type: 'input-number',
          label: '进度条宽度',
          key: 'series-progress-width',
          defaultValue: 10
        },
        {
          type: 'input-number',
          label: '轴线宽度',
          key: 'series-axisLine-lineStyle-width',
          defaultValue: 10
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
          defaultValue: true
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'series-detail-fontSize',
          defaultValue: 30
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'series-detail-color',
          defaultValue: { hex: '#333' }
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
          defaultValue: false
        },
        {
          type: 'input-number',
          label: '刻度数',
          key: 'series-axisTick-splitNumber',
          defaultValue: 5
        },
        {
          type: 'color-picker',
          label: '刻度线颜色',
          key: 'series-axisTick-lineStyle-color',
          defaultValue: { hex: '#333' }
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
          defaultValue: true
        },
        {
          type: 'input-number',
          label: '分割线长度',
          key: 'series-splitLine-length',
          defaultValue: 10
        },
        {
          type: 'input-number',
          label: '分割线间距',
          key: 'series-splitLine-distance',
          defaultValue: 10
        },
        {
          type: 'color-picker',
          label: '分割线颜色',
          key: 'series-splitLine-lineStyle-color',
          defaultValue: { hex: '#333' }
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
          defaultValue: true
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'series-axisLabel-fontSize',
          defaultValue: 12
        },
        {
          type: 'input-number',
          label: '间距',
          key: 'series-axisLabel-distance',
          defaultValue: 15
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'series-axisLabel-color',
          defaultValue: { hex: '#333' }
        }
      ]
    },
    // 雷达图
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
          defaultValue: { hex: '#333' }
        }
      ]
    },
    // 散点地图
    'map-geo-basic': {
      type: 'config',
      config: [
        {
          type: 'select',
          label: '地图名称',
          key: 'geo-map',
          defaultValue: 'china',
          props: {
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
          props: {
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
          props: {
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
          defaultValue: false
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'geo-label-color',
          defaultValue: { hex: '#333' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'geo-label-fontSize',
          defaultValue: 12
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
          defaultValue: { hex: '#eee' }
        },
        {
          type: 'color-picker',
          label: '描边颜色',
          key: 'geo-itemStyle-borderColor',
          defaultValue: { hex: '#000' }
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
          defaultValue: false
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'geo-emphasis-label-color',
          defaultValue: { hex: '#333' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'geo-emphasis-label-fontSize',
          defaultValue: 12
        },
        {
          type: 'color-picker',
          label: '区域颜色',
          key: 'geo-emphasis-itemStyle-areaColor',
          defaultValue: { hex: '#eee' }
        },
        {
          type: 'color-picker',
          label: '描边颜色',
          key: 'geo-emphasis-itemStyle-borderColor',
          defaultValue: { hex: '#000' }
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
          defaultValue: 10
        },
        {
          type: 'input-number',
          label: '涟漪比例',
          key: 'series-rippleEffect-scale',
          defaultValue: 10
        }
      ]
    },
    // 密度地图
    'map-series-basic': {
      type: 'config',
      config: [
        {
          type: 'select',
          label: '地图名称',
          key: 'series-map',
          defaultValue: 'china',
          props: {
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
          props: {
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
          props: {
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
          defaultValue: false
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'series-label-color',
          defaultValue: { hex: '#333' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'series-label-fontSize',
          defaultValue: 12
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
          defaultValue: { hex: '#eee' }
        },
        {
          type: 'color-picker',
          label: '描边颜色',
          key: 'series-itemStyle-borderColor',
          defaultValue: { hex: '#000' }
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
          defaultValue: false
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'series-emphasis-label-color',
          defaultValue: { hex: '#333' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'series-emphasis-label-fontSize',
          defaultValue: 12
        },
        {
          type: 'color-picker',
          label: '区域颜色',
          key: 'series-emphasis-itemStyle-areaColor',
          defaultValue: { hex: '#eee' }
        },
        {
          type: 'color-picker',
          label: '描边颜色',
          key: 'series-emphasis-itemStyle-borderColor',
          defaultValue: { hex: '#000' }
        }
      ]
    }
  },
  // 数据
  dataSource: {}, 
  // 事件
  event: {}
}

export default config
