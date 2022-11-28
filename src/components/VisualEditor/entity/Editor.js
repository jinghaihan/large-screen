import _ from 'lodash'
import moment from 'moment'
import hotkeys from 'hotkeys-js'
import { getUUID, getImage, getPdf } from '../utils'
import { downloadFile } from '../utils/output'
import config from '../config'

class Editor {
  constructor () {
    this.instance = {}
    this.operation = { ...config.operation }
    this.config = { basic: config.basic }
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
    hotkeys('ctrl+c, command+c', async (event) => {
      let component = this.instance.editor.component
      let cell = this.cell[component.key]
      if (!component || !cell) {
        return
      }

      this.copyCell({
        ...cell.vm.data,
        props: {
          ...component,
          image: cell.componentType === 'chart' 
            ? cell.chart.getDataURL() 
            : (cell.type === 'video' ? cell.thumbnail : await getImage(cell.el))
        }
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
    let key = data.props.name ? data.props.name + '-' + moment().format('HH:mm:ss') : moment().format('HH:mm:ss')
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
      title: `您确定删除${data.name}记录吗？`,
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
  batchEdit (data) {
    Object.keys(this.cell).forEach(key => {
      let componentType = this.cell[key].componentType
      let formData = _.cloneDeep(this.cell[key].configData.formData)
      switch (componentType) {
        case 'chart':
          handleChartComponent(data, formData)
          this.cell[key].change(
            formData,
            this.cell[key].type,
            this.cell[key].configData.switch
          )
          break
        case 'text':
          handleTextComponent(data, formData)
          this.cell[key].update(formData)
          break
        default:
          break
      }
      this.cell[key].configData.formData = formData
    })
  }
  async output (type) {
    let data = await this.beforeExport()
    let base64
    switch (type) {
      case 'png':
        base64 = await getImage(this.instance.layout.$el)
        break
      case 'pdf':
        base64 = await getPdf(this.instance.layout.$el)
        break
      default:
        break
    }
    let fileName = this.instance.basicPanel.formData && this.instance.basicPanel.formData.name
      ? this.instance.basicPanel.formData.name : (type === 'png' ? '截图' : '文件')
    downloadFile(fileName + '-' + moment().format('HH:mm:ss') + `.${type}`, base64)

    this.afterExport(data)
  }
  async beforeExport () {
    let editor = this.instance.editor
    let grid = editor.grid
    let layer = editor.layer

    this.changeComponent()
    editor.grid = _.cloneDeep({ ...editor.grid, show: false })
    editor.layer = _.cloneDeep({ ...editor.layer, current: 0 })
    await editor.$nextTick()

    return { grid, layer }
  }
  afterExport (data) {
    let editor = this.instance.editor
    if (data.grid.show) {
      editor.grid = _.cloneDeep({ ...editor.grid, show: true })
    }
    if (data.layer.current) {
      editor.layer = _.cloneDeep({ ...editor.layer, current: data.layer.current })
    }
  }
  getConfig () {
    
  }
  setConfig () {
    
  }
}

// 字体颜色
const fontColorList = [
  'xAxis-axisLine-lineStyle-color/yAxis-axisLine-lineStyle-color',
  'legend-textStyle-color',
  'radar-axisName-color',
  'geo-emphasis-label-color',
  'geo-label-color',
  'series-label-color',
  'series-emphasis-label-color',
  'series-label-color',
  'series-detail-color',
  'series-axisLabel-color'
]
function handleChartComponent (data, formData) {
  Object.keys(data).forEach(key => {
    switch (key) {
      case 'fontColor':
        Object.keys(formData).forEach(item => {
          if (fontColorList.includes(item)) {
            formData[item] = data[key]
          }
        })
        break
      default:
        formData[key] = data[key]
        break
    }
  })
}

function handleTextComponent (data, formData) {
  Object.keys(data).forEach(key => {
    switch (key) {
      case 'fontColor':
        Object.keys(formData).forEach(item => {
          if (item.match(/-color/g)) {
            formData[item] = data[key]
          }
        })
        break
      default:
        formData[key] = data[key]
        break
    }
  })
}

export default Editor
