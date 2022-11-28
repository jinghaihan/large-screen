// 操作按钮
const sidebar = [
  { name: '返回', key: 'close', icon: 'rollback', active: false },
  { name: '可视化组件', key: 'chart', icon: 'area-chart', active: true },
  { name: '文本组件', key: 'text', icon: 'font-colors', active: true },
  { name: '表格组件', key: 'table', icon: 'table', active: true },
  { name: '图片', key: 'image', icon: 'picture', active: true },
  { name: '视频', key: 'video', icon: 'video-camera', active: true },
  { name: '音频', key: 'audio', icon: 'audio', active: true },
  { name: '剪贴板', key: 'clipBoard', icon: 'copy', active: true }
]
const renderer = [
  { name: '复制', key: 'copy', icon: 'copy' },
  { name: '查看源码', key: 'viewSource', icon: 'eye', only: ['chart'] },
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
  { name: '批量修改', icon: 'edit', key: 'edit' },
  { name: '截图', icon: 'picture', key: 'screenshot' },
  { name: '生成PDf', icon: 'file-pdf', key: 'pdf' },
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
    ]
  },
  {
    type: 'textarea',
    label: '描述',
    key: 'description',
    defaultValue: null,
    props: {
      maxLength: 300
    }
  },
  {
    type: 'input-number',
    label: '长比例',
    key: 'ratioWidth',
    defaultValue: null,
    rules: [
      { required: true, message: '请输入长比例' }
    ]
  },
  {
    type: 'input-number',
    label: '宽比例',
    key: 'ratioHeight',
    defaultValue: null,
    rules: [
      { required: true, message: '请输入宽比例' }
    ]
  },
  {
    type: 'color-picker',
    label: '网格线颜色',
    key: 'gridColor',
    defaultValue: null
  },
  {
    type: 'material-library',
    libraryType: 'picture',
    label: '背景',
    key: 'background',
    defaultValue: 'none'
  }
]

export { sidebar, renderer, layer, library, navbar, configPanel, basic }
