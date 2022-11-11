<template>
  <div class="paper-content-container">
    <!-- 刻度尺 -->
    <TickMark :scale="scale"></TickMark>
    <!-- 画布 -->
    <div ref="paperPanel"
        class="paper-panel"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp">
      <div ref="dropPaper"
          :class="`drop-paper drop-paper-${ratio.width}-${ratio.height}`"
          :style="getDropPaperStyle()">
        <LayoutContainer ref="layoutContainer"
                        :layout="layout"
                        :rowHeight="rowHeight"
                        :ratio="ratio"
                        :layer="layer"
                        :component="component"
                        :root="root" >
        </LayoutContainer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TickMark from './tickMark/tickMark.vue'
import LayoutContainer from './layout/container.vue'

export default {
  name: 'paper',
  components: { TickMark, LayoutContainer },
  props: {
    layout: {
      type: Array,
      required: true
    },
    layer: {
      type: Number,
      required: true
    },
    ratio: {
      type: Object,
      required: true
    },
    component: {
      type: Object,
      required: true
    },
    theme: {
      type: String,
      required: true
    },
    root: null
  },
  data () {
    return {
      style: {
        light: {
          backgroundImage: 
          `linear-gradient(90deg, rgb(240, 240, 240) 5%,transparent 0),
          linear-gradient(rgb(240, 240, 240) 5%, transparent 0)`,
          backgroundRepeat: `repeat`
        },
        dark: {
          backgroundImage: 
          `linear-gradient(90deg, rgb(36, 40, 46) 5%,transparent 0),
          linear-gradient(rgb(36, 40, 46) 5%, transparent 0)`,
          backgroundRepeat: `repeat`
        }
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
        this.onScale(scale)
      }
    }
  },
  computed: {
    ...mapGetters('configurator', [ 'colNum', 'grid', 'scale' ])
  },
  mounted () {
    this.onRendered()
  },
  methods: {
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
    },
    getDropPaperStyle () {
      if (this.grid) {
        this.rowHeight = this.$refs.dropPaper.offsetWidth / this.colNum
        this.style[this.theme].backgroundSize = `${this.rowHeight}px ${this.rowHeight}px`
        return this.style[this.theme]
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
    onScale (scale) {
      let totalWidth = this.$refs.paperPanel.getBoundingClientRect().width
      this.$refs.dropPaper.style.width = totalWidth * 0.9 * scale + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
