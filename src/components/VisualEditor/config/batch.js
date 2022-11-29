import color from './color'

const config = [
  {
    type: 'select',
    label: '主题',
    key: 'theme',
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    },
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
    col: 12,
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    defaultValue: { hex: '#333' }
  },
  {
    type: 'color-picker',
    label: '边框主色',
    key: 'vm-border-primaryColor',
    col: 12,
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    defaultValue: { hex: color['dataV-primary-color'] }
  },
  {
    type: 'color-picker',
    label: '边框副色',
    key: 'vm-border-deputyColor',
    col: 12,
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    defaultValue: { hex: color['dataV-deputy-color'] }
  },
  {
    type: 'color-picker',
    label: '边框背景色',
    key: 'vm-border-backgroundColor',
    col: 12,
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    defaultValue: { hex: color['dataV-background-color'] }
  }
]

export default config
