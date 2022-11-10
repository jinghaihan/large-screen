<template>
  <div class="paper-wrapper">
    <!-- 刻度尺 -->
    <TickMark :scale="scale"></TickMark>
    <!-- 画布 -->
    <div class="paper-panel"
        ref="paperPanel"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp">
      <div ref="dropPaper"
          :class="`drop-paper-${ratio.width}-${ratio.height} drop-paper`"
          :style="getStyle()">
        <GridLayoutContainer :layout="layout"
                              :colNum="colNum"
                              :rowHeight="rowHeight"
                              :ratio="ratio"
                              :layer="layer"
                              :maxLayer="maxLayer"
                              :el="el"
                              :root="root"
                              ref="gridLayoutContainer">
        </GridLayoutContainer>
      </div>
    </div>
  </div>
</template>

<script>
import TickMark from './tickMark/tickMark.vue'
import GridLayoutContainer from './layout/gridLayoutContainer.vue'

export default {
  name: 'paper',
  components: { TickMark, GridLayoutContainer },
  props: {
    layout: {
      type: Array,
      required: true
    },
    colNum: {
      type: Number,
      required: true
    },
    layer: {
      type: Number,
      required: true
    },
    maxLayer: {
      type: Number,
      required: true
    },
    ratio: {
      type: Object,
      required: true
    },
    scale: {
      type: Number,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    },
    el: {
      type: Object,
      required: true
    },
    root: {
      required: true
    }
  },
  data () {
    return {
      style: {
        backgroundImage: 
          `linear-gradient(90deg, rgb(240, 240, 240) 5%,transparent 0),
          linear-gradient(rgb(240, 240, 240) 5%, transparent 0)`,
        backgroundRepeat: `repeat`
      },
      rowHeight: null,
      diffmove: {
        start: { x: 0, y: 0 },
        move: false
      }
    }
  },
  watch: {
    scale: {
      handler: function (scale) {
        this.onScaleChange(scale)
      }
    }
  },
  mounted () {
    this.onRendered()
  },
  methods: {
    getStyle () {
      if (this.grid) {
        this.rowHeight = this.$refs.dropPaper.offsetWidth / 100
        this.style.backgroundSize = `${this.rowHeight}px ${this.rowHeight}px`
        return this.style
      } else {
        return {}
      }
    },
    onMouseDown (e) {
      if (e.target === this.$refs.paperPanel) {
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

        let paperRect = this.$refs.dropPaper.getBoundingClientRect()
        let panelRect = this.$refs.paperPanel.getBoundingClientRect()
        let diffRectX = paperRect.left - panelRect.left
        let diffRectY = paperRect.top - panelRect.top

        this.$refs.dropPaper.style.left = diffRectX + diffX < 0 ? 0 : diffRectX + diffX + 'px'
        this.$refs.dropPaper.style.top = diffRectY + diffY < 0 ? 0 : diffRectY + diffY + 'px'
        this.$refs.dropPaper.style.right = 'auto'
        this.$refs.dropPaper.style.bottom = 'auto'
        this.$refs.dropPaper.style.margin = 0

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
    onScaleChange (scale) {
      let totalWidth = this.$refs.paperPanel.getBoundingClientRect().width
      this.$refs.dropPaper.style.width = totalWidth * 0.9 * scale + 'px'
    },
    async onRendered () {
      // 通知父组件渲染完毕
      this.$emit('rendered')
      // 初始化画布位置
      await this.$nextTick()
      let paperRect = this.$refs.dropPaper.getBoundingClientRect()
      let panelRect = this.$refs.paperPanel.getBoundingClientRect()
      let diffRectX = paperRect.left - panelRect.left
      let diffRectY = paperRect.top - panelRect.top

      this.$refs.dropPaper.style.left = diffRectX + 'px'
      this.$refs.dropPaper.style.top = diffRectY + 'px'
      this.$refs.dropPaper.style.right = 'auto'
      this.$refs.dropPaper.style.bottom = 'auto'
      this.$refs.dropPaper.style.margin = 0
    }
  }
}
</script>

<style lang="less" scoped>
  .paper-wrapper{
    position: relative;
    height: 100%;
    overflow: hidden;
    .paper-panel{
      position: absolute;
      top: 50px;
      left: 50px;
      height: calc(~"100% - 50px");
      width: calc(~"100% - 50px");
      z-index: 1;
      background: transparent;
      cursor: pointer;
      overflow: hidden;
      .drop-paper{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        background: var(--paper-color);
        width: 90%;
        box-shadow: 0 0 12px var(--shadow-color);
      }
      .drop-paper-16-9{
        aspect-ratio: 16 / 9;
      }
      .drop-paper-32-9{
        aspect-ratio: 32 / 9;
      }
    }
  }
</style>
