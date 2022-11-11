<template>
  <div class="grid-layout-container">
    <div class="grid-layout-layer-container"
          v-for="(data, index) in layout"
          :key="data.key"
          :style="getContainerStyle(index)">
      <GridLayout ref="layer"
                  :layout="data.layout"
                  :rowHeight="rowHeight"
                  :ratio="ratio"
                  :resizable="index === layer"
                  :draggable="index === layer"
                  :component="component"
                  :root="root">
      </GridLayout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GridLayout from './layer.vue'

export default {
  props: {
    layout: {
      type: Array,
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
    component: {
      type: Object,
      required: true
    },
    root: null
  },
  components: { GridLayout },
  computed: {
    ...mapGetters('configurator', [ 'maxLayer' ])
  },
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
