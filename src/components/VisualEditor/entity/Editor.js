import _ from 'lodash'
import hotkeys from 'hotkeys-js'
import { getUUID } from '../utils'

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

class Editor {
  constructor () {
    this.instance = {}
    this.operation = { sidebar, renderer, layer, library, navbar, configPanel }
    this.config = { basic }
    this.cell = {}
  }
  setInstance (data) {
    Object.keys(data).forEach(key => {
      this.instance[key] = data[key]
    })
  }
  initHotKey () {
    hotkeys('ctrl+up, command+up', (event) => {
      this.changeScale('up')
    })
    hotkeys('ctrl+down, command+down', (event) => {
      this.changeScale('down')
    })
    hotkeys('ctrl+shift+k, command+shift+k', (event) => {
      this.instance.editor.grid = _.cloneDeep({
        ...this.instance.editor.grid,
        show: !this.instance.editor.grid.show
      })
    })
    hotkeys('delete, backspace', (event) => {
      this.deleteComponent()
    })
  }
  changeScale (type) {
    let scale = this.instance.editor.scale
    if (type === 'up') {
      scale += 0.1
    } else {
      scale -= 0.1
    }
    if (scale < 0.5) scale = 0.5
    if (scale > 1.5) scale = 1.5
    this.instance.editor.scale = scale
  }
  changeComponent (data) {
    let component = data && data.props ? data.props : {}
    this.instance.editor.component = _.cloneDeep(component)
  }
  deleteComponent (data) {
    if (this.instance.editor.component.key) {
      this.instance['layout'].$refs['layer'][this.instance.editor.layer.current].onDelete(this.instance.editor.component)
    }
  }
  createLayer (data) {
    let instance = this.instance.editor
    if (instance.layout.length >= instance.layer.max) {
      instance.$notification.error({ message: '错误', description: `最多支持${instance.layer.max}个图层` })
      return
    }
    instance.layout.push({
      key: getUUID(),
      name: data.name,
      visible: true,
      layout: []
    })
    instance.layer = _.cloneDeep({
      ...instance.layer,
      current: instance.layout.length - 1
    })
    this.changeComponent()
    instance.$notification.success({ message: '成功', description: `新增成功` })
  }
  editLayer (data) {
    let instance = this.instance.editor
    let index = instance.layout.findIndex(item => item.key === data.key)
    instance.layout[index].name = data.name
  }
  changeLayer (key) {
    let instance = this.instance.editor
    let index = instance.layout.findIndex(data => data.key === key)
    instance.layer = _.cloneDeep({
      ...instance.layer,
      current: index
    })
    this.changeComponent()
  }
  deleteLayer (data) {
    let instance = this.instance.editor
    if (instance.layout.length === 1) {
      instance.$notification.error({ message: '错误', description: `请至少配置2个图层` })
      return
    }

    instance.$confirm({
      title: `您确定删除${data.name}吗？`,
      content: '该图层配置数据将一同删除',
      confirmLoading: true,
      okText: '确定',
      cancelText: '取消',
      onOk () {
        let index = instance.layout.findIndex(item => item.key === data.key)
        instance.layout = instance.layout.filter(item => item.key !== data.key)
        if (index === instance.layer.current) {
          if (!index) {
            instance.layer = _.cloneDeep({
              ...instance.layer,
              current: index + 1
            })
          } else {
            instance.layer = _.cloneDeep({
              ...instance.layer,
              current: index - 1
            })
          }
        }
        instance.$notification.success({ message: '成功', description: `删除成功` })
      },
      onCancel () { }
    })
  }
  updateLayer (data) {
    this.instance.editor.layout = _.cloneDeep(data.layout)
    this.instance.layer = _.cloneDeep({
      ...this.instance.layer,
      current: data.layer
    })
  }
  async clear () {
    let instance = this.instance.editor
    this.changeLayer(instance.layout[0].key)
    instance.layout = instance.layout.filter((item, index) => !index).map(item => {
      return {
        ...item,
        name: '图层1',
        visible: true,
        layout: []
      }
    })
    this.instance['layout'].$refs['layer'][this.instance.editor.layer.current].layout = []
    this.cell = {}
  }
  setCell (data, cell) {
    this.cell[data.key] = cell
  }
  deleteCell (data) {
    delete this.cell[data.key]
  }
  changeRatio (data) {
    this.instance.editor.ratio = _.cloneDeep(data)
  }
  changeGrid (color) {
    this.instance.editor.grid = _.cloneDeep({
      ...this.instance.editor.grid,
      color: color
    })
  }
  changeBackground (image) {
    this.instance.layout.backgroundStyle = _.cloneDeep({
      ...this.instance.layout.backgroundStyle,
      backgroundImage: !image || image === 'none' ? 'none' : `url(${image})`
    })
  }
}

export default Editor
