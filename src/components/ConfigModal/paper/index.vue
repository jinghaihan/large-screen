<template>
  <div class="paper-wrapper">
    <!-- 刻度尺 -->
    <TickMark></TickMark>
    <!-- 画布 -->
    <div class="paper-panel"
         ref="paperPanel">
      <div :class="`drop-paper-${ratio} drop-paper`"
            :style="getStyle()">
        <Layout :rowHeight="pixel" :layout="layout" ref="layout"></Layout>
      </div>
    </div>
  </div>
</template>

<script>
import TickMark from './tickMark/tickMark.vue'
import Layout from './layout/index.vue'

export default {
  name: 'paper',
  // eslint-disable-next-line vue/no-unused-components
  components: { TickMark, Layout },
  props: {
    layout: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      ratio: '16-9',
      style: {
        backgroundImage: 
          `linear-gradient(90deg, rgb(240, 240, 240) 5%,transparent 0),
          linear-gradient(rgb(240, 240, 240) 5%, transparent 0)`,
        backgroundRepeat: `repeat`
      },
      pixel: null
    }
  },
  mounted () {
    this.$forceUpdate()
    this.$emit('rendered')
  },
  methods: {
    getStyle () {
      if (this.$refs.paperPanel) {
        this.pixel = this.$refs.paperPanel.offsetWidth / 100
        this.style.backgroundSize = `${this.pixel}px ${this.pixel}px`
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
      top: 50px;
      left: 50px;
      height: calc(~"100% - 50px");
      width: calc(~"100% - 50px");
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
        width: 90%;
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
