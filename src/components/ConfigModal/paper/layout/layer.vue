<template>
  <div class="layer-container" @click="onClick">
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
                  @resize="onResize(item)">
          <Renderer :data="item" :component="component" :root="root" @delete="onDelete"></Renderer>
        </grid-item>
    </grid-layout>
  </div>
  
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
    root: null
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
    onResize (data) {
      this.root.updateSelectedComponent(data)
    },
    onClick (e) {
      let srcElement = e.srcElement
      if (srcElement.getAttribute('class') === 'vue-grid-layout') {
        this.root.updateSelectedComponent({})
      }
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
