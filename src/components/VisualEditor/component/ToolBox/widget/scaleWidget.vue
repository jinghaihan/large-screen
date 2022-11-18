<template>
  <div class="scale-widget-container">
    <TooltipIcon class="icon" title="放大" icon="plus" placement="bottom" @click="onScale('up')"></TooltipIcon>
    <span class="scale">{{(scale * 100).toFixed(0)}}%</span>
    <TooltipIcon class="icon" title="缩小" icon="minus" placement="bottom" @click="onScale('down')"></TooltipIcon>
  </div>
</template>

<script>
import TooltipIcon from '../../TooltipIcon'

export default {
  props: {
    editor: null,
    scale: {
      type: Number,
      required: true
    }
  },
  components: { TooltipIcon },
  methods: {
    onScale (direction) {
      this.editor.changeScale(direction)
    }
  }
}
</script>

<style lang="less" scoped>
  .scale-widget-container{
    display: flex;
    align-items: center;
    .scale{
      font-weight: bold;
      font-size: 15px;
    }
    .icon{
      margin: 0 8px;
      font-size: 12px;
    }
  }
</style>
