const config = {
  config: {
    color: {
      type: 'config',
      config: [
        {
          type: 'color-picker',
          label: '主颜色',
          key: 'primaryColor',
          defaultValue: { hex: '#235fa7' }
        },
        {
          type: 'color-picker',
          label: '副颜色',
          key: 'deputyColor',
          defaultValue: { hex: '#4fd2dd' }
        }
      ]
    },
    duration: {
      type: 'config',
      config: [
        {
          type: 'input-number',
          label: '动画时长(S)',
          key: 'duration',
          defaultValue: 6
        }
      ]
    },
    reverse: {
      type: 'config',
      config: [
        {
          type: 'switch',
          label: '翻转',
          key: 'reverse',
          defaultValue: false
        }
      ]
    },
    text: {
      type: 'config',
      config: [
        {
          type: 'textarea',
          label: '文本内容',
          key: 'text',
          defaultValue: '文本'
        }
      ]
    }
  }
}

export default config
