<template>
  <div class="search-panel-container">
    <div v-if="!data.enable" class="holder"> 查询面板 </div>
    <GridLayout v-else
                ref="gridLayout"
                :layout.sync="layout"
                :col-num="grid"
                :max-rows="maxH"
                :row-height="rowH"
                :is-draggable="data.enable"
                :is-resizable="data.enable"
                :vertical-compact="false"
                :prevent-collision="true"
                :margin="[0, 0]">
      <GridItem v-for="item in layout"
                :key="item.i"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                :maxW="grid"
                :maxH="maxH">
      </GridItem>
    </GridLayout>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  components: { GridLayout, GridItem },
  data () {
    return {
      layout: [],
      grid: 10,
      maxH: 10,
      rowH: 10
    }
  }
}
</script>

<style lang="less" scoped>
  .search-panel-container{
    height: 100%;
    width: 100%;
    .holder{
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
