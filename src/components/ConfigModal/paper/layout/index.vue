<template>
  <grid-layout ref="gridLayout"
              :layout.sync="layout"
              :col-num="100"
              :row-height="rowHeight"
              :is-draggable="true"
              :is-resizable="true"
              :responsive="false"
              :vertical-compact="false"
              :prevent-collision="true">
      <grid-item v-for="item in layout"
                :key="item.i"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i">
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
    rowHeight: null
  }
}
</script>

<style lang="less" scoped>
  .vue-grid-layout{
    height: 100% !important;
  }
</style>
