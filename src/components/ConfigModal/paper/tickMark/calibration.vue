<template>
  <div :class="'calibration-' + direction" ref="calibration"></div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      required: true
    },
    scale: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data () {
    return {
      calibration: null,
      observer: null
    }
  },
  mounted () {
    let _this = this
    _this.init()
    _this.observer = new ResizeObserver(function () {
      _this.onResize()
    })
    _this.observer.observe(_this.$refs.calibration)
  },
  beforeDestroy () {
    this.observer.disconnect(this.$refs.calibration)
  },
  methods: {
    init () {
      this.calibration = this.$refs.calibration
      let length = this.direction === 'up' ? this.calibration.offsetWidth : this.calibration.offsetHeight
      for (let i = 0; i < length / 5; i++) {
        if (i % 10 === 0) {
          this.generateElement(true, i)
        } else {
          this.generateElement()
        }
      }
      this.onResize()
    },
    generateElement (item, num) {
      let createSpan = document.createElement('div')
      createSpan.className = 'calibrationLine'
      createSpan.style.backgroundColor = '#ccc'
      this.calibration.style.display = 'flex'
      this.calibration.style.justifyContent = 'space-between'
      if (this.direction === 'up') {
        this.calibration.style.marginLeft = '50px'
        createSpan.style.width = '1px'
        createSpan.style.height = '12px'
        createSpan.style.display = 'inline-block'
      } else {
        this.calibration.style.flexDirection = 'column'
        createSpan.style.height = '1px'
        createSpan.style.width = '12px'
      }
      if (item) {
        let createSpanContent = document.createElement('span')
        if (this.direction === 'up') {
          createSpan.style.height = '24px'
          createSpanContent.style.transform = 'translate3d(-4px, 24px, 0px)'
          createSpan.style.transform = 'translateY(0px)'
        } else {
          createSpan.style.width = '24px'
          createSpanContent.style.paddingLeft = '24px'
        }
        createSpanContent.style.display = 'block'
        createSpanContent.className = 'calibrationNumber'
        createSpanContent.innerHTML = num * 5 + ''
        createSpan.appendChild(createSpanContent)
      }
      this.calibration.appendChild(createSpan)
    },
    onResize () {
      let arr = [...Array.from(this.calibration.querySelectorAll('.calibrationLine'))]
      if (arr.length) {
        if (this.direction === 'up') {
          this.calibration.style.width = parseFloat(this.scale.toFixed(1)) * this.calibration.offsetWidth + 'px'
          arr.forEach(el => {
            let dom = [...Array.from(el.querySelectorAll('.calibrationNumber'))][0]
            if (dom) {
              dom.style.transform = `translate3d(-4px, 24px, 0px) scale(${(this.scale + 0.1).toFixed(
                1
              )})`
            }
          })
        } else {
          this.calibration.style.height = parseFloat(this.scale.toFixed(1)) * this.calibration.offsetHeight + 'px'
          arr.forEach(el => {
            let dom = [...Array.from(el.querySelectorAll('.calibrationNumber'))][0]
            if (dom) {
              dom.style.transform = `translate3d(2px, -8px, 0px) scale(${(this.scale + 0.1).toFixed(
                1
              )})`
            }
          })
        }
      }
    }
  }
  
}
</script>

<style lang="less" scoped>
  .calibration-up{
    height: 100%;
  }
  .calibration-left{
    height: 100%;
  }
</style>

<style>
  .calibrationNumber{
    font-size: 12px;
    color: var(--icon-color);
    opacity: .6;
    white-space: nowrap;
  }
</style>
