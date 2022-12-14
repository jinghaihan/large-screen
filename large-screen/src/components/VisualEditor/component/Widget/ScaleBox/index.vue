<template>
  <div class="paper-zoom-container"
       ref="zoom"
       :style="{
          width: width * scale + 'px',
          height: height * scale + 'px',
        }">
    <div id="paper-scale-container"
        class="paper-scale-container"
        ref="scale"
        :style="{
          width: width + 'px',
          height: height + 'px',
        }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'

export default {
  props: {
    container: null,
    ratio: {
      type: Object,
      required: true
    },
    scale: {
      type: Number,
      required: true
    },
    proportion: {
      type: Number,
      required: false,
      default: 0.9
    }
  },
  data () {
    return {
      transformScale: 1,
      basicPixel: 120,
      width: 0,
      height: 0
    }
  },
  watch: {
    scale: {
      deep: true,
      handler: function (scale) {
        this.handleChange()
      }
    },
    ratio: {
      deep: true,
      handler: function (ratio) {
        this.handleChange()
      }
    },
    container: {
      immediate: true,
      handler: function (value, prevValue) {
        if (!prevValue && value) {
          this.setScale()
        }
      }
    }
  },
  created () {
    this.width = this.ratio.width * this.basicPixel
    this.height = this.ratio.height * this.basicPixel
    this.setScale = _.debounce(this.setScale, 50)
  },
  mounted () {
    this.setScale()
    window.addEventListener('resize', this.setScale)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setScale)
  },
  methods: {
    handleChange () {
      this.width = this.ratio.width * this.basicPixel
      this.height = this.ratio.height * this.basicPixel
      this.setScale()
    },
    getScale () {
      if (this.container) {
        const { width, height } = this
        const wh = (window.innerHeight - 95) * this.proportion / height
        const ww = (window.innerWidth - 335) * this.proportion / width
        return ww < wh ? ww : wh
      }
    },
    setScale () {
      try {
        this.transformScale = this.getScale() * this.scale
        this.$emit('scale', this.transformScale)

        if (this.$refs.scale) {
          this.$refs.scale.style.setProperty('--scale', this.transformScale)
          if (this.scale > 1) {
            $(this.$refs.zoom).css({ position: 'relative' })
            $(this.container).css({ overflow: 'auto' })
          } else {
            this.container.scrollTo(0, 0)
            $(this.$refs.zoom).css({ position: 'static' })
            $(this.container).css({ overflow: 'hidden' })
          }
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="less" scoped>
  #paper-scale-container {
    --scale: 1;
    flex-shrink: 0;
  }
  .paper-scale-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: scale(var(--scale)) translate(-50%, -50%);
    transform-origin: 0 0;
  }
</style>
