<template>
  <div class="tickMark" ref="tickMark">
    <div class="tickMarkTop" v-if="visible">
      <Calibration direction="up"></Calibration>
    </div>
    <div class="tickMarkLeft" v-if="visible">
      <Calibration direction="left"></Calibration>
    </div>
  </div>
</template>

<script>
import Calibration from './calibration.vue'

export default {
  components: { Calibration },
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
  
</style>
