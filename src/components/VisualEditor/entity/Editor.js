import _ from 'lodash'
import hotkeys from 'hotkeys-js'
import { getUUID } from '../utils'

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

class Editor {
  constructor () {
    this.instance = {}
    this.operation = { sidebar, renderer, layer, library, navbar }
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
      },
      onCancel () { }
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

    // TODO-组件配置清空
  }
}

export default Editor
