const globalConfig = {
  config: {
    border: {
      type: 'collapse',
      name: '边框设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'select',
          label: '边框样式',
          key: 'vm-border-component',
          defaultValue: 'none',
          props: {
            options: [
              { label: '无边框', value: 'none' },
              { label: '边框1', value: 'dv-border-box-1' },
              { label: '边框2', value: 'dv-border-box-2' },
              { label: '边框3', value: 'dv-border-box-3' },
              { label: '边框4', value: 'dv-border-box-4' },
              { label: '边框5', value: 'dv-border-box-5' },
              { label: '边框6', value: 'dv-border-box-6' },
              { label: '边框7', value: 'dv-border-box-7' },
              { label: '边框8', value: 'dv-border-box-8' },
              { label: '边框9', value: 'dv-border-box-9' },
              { label: '边框10', value: 'dv-border-box-10' },
              { label: '边框11', value: 'dv-border-box-11' },
              { label: '边框12', value: 'dv-border-box-12' },
              { label: '边框13', value: 'dv-border-box-13' }
            ]
          }
        },
        {
          type: 'input-number',
          label: '内边距',
          key: 'vm-border-padding',
          defaultValue: 0
        },
        {
          type: 'color-picker',
          label: '主颜色',
          key: 'vm-border-primaryColor',
          defaultValue: { hex: '#4fd2dd' }
        },
        {
          type: 'color-picker',
          label: '副颜色',
          key: 'vm-border-deputyColor',
          defaultValue: { hex: '#235fa7' }
        },
        {
          type: 'color-picker',
          label: '背景颜色',
          key: 'vm-border-backgroundColor',
          defaultValue: { hex: '#00000000' }
        }
      ]
    }
  }
}

export default globalConfig
