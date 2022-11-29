const config = [
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
    type: 'color-picker',
    label: '字体颜色',
    key: 'fontColor',
    defaultValue: { hex: '#333' }
  },
  {
    type: 'color-picker',
    label: '边框主色',
    key: 'vm-border-primaryColor',
    defaultValue: { hex: '#4fd2dd' }
  },
  {
    type: 'color-picker',
    label: '边框副色',
    key: 'vm-border-deputyColor',
    defaultValue: { hex: '#235fa7' }
  },
  {
    type: 'color-picker',
    label: '边框背景色',
    key: 'vm-border-backgroundColor',
    defaultValue: { hex: '#00000000' }
  }
]

export default config
