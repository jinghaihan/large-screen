const config = {
  // 配置
  textConfig: {
    'basic': {
      type: 'config',
      config: [
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'color',
          defaultValue: { hex: '#333' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'fontSize?pixel',
          defaultValue: 24
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'fontWeight',
          defaultValue: 'normal',
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
          label: '对齐方式',
          key: 'textAlign',
          defaultValue: 'center',
          props: {
            options: [
              { label: '左对齐', value: 'left' },
              { label: '居中', value: 'center' },
              { label: '右对齐', value: 'right' }
            ]
          }
        },
        {
          type: 'switch',
          label: '提示框',
          key: 'tooltip',
          defaultValue: false
        }
      ]
    },
    'single-line': {
      type: 'config',
      config: [
        {
          type: 'input',
          label: '文本内容',
          key: 'text',
          defaultValue: '单行文本'
        }
      ]
    },
    'multi-line': {
      type: 'config',
      config: [
        {
          type: 'textarea',
          label: '文本内容',
          key: 'text',
          defaultValue: '多行文本'
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
