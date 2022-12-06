<template>
  <div class="audio-container">
    <audio class="audio"
           ref="player"
           v-bind="option">
      <source :src="src" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      option: {
        controls: true,
        autoplay: false,
        loop: false
      }
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
