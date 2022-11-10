<template>
  <a-row :gutter="[8, 8]">
    <a-col v-for="conf in config"
            :key="conf.name"
            :span="conf.col">
        <div class="droppable-element"
             @drag="drag($event, conf)"
             @dragend="dragend($event, conf)"
             draggable="true"
             unselectable="on">
          <a-card hoverable size="small" :title="conf.name">
            <img slot="cover" :src="conf.image" />
          </a-card>
        </div>
    </a-col>
  </a-row>
</template>

<script>
import config from './config'
import { getKey } from '../utils'

let mouseXY = { 'x': null, 'y': null }
let DragPos = { 'x': null, 'y': null, 'i': null }

export default {
  props: {
    layer: {
      type: Number,
      required: true
    },
    colNum: {
      type: Number,
      required: true
    },
    root: null
  },
  data () {
    return {
      ref: this.root.$refs.paper.$refs.layoutContainer.$refs.layer[this.layer],
      config
    }
  },
  watch: {
    layer: {
      immediate: true,
      handler: function () {
        // 清空上个图层的dragover事件
        this.ref.$refs.gridLayout.$el.removeEventListener('dragover', this.updateMouse)
        this.ref = this.root.$refs.paper.$refs.layoutContainer.$refs.layer[this.layer]
        // 新增当前图层的dragover事件
        this.ref.$refs.gridLayout.$el.addEventListener('dragover', this.updateMouse, false)
      }
    }
  },
  mounted () {
    this.ref.$refs.gridLayout.$el.addEventListener('dragover', this.updateMouse, false)
  },
  beforeDestroy () {
    this.ref.$refs.gridLayout.$el.removeEventListener('dragover', this.updateMouse)
  },
  methods: {
    drag: function (e, item) {
      let parentRect = this.ref.$refs.gridLayout.$el.getBoundingClientRect()
      let mouseInGrid = false
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true
      }
      if (mouseInGrid === true && (this.ref.layout.findIndex(item => item.i === 'drop')) === -1) {
        this.ref.layout.push({
          x: (this.ref.layout.length * 2) % this.colNum,
          y: this.ref.layout.length + this.colNum,
          w: item.w,
          h: item.h,
          i: 'drop'
        })
      }
      let index = this.ref.layout.findIndex(item => item.i === 'drop')
      if (index !== -1) {
        try {
          this.ref.$refs.gridLayout.$children[this.ref.layout.length].$refs.item.style.display = 'none'
        } catch (error) { }
        let el = this.ref.$refs.gridLayout.$children[index]
        el.dragging = { 'top': mouseXY.y - parentRect.top, 'left': mouseXY.x - parentRect.left }
        let newPos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left)
        if (mouseInGrid === true) {
          this.ref.$refs.gridLayout.dragEvent('dragstart', 'drop', newPos.x, newPos.y, item.h, item.w)
          DragPos.x = this.ref.layout[index].x
          DragPos.y = this.ref.layout[index].y
        }
        if (mouseInGrid === false) {
          this.ref.$refs.gridLayout.dragEvent('dragend', 'drop', newPos.x, newPos.y, item.h, item.w)
          this.ref.layout = this.ref.layout.filter(obj => obj.i !== 'drop')
        }
      }
    },
    dragend: function (e, item) {
      let parentRect = this.ref.$refs.gridLayout.$el.getBoundingClientRect()
      let mouseInGrid = false
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true
      }
      if (mouseInGrid === true) {
        this.ref.$refs.gridLayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, item.h, item.w)
        this.ref.layout = this.ref.layout.filter(obj => obj.i !== 'drop')

        this.ref.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: item.w,
          h: item.h,
          i: getKey(),
          props: {
            name: item.name,
            type: item.type
          }
        })
        this.$emit('drop')
        this.root.updateSelectedComponent(this.ref.layout[this.ref.layout.length - 1])
        try {
          this.ref.$refs.gridLayout.$children[this.ref.layout.length].$refs.item.style.display = 'block'
        } catch (error) { }
      }
    },
    updateMouse (e) {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    }
  }
}
</script>

<style lang="less" scoped>

</style>
