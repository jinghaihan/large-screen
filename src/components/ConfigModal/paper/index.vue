<template>
  <div class="paper-wrapper">
    <!-- 刻度尺 -->
    <TickMark></TickMark>
    <!-- 画布 -->
    <div class="paper-panel"
         ref="paperPanel">
      <div :class="`drop-paper-${ratio} drop-paper`"
           :data-ratio="ratio"
           :style="getStyle()">
      </div>
    </div>
  </div>
</template>

<script>
import TickMark from './tickMark/tickMark.vue'

export default {
  name: 'paper',
  components: { TickMark },
  data () {
    return {
      ratio: '16-9',
      style: {
        backgroundImage: 
          `linear-gradient(90deg, rgb(240, 240, 240) 5%,transparent 0),
          linear-gradient(rgb(240, 240, 240) 5%, transparent 0)`,
        backgroundRepeat: `repeat`
      }
    }
  },
  mounted () {
    this.$forceUpdate()
  },
  methods: {
    getStyle () {
      if (this.$refs.paperPanel) {
        let pixel = this.$refs.paperPanel.offsetWidth / 100
        this.style.backgroundSize = `${pixel}px ${pixel}px`
        return this.style
      } else {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .paper-wrapper{
    position: relative;
    height: 100%;
    .paper-panel{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 1;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      .drop-paper{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: var(--paper-color);
        width: 80%;
        box-shadow: 0 0 12px var(--shadow-color);
        cursor: pointer;
      }
      .drop-paper-16-9{
        aspect-ratio: 16 / 9;
      }
      .drop-paper-32-9{
        aspect-ratio: 32 / 9;
      }
    }
  }
</style>
