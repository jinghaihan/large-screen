const config = {
  config: {
    'panel': {
      type: 'config',
      config: [
        {
          type: 'input-number',
          label: '按钮右偏移',
          key: 'vm-button-right?pixel',
          defaultValue: 0
        },
        {
          type: 'input-number',
          label: '按钮下偏移',
          key: 'vm-button-bottom?pixel',
          defaultValue: 0
        },
        {
          type: 'input-number',
          label: '按钮间距',
          key: 'vm-button-margin?pixel',
          defaultValue: 8
        },
        {
          type: 'select',
          label: '按钮大小',
          key: 'vm-button-size',
          defaultValue: 'default',
          props: {
            options: [
              { label: '小', value: 'small' },
              { label: '默认', value: 'default' },
              { label: '大', value: 'large' }
            ]
          }
        },
        {
          type: 'select',
          label: '查询按钮类型',
          key: 'vm-button-search',
          defaultValue: 'primary',
          props: {
            options: [
              { label: 'default', value: 'default' },
              { label: 'primary', value: 'primary' },
              { label: 'dashed', value: 'dashed' },
              { label: 'danger', value: 'danger' }
            ]
          }
        },
        {
          type: 'select',
          label: '重置按钮类型',
          key: 'vm-button-reset',
          defaultValue: 'default',
          props: {
            options: [
              { label: 'default', value: 'default' },
              { label: 'primary', value: 'primary' },
              { label: 'dashed', value: 'dashed' },
              { label: 'danger', value: 'danger' }
            ]
          }
        }
      ]
    }
  }
}

export default config
