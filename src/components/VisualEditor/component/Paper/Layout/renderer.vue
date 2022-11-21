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
        <a-menu-item v-for="item in editor.operation.renderer"
                     :key="item.key"
                     @click="onOperation(item)">
          <div class="menu-item-container">
            <a-icon class="icon" :type="item.icon"></a-icon>{{item.name}}
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import Chart from '../../../entity/Chart'

export default {
  props: {
    editor: null,
    data: {
      type: Object,
      required: true
    },
    component: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cell: null,
      observer: null
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    try {
      this.observer.disconnect(this.$refs.render)
    } catch (error) { }
  },
  methods: {
    init () {
      if (this.data.props) {
        switch (this.data.props.componentType) {
          case 'chart':
            let cell = this.editor.cell[this.data.props.key]
            if (cell) {
              this.cell = cell
              this.cell.changeAttr({
                vm: this,
                el: this.$refs.render
              })
              this.cell.init()
            } else {
              this.cell = new Chart({
                vm: this,
                key: this.data.props.key,
                el: this.$refs.render,
                type: this.data.props.type
              })
            }
            break
          default:
            break
        }
        this.editor.setCell(this.data.props, this.cell)
        this.observe()
      }
    },
    observe () {
      let _this = this
      _this.observer = new ResizeObserver(function () {
        switch (_this.data.props.componentType) {
          case 'chart':
            _this.cell.resize()
            break
          default:
            break
        }
      })
      _this.observer.observe(_this.$refs.render)
    },
    onClick () {
      this.editor.changeComponent(this.data)
    },
    onOperation (operation) {
      switch (operation.key) {
        case 'delete':
          this.$emit('delete', this.data.props)
          break
        case 'copy':
          break
        default:
          break
      }
    },
    getStyle () {
      return this.component.key === this.data.i ? 'draggable-element draggable-element-selected' : 'draggable-element'
    }
  }
}
</script>

<style lang="less" scoped>
  .draggable-element{
    position: relative;
    height: 100%;
    .render-container{
      height: 100%;
      width: 100%;
    }
  }
  .draggable-element-selected{
    border: 1px solid var(--highlight-color);
    box-shadow: 0 0 6px var(--highlight-color);
    border-radius: 4px;
  }
</style>

<style lang="less">
  .menu-item-container{
    display: flex;
    align-items: center;
    .icon{
      margin-right: 8px;
    }
  }
</style>
