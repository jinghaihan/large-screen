const config = {
  // 配置
  config: {
    'player': {
      type: 'config',
      config: [
        {
          type: 'switch',
          label: '展示控件',
          key: 'option-controls',
          defaultValue: true
        },
        {
          type: 'switch',
          label: '自动播放',
          key: 'option-autoplay',
          defaultValue: false
        },
        {
          type: 'switch',
          label: '循环播放',
          key: 'option-loop',
          defaultValue: false
        }
      ]
    },
    'video': {
      type: 'config',
      config: [
        {
          type: 'switch',
          label: '静音播放',
          key: 'option-muted',
          defaultValue: false
        }
      ]
    }
  },
  // 交互
  interaction: {}
}

export default config
