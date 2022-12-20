<template>
  <div ref="container"
       class="paper-drag-container">
    <ScaleBox ref="scale"
              :container="$refs.container"
              :ratio="ratio"
              :scale="scale"
              @scale="onTransformScaleChange">
      <div ref="paper"
          class="paper-content-container"
          :style="backgroundStyle">
        <div ref="grid"
            class="paper-grid-container"
            :style="gridStyle">
          <div class="layout-content-container">
            <Layout ref="layout"
                    :editor="editor"
                    :layoutData="layout"
                    :ratio="ratio"
                    :grid="grid"
                    :resizable="true"
                    :draggable="true"
                    :rowHeight="rowHeight"
                    :component="component"
                    :transformScale="transformScale"
            >
            </Layout>
          </div>
        </div>
      </div>
    </ScaleBox>
  </div>
</template>

<script>
import _ from 'lodash'
import Layout from './layout.vue'
import ScaleBox from '../../Widget/ScaleBox'

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
  components: { Layout, ScaleBox },
  data () {
    return {
      rowHeight: 0,
      gridStyle: {},
      backgroundStyle: {
        backgroundImage: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      transformScale: 1
    }
  },
  watch: {
    ratio: {
      deep: true,
      handler: function (ratio) {
        this.onRatioChange()
      }
    },
    scale: {
      handler: function (scale) {
        this.onGridChange()
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
    },
    onScaleChange (scale) {
      this.onGridChange()
    },
    onRatioChange () {
      this.$refs.paper.style['aspect-ratio'] = `${this.ratio.width} / ${this.ratio.height}`
    },
    async onGridChange () {
      if (this.grid.show) {
        await this.$nextTick()
        let gridStyle = { backgroundRepeat: `repeat` }
        this.rowHeight = (this.$refs.paper.getBoundingClientRect().width / this.grid.count) / this.transformScale
        gridStyle.backgroundSize = `${this.rowHeight}px ${this.rowHeight}px`
        let rgb = `rgb(${this.grid.color.r}, ${this.grid.color.g}, ${this.grid.color.b})`
        gridStyle.backgroundImage = `linear-gradient(90deg, ${rgb} 5%,transparent 0), linear-gradient(${rgb} 5%, transparent 0)`
        this.gridStyle = _.cloneDeep(gridStyle)
      } else {
        this.gridStyle = {}
      }
    },
    onTransformScaleChange (scale) {
      this.transformScale = scale
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
    .paper-content-container{
      width: 100%;
      background: var(--primary-color);
      box-shadow: 0 0 12px var(--shadow-color);
      .paper-grid-container,
      .layout-content-container{
        height: 100%;
        width: 100%;
      }
      .paper-grid-container{
        position: relative;
      }
      .layout-content-container{
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
