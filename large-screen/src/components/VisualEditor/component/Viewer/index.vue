<template>
  <div class="viewer-container" ref="container">
    <div class="scale-container"
        ref="scale"
        :style="{
            width: width + 'px',
            height: height + 'px',
          }">
      <GridLayout ref="gridLayout"
                  :layout.sync="layout"
                  :col-num="grid.count"
                  :row-height="rowHeight"
                  :is-draggable="false"
                  :is-resizable="false"
                  :vertical-compact="false"
                  :prevent-collision="true"
                  :margin="[0, 0]"
                  :transformScale="scale"
                  :allowOverlap="true"
                  @layout-updated="layoutUpdatedEvent">
        <GridItem v-for="item in layout"
                  :key="item.i"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  :i="item.i"
                  :static="true">
          <Renderer type="view" :entity="viewer" :data="item" :component="{}" :transformScale="scale"></Renderer>
        </GridItem>
      </GridLayout>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { GridLayout, GridItem } from '../../component/lib/vue-grid-layout/components/index'
import Renderer from '../Renderer'
import Viewer from '../../entity/Viewer'

export default {
  props: {
    container: null,
    config: {
      type: Object,
      required: true
    },
    grid: {
      type: Object,
      required: true
    }
  },
  components: { GridLayout, GridItem, Renderer },
  data () {
    return {
      viewer: new Viewer(this),
      layout: [],
      basicPixel: 120,
      width: 0,
      height: 0,
      scale: 1,
      rowHeight: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.viewer.setInstance({ layout: this })

      let { paper, search } = this.config

      let rect = this.$refs.container.getBoundingClientRect()
      this.width = paper.global.style.ratioWidth * this.basicPixel
      this.height = paper.global.style.ratioHeight * this.basicPixel
      // ?????????????????????
      this.scale = rect.width / this.width * (rect.width - 8) / rect.width
      this.$refs.scale.style.setProperty('--scale', this.scale)
      this.rowHeight = (this.container.getBoundingClientRect().width / this.grid.count) / this.scale

      await this.viewer.setConfig(paper)
      this.viewer.setSearch(search)
      this.$emit('inited')
      
      this.viewer.handleSearch()
    },
    // ??????
    onUpdate (layout) {
      this.updatePromise = {}
      return new Promise((resolve, reject) => {
        this.updatePromise.resolve = resolve
        this.updatePromise.reject = reject
        this.layout = layout
      })
    },
    layoutUpdatedEvent () {
      if (this.updatePromise) {
        this.updatePromise.resolve()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #scale-container {
    --scale: 1;
    flex-shrink: 0;
  }
  .viewer-container{
    height: 100%;
    width: 100%;
    .scale-container {
      transform: scale(var(--scale));
      transform-origin: 0 0;
      .vue-grid-layout{
        height: 100% !important;
      }
    }
  }
</style>
