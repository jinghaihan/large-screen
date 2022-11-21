import _ from 'lodash'
import moment from 'moment'
import hotkeys from 'hotkeys-js'
import { getUUID } from '../utils'
import { sidebar, renderer, layer, library, navbar, configPanel, basic } from '../config/editor'

class Editor {
  constructor () {
    this.instance = {}
    this.operation = { sidebar, renderer, layer, library, navbar, configPanel }
    this.config = { basic }
    this.cell = {}
    this.clipBoard = {}
    this.maxClipBoard = 20
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
    let _this = this
    let instance = _this.instance.editor
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
        let layout = _this.instance['layout'].$refs['layer'][index].layout
        layout.forEach(item => {
          _this.deleteCell(item.props)
        })

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
    this.instance.editor.layer = _.cloneDeep({
      ...this.instance.editor.layer,
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
  copyCell (data) {
    let key = data.props.name + '-' + moment().format('HH:mm:ss')
    this.clipBoard[key] = {
      name: key,
      type: data.props.type,
      image: data.props.image,
      col: 24,
      w: data.w,
      h: data.h,
      props: {
        componentType: data.props.componentType,
        parentKey: data.props.key
      }
    }
    let keys = Object.keys(this.clipBoard)
    if (keys.length > this.maxClipBoard) {
      delete this.clipBoard[keys[0]]
    }
    this.instance.editor.activeKey = 'clipBoard'
    // 刷新拖拽面板视图
    this.instance.dragPanel.$forceUpdate()
  }
  deleteClipBoardCell (data) {
    let _this = this
    _this.instance.editor.$confirm({
      title: `您确定删除${data.name}配置吗？`,
      content: '',
      confirmLoading: true,
      okText: '确定',
      cancelText: '取消',
      onOk () {
        let key = data.name
        delete _this.clipBoard[key]
        // 刷新拖拽面板视图
        _this.instance.dragPanel.$forceUpdate()
      },
      onCancel () { }
    })
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
