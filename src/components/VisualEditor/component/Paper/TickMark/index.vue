<template>
  <div class="tickMark">
    <div class="tickMarkTop" v-if="visible">
      <Calibration :scale="scale" direction="up"></Calibration>
    </div>
    <div class="tickMarkLeft" v-if="visible">
      <Calibration :scale="scale" direction="left"></Calibration>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Calibration from './calibration.vue'

export default {
  components: { Calibration },
  props: {
    scale: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    this.visible = true
  }
}
</script>

<style lang="less" scoped>
  .tickMark {
    position: relative;
    height: 100%;
    overflow: hidden;
    flex: 1;
    .tickMarkTop {
      height: 50px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .tickMarkLeft {
      height: calc(~"100% - 50px");
      width: 50px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    
  }
</style>
