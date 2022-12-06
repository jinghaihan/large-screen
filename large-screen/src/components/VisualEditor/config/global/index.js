import color from '../color'

const globalConfig = {
  config: {
    border: {
      type: 'collapse',
      name: '边框设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'popover-select',
          label: '边框样式',
          key: 'vm-border-component',
          defaultValue: 'none',
          props: {
            options: [
              { label: '无边框', value: 'none' },
              { label: '边框1', value: 'dv-border-box-1', component: 'Border' },
              { label: '边框2', value: 'dv-border-box-2', component: 'Border' },
              { label: '边框3', value: 'dv-border-box-3', component: 'Border' },
              { label: '边框4', value: 'dv-border-box-4', component: 'Border' },
              { label: '边框5', value: 'dv-border-box-5', component: 'Border' },
              { label: '边框6', value: 'dv-border-box-6', component: 'Border' },
              { label: '边框7', value: 'dv-border-box-7', component: 'Border' },
              { label: '边框8', value: 'dv-border-box-8', component: 'Border' },
              { label: '边框9', value: 'dv-border-box-9', component: 'Border' },
              { label: '边框10', value: 'dv-border-box-10', component: 'Border' },
              { label: '边框11', value: 'dv-border-box-11', component: 'Border' },
              { label: '边框12', value: 'dv-border-box-12', component: 'Border' },
              { label: '边框13', value: 'dv-border-box-13', component: 'Border' }
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
          defaultValue: { hex: color['dataV-primary-color'] }
        },
        {
          type: 'color-picker',
          label: '副颜色',
          key: 'vm-border-deputyColor',
          defaultValue: { hex: color['dataV-deputy-color'] }
        },
        {
          type: 'color-picker',
          label: '背景颜色',
          key: 'vm-border-backgroundColor',
          defaultValue: { hex: color['dataV-background-color'] }
        }
      ]
    }
  }
}

export default globalConfig
