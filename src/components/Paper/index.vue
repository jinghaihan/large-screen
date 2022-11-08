<template>
  <div class="paper-wrapper">
    <!-- 刻度尺 -->
    <TickMark></TickMark>
    <!-- 画布 -->
  </div>
</template>

<script>
import TickMark from './tickMark/tickMark.vue'

export default {
  name: 'paper',
  components: { TickMark }
}
</script>

<style lang="less" scoped>
  .paper-wrapper{
    height: 100%;
  }
</style>
