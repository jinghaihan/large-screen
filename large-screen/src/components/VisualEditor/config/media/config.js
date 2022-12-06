const config = {
  // 配置
  config: {
    'player': {
      type: 'config',
      config: [
        {
          type: 'switch',
          label: '展示控件',
          key: 'vm-option-controls',
          defaultValue: true
        },
        {
          type: 'switch',
          label: '自动播放',
          key: 'vm-option-autoplay',
          defaultValue: false
        },
        {
          type: 'switch',
          label: '循环播放',
          key: 'vm-option-loop',
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
          key: 'vm-option-muted',
          defaultValue: false
        }
      ]
    }
  }
}

export default config
