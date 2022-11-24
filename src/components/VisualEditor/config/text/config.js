const config = {
  // 配置
  textConfig: {
    'single-line': {
      type: 'config',
      config: [
        {
          type: 'input',
          label: '文本内容',
          key: 'text',
          defaultValue: null
        },
        {
          type: 'switch',
          label: '提示框',
          key: 'tooltip',
          defaultValue: true
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'fontSize',
          defaultValue: 14
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'color',
          defaultValue: { hex: '#333' }
        }
      ]
    }
  },
  // 数据
  dataSource: {}, 
  // 交互
  interaction: {}
}

export default config
