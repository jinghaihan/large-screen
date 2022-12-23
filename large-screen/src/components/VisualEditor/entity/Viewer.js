class Viewer {
  constructor () {
    this.instance = {}
    this.cell = {}
  }
  setInstance (data) {
    Object.keys(data).forEach(key => {
      this.instance[key] = data[key]
    })
  }
  storeCell (data, cell) {
    this.cell[data.key] = cell
  }
  async setLayout (data) {
    // 全局布局
    await this.instance.layout.onUpdate(data.paper || [])
    this.instance.layout.updatePromise = null
    // 查询面板布局
    if (this.instance.searchPanel) {
      await this.instance.searchPanel.onUpdate(data.searchs || [])
      this.instance.searchPanel.updatePromise = null
    }
  }
}

export default Viewer
