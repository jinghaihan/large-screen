<template>
  <div class="grid-layout-container">
    <div class="grid-layout-inner-container"
          v-for="(data, index) in layout"
          :key="data.key"
          :style="getStyle(index)">
      <GridLayout ref="layout"
                  :layout="data.layout"
                  :colNum="colNum"
                  :rowHeight="rowHeight"
                  :ratio="ratio"
                  :resizable="index === layer"
                  :draggable="index === layer"
                  :el="el"
                  :root="root">
      </GridLayout>
    </div>
  </div>
</template>

<script>
import GridLayout from './gridLayout.vue'

export default {
  props: {
    layout: {
      type: Array,
      required: true
    },
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
    layer: {
      type: Number,
      required: true
    },
    maxLayer: {
      type: Number,
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
  components: { GridLayout },
  methods: {
    getStyle (layer) {
      return {
        'z-index': this.layer === layer ? layer + this.maxLayer : layer
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .grid-layout-container{
    position: relative;
    height: 100%;
    width: 100%;
  }
  .grid-layout-inner-container{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
</style>
