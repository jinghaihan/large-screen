import moment from 'moment'

const config = {
  // 配置
  config: {
    'basic': {
      type: 'config',
      config: [
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'vm-style-color',
          defaultValue: { hex: '#333' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'vm-style-fontSize?pixel',
          defaultValue: 24
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'vm-style-fontWeight',
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
          key: 'vm-style-textAlign',
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
          key: 'vm-text',
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
          key: 'vm-text',
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
          key: 'vm-prefix',
          defaultValue: ''
        },
        {
          type: 'input',
          label: '数值后缀',
          key: 'vm-suffix',
          defaultValue: ''
        },
        {
          type: 'input',
          label: '千分位标识符',
          key: 'vm-groupSeparator',
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
          key: 'vm-title',
          defaultValue: '访问量'
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'vm-titleStyle-color',
          defaultValue: { hex: '#00000073' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'vm-titleStyle-fontSize?pixel',
          defaultValue: 24
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'vm-titleStyle-fontWeight',
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
          key: 'vm-value',
          defaultValue: 112893
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'vm-valueStyle-color',
          defaultValue: { hex: '#000000D9' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'vm-valueStyle-fontSize?pixel',
          defaultValue: 34
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'vm-valueStyle-fontWeight',
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
    'billboard-countdown': {
      type: 'config',
      config: [
        {
          type: 'input',
          label: '数值前缀',
          key: 'vm-prefix',
          defaultValue: ''
        },
        {
          type: 'input',
          label: '数值后缀',
          key: 'vm-suffix',
          defaultValue: ''
        },
        {
          type: 'input',
          label: '格式化',
          key: 'vm-format',
          defaultValue: 'HH:mm:ss'
        }
      ]
    },
    'billboard-countdown-title': {
      type: 'collapse',
      name: '标题设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'input',
          label: '数值标题',
          key: 'vm-title',
          defaultValue: '倒计时'
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'vm-titleStyle-color',
          defaultValue: { hex: '#00000073' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'vm-titleStyle-fontSize?pixel',
          defaultValue: 24
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'vm-titleStyle-fontWeight',
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
    'billboard-countdown-value': {
      type: 'collapse',
      name: '数值设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'input',
          label: '数值内容',
          key: 'vm-value',
          defaultValue: moment().add(1, 'days').format('YYYY-MM-DD')
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'vm-valueStyle-color',
          defaultValue: { hex: '#000000D9' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'vm-valueStyle-fontSize?pixel',
          defaultValue: 34
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'vm-valueStyle-fontWeight',
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
    'notable': {
      type: 'config',
      config: [
        {
          type: 'input',
          label: '文本内容',
          key: 'vm-text',
          defaultValue: '走马灯'
        },
        {
          type: 'input-number',
          label: '滚动速度(S)',
          key: 'vm-duration',
          defaultValue: 4,
          props: {
            mine: 0
          }
        },
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'vm-style-color',
          defaultValue: { hex: '#333' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'vm-style-fontSize?pixel',
          defaultValue: 24
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'vm-style-fontWeight',
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
    'clock': {
      type: 'config',
      config: [
        {
          type: 'input-number',
          label: '卡片高度',
          key: 'vm-cardStyle-height?pixel',
          defaultValue: 100
        },
        {
          type: 'input-number',
          label: '卡片宽度',
          key: 'vm-cardStyle-width?pixel',
          defaultValue: 70
        },
        {
          type: 'color-picker',
          label: '背景颜色',
          key: 'vm-cardStyle-background',
          defaultValue: { hex: '#fff' }
        }
      ]
    },
    'clock-font': {
      type: 'collapse',
      name: '字体设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'color-picker',
          label: '字体颜色',
          key: 'vm-cardStyle-color',
          defaultValue: { hex: '#333' }
        },
        {
          type: 'input-number',
          label: '字体大小',
          key: 'vm-cardStyle-fontSize?pixel',
          defaultValue: 36
        },
        {
          type: 'select',
          label: '字体粗细',
          key: 'vm-cardStyle-fontWeight',
          defaultValue: 'bold',
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
    'clock-border': {
      type: 'collapse',
      name: '时钟边框设置',
      switch: false,
      defaultValue: true,
      config: [
        {
          type: 'color-picker',
          label: '边框颜色',
          key: 'vm-cardStyle-borderColor',
          defaultValue: { hex: '#e8e8e8' }
        },
        {
          type: 'input-number',
          label: '边框宽度',
          key: 'vm-cardStyle-borderWidth?pixel',
          defaultValue: 1
        },
        {
          type: 'select',
          label: '边框样式',
          key: 'vm-cardStyle-borderStyle',
          defaultValue: 'solid',
          props: {
            options: [
              { label: '实线边框', value: 'solid' },
              { label: '点线边框', value: 'dotted' },
              { label: '虚线边框', value: 'dashed' },
              { label: '双边框', value: 'double' },
              { label: '3D沟槽边框', value: 'groove' },
              { label: '3D脊边框', value: 'ridge' },
              { label: '3D嵌入边框', value: 'inset' },
              { label: '3D突出边框', value: 'outset' }
            ]
          }
        }
      ]
    }
  }
}

export default config
