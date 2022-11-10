<template>
  <grid-layout ref="gridLayout"
              :layout.sync="layout"
              :col-num="colNum"
              :max-rows="maxH"
              :row-height="rowHeight"
              :is-draggable="draggable"
              :is-resizable="resizable"
              :vertical-compact="false"
              :prevent-collision="true"
              :margin="[0, 0]">
      <grid-item v-for="item in layout"
                :key="item.i"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                :maxW="maxW"
                :maxH="maxH"
                @move="onMove(item)"
                @reisize="onResize(item)">
          <Renderer :data="item" :component="component" :root="root" @delete="onDelete"></Renderer>
      </grid-item>
  </grid-layout>
</template>

<script>
import Renderer from '../renderer/renderer.vue'

export default {
  props: {
    colNum: {
      type: Number,
      required: true
    },
    rowHeight: {
      type: Number,
      required: true
    },
    ratio: {
      type: Object,
      required: true
    },
    resizable: {
      type: Boolean,
      required: true
    },
    draggable: {
      type: Boolean,
      required: true
    },
    component: {
      type: Object,
      required: true
    },
    root: {
      required: true
    }
  },
  components: { Renderer },
  data () {
    return {
      layout: [],
      maxW: this.colNum,
      maxH: (this.colNum / this.ratio.width * this.ratio.height).toFixed(0)
    }
  },
  methods: {
    onDelete (data) {
      this.layout = this.layout.filter(item => item.i !== data.i)
    },
    onMove (data) {
      this.root.updateSelectedComponent(data)
    },
    onReisze (data) {
      this.root.updateSelectedComponent(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .vue-grid-layout{
    height: 100% !important;
  }
</style>
