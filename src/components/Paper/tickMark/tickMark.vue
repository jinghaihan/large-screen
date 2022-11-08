<template>
  <div class="tickMark" ref="tickMark">
    <div class="tickMarkTop">
      <Calibration direction="up"></Calibration>
    </div>
    <div class="tickMarkLeft">
      <Calibration direction="left"></Calibration>
    </div>
  </div>
</template>

<script>
import Calibration from './calibration.vue'

export default {
  components: { Calibration }
}
</script>

<style lang="less" scoped>
  .tickMark {
    overflow: hidden;
    height: 100%;
    position: relative;
    flex: 1;
    .tickMarkTop {
      width: 100%;
      height: 50px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .tickMarkLeft {
      width: 50px;
      height: calc(~"100% - 50px");
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
</style>
