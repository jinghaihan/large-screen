// 操作按钮
const sidebar = [
  { name: '返回', key: 'close', icon: 'rollback', active: false },
  { name: '可视化组件', key: 'chart', icon: 'area-chart', active: true },
  { name: '多媒体组件', key: 'multiMedia', icon: 'video-camera', active: true },
  { name: '文本组件', key: 'text', icon: 'font-colors', active: true }
]
const renderer = [
  { name: '复制', key: 'copy', icon: 'copy' },
  { name: '删除', key: 'delete', icon: 'delete' }
]
const layer = [
  { name: '修改名称', icon: 'edit', key: 'edit' },
  { name: '删除图层', icon: 'delete', key: 'delete' }
]
const library = [
  { name: '模板库', icon: 'fund', key: 'template', type: 'primary' },
  { name: '主题库', icon: 'bg-colors', key: 'theme', type: 'danger' }
]
const navbar = [
  { name: '截图', icon: 'picture', key: 'screenshot' },
  { name: '保存', icon: 'save', key: 'save' }
]
const configPanel = [
  { name: '基础配置', key: 'basic' },
  { name: '图层配置', key: 'layer' },
  { name: '组件配置', key: 'component' }
]

// 表单配置
const basic = [
  {
    type: 'input',
    label: '名称',
    key: 'name',
    defaultValue: null,
    rules: [
      { required: true, message: '请输入名称', whitespace: true }
    ],
    props: {
      placeholder: '请输入名称',
      disabled: false,
      allowClear: true
    }
  },
  {
    type: 'textarea',
    label: '描述',
    key: 'description',
    defaultValue: null,
    rules: [
      { required: false, message: '请输入描述', whitespace: true }
    ],
    props: {
      maxLength: 300,
      placeholder: '请输入描述',
      disabled: false,
      allowClear: true
    }
  },
  {
    type: 'input-number',
    label: '长比例',
    key: 'ratioWidth',
    defaultValue: null,
    rules: [
      { required: true, message: '请输入长比例' }
    ],
    props: {
      placeholder: '长比例',
      disabled: false
    }
  },
  {
    type: 'input-number',
    label: '宽比例',
    key: 'ratioHeight',
    defaultValue: null,
    rules: [
      { required: true, message: '请输入宽比例' }
    ],
    props: {
      placeholder: '宽比例',
      disabled: false
    }
  },
  {
    type: 'color-picker',
    label: '网格线颜色',
    key: 'gridColor',
    defaultValue: null,
    rules: [
      { required: false, message: '请选择网格线颜色' }
    ],
    props: {
      disabled: false
    }
  },
  {
    type: 'material-library',
    libraryType: 'picture',
    label: '背景',
    key: 'background',
    defaultValue: 'none',
    rules: [
      { required: false, message: '请选择背景' }
    ],
    props: {
      disabled: false
    }
  }
]

export { sidebar, renderer, layer, library, navbar, configPanel, basic }
