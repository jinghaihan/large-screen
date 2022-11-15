<template>
  <div :class="getStyle()"
       @click="onClick">
    <a-dropdown :trigger="['contextmenu']">
      <div ref="render"
           class="render-container"
           @click="e => e.preventDefault()">
        {{data.i}}
      </div>
      <a-menu slot="overlay">
        <a-menu-item v-for="item in config.operation['renderer']" :key="item.key" @click="onOperation(item)">
          <div class="configurator-menu-item-container">
            <a-icon class="icon" :type="item.icon"></a-icon>{{item.name}}
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>

export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    component: {
      type: Object,
      required: true
    },
    root: null
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.observer.disconnect(this.$refs.render)
  },
  methods: {
    async init () {
      let _this = this
      if (!_this.data.props) return

      _this.data.props.init(_this, _this.$refs.render, _this.data.props.option)
      _this.observer = new ResizeObserver(function () {
        _this.onResize()
      })
      _this.observer.observe(_this.$refs.render)
    },
    onResize () {
      if (this.chart) {
        this.chart.resize()
      }
    },
    getStyle () {
      return this.component.i === this.data.i ? 'draggable-element draggable-element-selected' : 'draggable-element'
    },
    onClick () {
      this.root.updateSelectedComponent(this.data)
    },
    onDelete () {
      this.$emit('delete', this.data)
    },
    onOperation (data) {
      switch (data.key) {
        case 'delete':
          this.onDelete()
          break
        case 'copy':
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
