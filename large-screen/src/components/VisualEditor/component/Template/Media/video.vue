<template>
  <div class="video-container">
    <video class="video"
           ref="player"
           v-bind="option">
      <source :src="src" type="video/mp4" />
    </video>
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
        muted: false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .video-container,
  .video{
    height: 100%;
    width: 100%;
  }
</style>
