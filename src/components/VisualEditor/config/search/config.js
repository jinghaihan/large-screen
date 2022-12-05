const config = {
  config: {
    'searchPanel': {
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
    },
    'color': {
      type: 'collapse',
      name: '颜色设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'vm-color-color',
          defaultValue: { hex: '#000000A6' }
        },
        {
          type: 'color-picker',
          label: '占位文本颜色',
          key: 'vm-color-placeholderColor',
          defaultValue: { hex: '#808080' }
        },
        {
          type: 'color-picker',
          label: '背景颜色',
          key: 'vm-color-backgroundColor',
          defaultValue: { hex: '#fff' }
        },
        {
          type: 'color-picker',
          label: '边框颜色',
          key: 'vm-color-borderColor',
          defaultValue: { hex: '#d9d9d9' }
        }
      ]
    },
    'basic': {
      type: 'config',
      config: [
        {
          type: 'input',
          label: '标签',
          key: 'vm-props-label',
          defaultValue: '标签'
        }
      ]
    },
    'size': {
      type: 'config',
      config: [
        {
          type: 'select',
          label: '控件大小',
          key: 'vm-props-size',
          defaultValue: 'default',
          props: {
            options: [
              { label: '小', value: 'small' },
              { label: '默认', value: 'default' },
              { label: '大', value: 'large' }
            ]
          }
        }
      ]
    },
    'placeholder': {
      type: 'config',
      config: [
        {
          type: 'input',
          label: '占位文本',
          key: 'vm-props-placeholder',
          defaultValue: null
        }
      ]
    },
    'radio-color': {
      type: 'collapse',
      name: '颜色设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'vm-color-color',
          defaultValue: { hex: '#000000A6' }
        },
        {
          type: 'color-picker',
          label: '背景颜色',
          key: 'vm-color-backgroundColor',
          defaultValue: { hex: '#fff' }
        },
        {
          type: 'color-picker',
          label: '选中颜色',
          key: 'vm-color-checkedColor',
          defaultValue: { hex: '#1890ff' }
        },
        {
          type: 'color-picker',
          label: '边框颜色',
          key: 'vm-color-borderColor',
          defaultValue: { hex: '#d9d9d9' }
        }
      ]
    },
    'checkbox-color': {
      type: 'collapse',
      name: '颜色设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'vm-color-color',
          defaultValue: { hex: '#000000A6' }
        },
        {
          type: 'color-picker',
          label: '背景颜色',
          key: 'vm-color-backgroundColor',
          defaultValue: { hex: '#fff' }
        },
        {
          type: 'color-picker',
          label: '选中颜色',
          key: 'vm-color-checkedBorderColor',
          defaultValue: { hex: '#fff' }
        },
        {
          type: 'color-picker',
          label: '选中背景颜色',
          key: 'vm-color-checkedBackgroundColor',
          defaultValue: { hex: '#1890ff' }
        },
        {
          type: 'color-picker',
          label: '边框颜色',
          key: 'vm-color-borderColor',
          defaultValue: { hex: '#d9d9d9' }
        }
      ]
    }
  }
}

export default config
