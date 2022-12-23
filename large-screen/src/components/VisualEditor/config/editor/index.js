import color from '../color'

// 操作按钮
const sidebar = [
  { name: '返回', key: 'close', icon: 'rollback', active: false },
  { name: '图表', key: 'chart', icon: 'area-chart', active: true },
  { name: '文本', key: 'text', icon: 'font-colors', active: true },
  { name: '装饰', key: 'decoration', icon: 'star', active: true },
  { name: '图片', key: 'image', icon: 'picture', active: true },
  { name: '视频', key: 'video', icon: 'video-camera', active: true },
  { name: '音频', key: 'audio', icon: 'audio', active: true },
  { name: '查询', key: 'search', icon: 'search', active: true },
  { name: '表格', key: 'table', icon: 'table', active: true },
  { name: '剪贴板', key: 'clipBoard', icon: 'copy', active: true }
]
const renderer = [
  { name: '复制', key: 'copy', icon: 'copy', disable: ['search', 'table'] },
  { name: '查看源码', key: 'viewSource', icon: 'eye', enable: ['chart'] },
  { name: '删除', key: 'delete', icon: 'delete' }
]
const library = [
  { name: '模板库', icon: 'layout', key: 'template', type: 'primary' },
  { name: '主题库', icon: 'bg-colors', key: 'theme', type: 'danger' }
]
const navbar = [
  { name: '预览', icon: 'eye', key: 'view' },
  { name: '批量修改', icon: 'edit', key: 'edit' },
  { name: '默认数据限制器', icon: 'filter', key: 'limit' },
  { name: '截图', icon: 'file-image', key: 'screenshot' },
  { name: '生成PDf', icon: 'file-pdf', key: 'pdf' },
  { name: '保存', icon: 'save', key: 'save' }
]
const configPanel = [
  { name: '基础配置', key: 'basic' },
  { name: '模型配置', key: 'model' },
  { name: '组件配置', key: 'component' }
]

// 表单配置
const basic = [
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

// 模型配置
const model = [
  {
    type: 'select',
    label: '模型',
    key: 'model',
    defaultValue: undefined,
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    },
    props: {
      options: []
    }
  }
]

export { sidebar, renderer, library, navbar, configPanel, basic, model }
