<template>
  <grid-layout ref="gridLayout"
              :layout.sync="layout"
              :col-num="colNum"
              :max-rows="maxH"
              :row-height="rowHeight"
              :is-draggable="true"
              :is-resizable="true"
              :vertical-compact="false"
              :prevent-collision="true"
              :margin="[0, 0]"
              @layout-updated="layoutUpdate">
      <grid-item v-for="item in layout"
                :key="item.i"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                :maxW="maxW"
                :maxH="maxH">
          <span class="text">{{ item.i }}</span>
      </grid-item>
  </grid-layout>
</template>

<script>
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
    }
  },
  data () {
    return {
      maxW: this.colNum,
      maxH: (this.colNum / this.ratio.width * this.ratio.height).toFixed(0)
    }
  },
  methods: {
    layoutUpdate (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .vue-grid-layout{
    height: 100% !important;
  }
</style>
