const config = {
  // 配置
  textConfig: {
    'basic': {
      type: 'config',
      config: [
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'style-color',
          defaultValue: { hex: '#333' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'style-fontSize?pixel',
          defaultValue: 24
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'style-fontWeight',
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
          key: 'style-textAlign',
          defaultValue: 'center',
          props: {
            options: [
              { label: '左对齐', value: 'left' },
              { label: '居中', value: 'center' },
              { label: '右对齐', value: 'right' }
            ]
          }
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
    },
    'billboard': {
      type: 'config',
      config: [
        {
          type: 'input',
          label: '数值前缀',
          key: 'prefix',
          defaultValue: ''
        },
        {
          type: 'input',
          label: '数值后缀',
          key: 'suffix',
          defaultValue: ''
        },
        {
          type: 'input',
          label: '千分位标识符',
          key: 'groupSeparator',
          defaultValue: ','
        }
      ]
    },
    'billboard-title': {
      type: 'collapse',
      name: '标题设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'input',
          label: '数值标题',
          key: 'title',
          defaultValue: '访问量'
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'titleStyle-color',
          defaultValue: { hex: '#00000073' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'titleStyle-fontSize?pixel',
          defaultValue: 24
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'titleStyle-fontWeight',
          defaultValue: 'normal',
          props: {
            options: [
              { label: '默认', value: 'normal' },
              { label: '粗', value: 'bold' },
              { label: '加粗', value: 'bolder' },
              { label: '细', value: 'lighter' }
            ]
          }
        }
      ]
    },
    'billboard-value': {
      type: 'collapse',
      name: '数值设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'input-number',
          label: '数值内容',
          key: 'value',
          defaultValue: 112893
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'valueStyle-color',
          defaultValue: { hex: '#000000D9' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'valueStyle-fontSize?pixel',
          defaultValue: 34
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'valueStyle-fontWeight',
          defaultValue: 'normal',
          props: {
            options: [
              { label: '默认', value: 'normal' },
              { label: '粗', value: 'bold' },
              { label: '加粗', value: 'bolder' },
              { label: '细', value: 'lighter' }
            ]
          }
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
