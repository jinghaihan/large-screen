<template>
  <div ref="container"
       class="paper-drag-container"
       @mousedown="onMouseDown"
       @mousemove="onMouseMove"
       @mouseup="onMouseUp">
    <div ref="paper"
         class="paper-background-container"
         :style="backgroundStyle">
      <div ref="grid"
           class="paper-grid-container"
           :style="gridStyle">
        <div class="layer-content-container"
             v-for="(data, index) in layout"
             :key="data.key + '-' + index"
             :style="getLayerStyle(index)">
          <Layer v-show="data.visible"
                 ref="layer"
                 :editor="editor"
                 :data="data.layout"
                 :ratio="ratio"
                 :grid="grid"
                 :resizable="index === layer.current"
                 :draggable="index === layer.current"
                 :rowHeight="rowHeight"
                 :component="component"
          >
          </Layer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Layer from './layer.vue'

export default {
  props: {
    editor: null,
    layout: {
      type: Array,
      required: true
    },
    scale: {
      type: Number,
      required: true
    },
    layer: {
      type: Object,
      required: true
    },
    ratio: {
      type: Object,
      required: true
    },
    grid: {
      type: Object,
      required: true
    },
    component: {
      type: Object,
      required: true
    }
  },
  components: { Layer },
  data () {
    return {
      diffmove: {
        start: { x: 0, y: 0 },
        move: false
      },
      rowHeight: 0,
      gridStyle: {},
      backgroundStyle: {
        backgroundImage: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  watch: {
    scale: {
      handler: function (scale) {
        this.onScaleChange(scale)
      }
    },
    ratio: {
      deep: true,
      handler: function (ratio) {
        this.onRatioChange()
      }
    },
    grid: {
      deep: true,
      handler: function (grid) {
        this.onGridChange()
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.editor.setInstance({ layout: this })
      this.initRender()
    },
    async initRender () {
      await this.$nextTick()
      this.$refs.paper.style['aspect-ratio'] = `${this.ratio.width} / ${this.ratio.height}`
      let paperRect = this.$refs.paper.getBoundingClientRect()
      let containerRect = this.$refs.container.getBoundingClientRect()
      let diffRectX = paperRect.left - containerRect.left
      let diffRectY = paperRect.top - containerRect.top
      this.$refs.paper.style.left = diffRectX + 'px'
      this.$refs.paper.style.top = diffRectY + 'px'
      this.$refs.paper.style.right = 'auto'
      this.$refs.paper.style.bottom = 'auto'
      this.$refs.paper.style.margin = 0
    },
    onScaleChange (scale) {
      let containerWidth = this.$refs.container.getBoundingClientRect().width
      this.$refs.paper.style.width = containerWidth * 0.9 * scale + 'px'
      this.onGridChange()
    },
    onRatioChange () {
      this.$refs.paper.style.left = 0
      this.$refs.paper.style.top = 0
      this.$refs.paper.style.right = 0
      this.$refs.paper.style.bottom = 0
      this.$refs.paper.style.margin = 'auto'
      this.initRender()
    },
    onGridChange () {
      if (this.grid.show) {
        let gridStyle = { backgroundRepeat: `repeat` }
        this.rowHeight = this.$refs.paper.getBoundingClientRect().width / this.grid.count
        gridStyle.backgroundSize = `${this.rowHeight}px ${this.rowHeight}px`
        let rgb = `rgb(${this.grid.color.r}, ${this.grid.color.g}, ${this.grid.color.b})`
        gridStyle.backgroundImage = `linear-gradient(90deg, ${rgb} 5%,transparent 0), linear-gradient(${rgb} 5%, transparent 0)`
        this.gridStyle = _.cloneDeep(gridStyle)
      } else {
        this.gridStyle = {}
      }
    },
    onMouseDown (e) {
      if (e.target === this.$refs.container) {
        this.diffmove = {
          start: {
            x: e.clientX,
            y: e.clientY
          },
          move: true
        }
        document.onselectstart = function () { return false }
      }
    },
    onMouseMove (e) {
      if (this.diffmove.move) {
        const newX = e.clientX
        const newY = e.clientY
        let diffX = newX - this.diffmove.start.x
        let diffY = newY - this.diffmove.start.y

        let paperRect = this.$refs.paper.getBoundingClientRect()
        let containerRect = this.$refs.container.getBoundingClientRect()
        let diffRectX = paperRect.left - containerRect.left
        let diffRectY = paperRect.top - containerRect.top

        this.$refs.paper.style.left = diffRectX + diffX + 'px'
        this.$refs.paper.style.top = diffRectY + diffY + 'px'
        this.$refs.paper.style.right = 'auto'
        this.$refs.paper.style.bottom = 'auto'
        this.$refs.paper.style.margin = 0

        this.diffmove = {
          start: {
            x: newX,
            y: newY
          },
          move: true
        }
      }
    },
    onMouseUp (e) {
      document.onselectstart = null
      this.diffmove = {
        start: { x: 0, y: 0 },
        move: false
      }
    },
    getLayerStyle (layer) {
      return {
        'z-index': this.layer.current === layer ? layer + this.layer.max : layer
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .paper-drag-container{
    height: calc(~"100% - 50px");
    width: calc(~"100% - 50px");
    position: absolute;
    top: 50px;
    left: 50px;
    z-index: 1;
    background: transparent;
    cursor: pointer;
    overflow-x: hidden;
    overflow-y: auto;
    .paper-background-container{
      width: 90%;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      background: var(--primary-color);
      box-shadow: 0 0 12px var(--shadow-color);
      .paper-grid-container,
      .layer-content-container{
        height: 100%;
        width: 100%;
      }
      .paper-grid-container{
        position: relative;
      }
      .layer-content-container{
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>

<style lang="less">
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    border-radius: 10px;
    background-color: rgba(50, 50, 50, .1);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    background-color: rgba(50, 50, 50, .3);
  }
</style>
