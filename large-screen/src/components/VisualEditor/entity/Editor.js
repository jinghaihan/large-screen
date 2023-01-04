import _, { result } from 'lodash'
import moment from 'moment'
import hotkeys from 'hotkeys-js'
import { getUUID } from '../utils'
import { getImage, getPdf, downloadFile } from '../utils/output'
import { setCell, triggerCellUpdate } from '../utils/config'
import config from '../config'
import Paper from './Paper'

class Editor {
  constructor (option) {
    this.instance = {}
    this.operation = { ...config.operation }
    this.config = { basic: config.basic, model: config.model }
    this.cell = {}
    this.clipBoard = {}
    this.maxClipBoard = 20

    this.type = option ? option.type : 'smartReport'
  }
  setInstance (data) {
    Object.keys(data).forEach(key => {
      this.instance[key] = data[key]
    })
  }
  createPaper (uuid) {
    let key = uuid || getUUID()
    let paper = new Paper({
      key,
      layout: [],
      editor: this
    })
    paper.setInstance({ editor: this.instance['editor'] })
    this.instance['editor'].paper.entity[key] = paper
    this.instance['editor'].paper.layout[key] = []
    this.instance['editor'].paper.name[key] = ''
    if (!uuid) {
      this.instance['editor'].paper.current = key
    }
    this.instance['editor'].paper = { ...this.instance['editor'].paper }
    this.paper = this.instance['editor'].paper
  }
  removePaper (targetKey) {
    this.changeComponent()

    let lastIndex
    let instance = this.instance['editor']
    let activeKey = instance.paper.current
    let cellKeys = Object.keys(instance.paper.entity[targetKey].ownCell)

    // 判断删除Tab是否为当前Tab
    let keys = Object.keys(instance.paper.name)
    keys.forEach((paneKey, index) => {
      if (paneKey === targetKey) {
        lastIndex = index - 1
      }
    })

    // 删除选择Tab页的paper数据
    delete instance.paper.entity[targetKey]
    delete instance.paper.layout[targetKey]
    delete instance.paper.name[targetKey]

    // 计算activeKey
    keys = keys.filter(key => key !== targetKey)
    if (keys.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = keys[lastIndex]
      } else {
        activeKey = keys[0]
      }
    }
    instance.paper.current = activeKey
    instance.paper = { ...instance.paper }
    this.paper = instance.paper

    // 删除该Tab全部cell
    cellKeys.forEach(key => {
      delete this.cell[key]
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
    hotkeys('ctrl+c, command+c', async (vent) => {
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
  changeRatio (data) {
    this.instance.editor.ratio = _.cloneDeep(data)
  }
  changeGrid (color) {
    this.instance.editor.grid = _.cloneDeep({
      ...this.instance.editor.grid,
      color: color
    })
  }
  changeComponent (data) {
    let component = (data && data.props) ? data.props : {}
    this.instance.editor.component = _.cloneDeep(component)
  }
  deleteComponent (data) {
    if (this.instance.editor.component.key) {
      let paperInstance = this.instance.editor.paper.entity[this.instance.editor.paper.current]
      paperInstance.instance['layout'].$refs.layout.onDelete(this.instance.editor.component)
    }
  }
  async clear () {
    let instance = this.instance.editor
    instance.paper.layout[instance.paper.current] = []
    instance.paper.entity[instance.paper.current].instance['layout'].$refs.layout.layout = []
    Object.keys(this.cell).forEach(key => {
      delete this.cell[key]
    })
    this.changeComponent()
  }
  storeCell (data, cell) {
    this.cell[data.key] = cell
  }
  deleteCell (data) {
    if (data.type === 'searchPanel') {
      Object.keys(this.cell).forEach(key => {
        if (this.cell[key].componentType === 'search') {
          delete this.cell[key]
        }
      })
    }
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
  triggerCellUpdate (cell, componentType) {
    triggerCellUpdate(cell, componentType)
  }
  getConfig () {
    let config = {}
    Object.keys(this.paper.entity).forEach(key => {
      config[key] = this.paper.entity[key].getConfig()
    })
    return config
  }
  async setConfig (config) {
    config = JSON.parse(config)
    Object.keys(config).forEach(key => {
      this.createPaper(key)
    })
    
    await this.instance.editor.$nextTick()
    Object.keys(config).forEach(key => {
      this.setConfig(JSON.stringify(config[key]))
    })
  }
  async setPaperConfig (config) {
    await this.clear()
    this.paper.entity[this.paper.current].setConfig(config, this.type)
  }

  // 导出
  async output (type) {
    let data = await this.beforeExport()
    
    let base64
    Promise.all(Object.keys(this.paper.entity).map(key => {
      return new Promise(async (resolve, reject) => {
        let entity = this.paper.entity[key]
        let el = entity.instance.layout.$refs.paper
        switch (type) {
          case 'png':
            base64 = await getImage(el)
            break
          case 'pdf':
            base64 = await getPdf(el)
            break
          default:
            break
        }
        let fileName = entity.configData.basic ? entity.configData.basic.name : (type === 'png' ? '截图' : '文件')
        fileName += '-' + moment().format('HH:mm:ss') + `.${type}`
        resolve({ base64, fileName })
      })
    })).then(result => {
      result.forEach(item => {
        downloadFile(item.fileName, item.base64)
      })
      this.afterExport(data)
    })
  }
  async beforeExport () {
    let editor = this.instance.editor
    let grid = editor.grid

    this.changeComponent()
    editor.grid = _.cloneDeep({ ...editor.grid, show: false })

    await editor.$nextTick()

    return { grid }
  }
  afterExport (data) {
    let editor = this.instance.editor
    if (data.grid.show) {
      editor.grid = _.cloneDeep({ ...editor.grid, show: true })
    }
  }
}

export default Editor
