<template>
  <div class="tickMark" ref="tickMark">
    <div class="tickMarkTop" v-if="visible">
      <Calibration direction="up" :scale="scale"></Calibration>
    </div>
    <div class="tickMarkLeft" v-if="visible">
      <Calibration direction="left" :scale="scale"></Calibration>
    </div>
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
  
</style>
