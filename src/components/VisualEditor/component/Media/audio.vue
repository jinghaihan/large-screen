<template>
  <div class="audio-container">
    <audio class="audio" :src="src"></audio>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .audio-container,
  .audio{
    height: 100%;
    width: 100%;
  }
</style>
