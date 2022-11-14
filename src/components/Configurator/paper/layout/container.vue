<template>
  <div class="grid-layout-container">
    <div class="grid-layout-layer-container"
          v-for="(data, index) in layout"
          :key="data.key + '-' + index"
          :style="getContainerStyle(index)">
      <GridLayout ref="layer"
                  :config="config"
                  :layoutData="data.layout"
                  :colNum="colNum"
                  :rowHeight="rowHeight"
                  :ratio="ratio"
                  :resizable="index === layer"
                  :draggable="index === layer"
                  :component="component"
                  :root="root"
                  v-show="data.visible">
      </GridLayout>
    </div>
  </div>
</template>

<script>
import GridLayout from './layer.vue'

export default {
  props: {
    config: {
      type: Object,
      required: true
    },
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
    component: {
      type: Object,
      required: true
    },
    root: null
  },
  components: { GridLayout },
  methods: {
    getContainerStyle (layer) {
      return {
        'z-index': this.layer === layer ? layer + this.maxLayer : layer
      }
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
