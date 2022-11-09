<template>
  <a-row :gutter="[8, 8]">
    <a-col v-for="conf in config"
            :key="conf.name"
            :span="conf.col">
        <div @drag="drag($event, conf)"
              @dragend="dragend($event, conf)"
              class="droppable-element"
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

let mouseXY = { 'x': null, 'y': null }
let DragPos = { 'x': null, 'y': null, 'i': null }

export default {
  props: {
    colNum: {
      type: Number,
      required: true
    },
    root: null
  },
  data () {
    return {
      ref: this.root.$refs.paper.$refs.gridLayoutContainer.$refs.layout[this.root.$refs.paper.layer],
      config
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
        // alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`)
        this.ref.$refs.gridLayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, item.h, item.w)
        this.ref.layout = this.ref.layout.filter(obj => obj.i !== 'drop')

        this.ref.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: item.w,
          h: item.h,
          i: item.type + '-' + this.getKey()
        })
        try {
          this.ref.$refs.gridLayout.$children[this.ref.layout.length].$refs.item.style.display = 'block'
        } catch (error) { }
      }
    },
    updateMouse (e) {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    },
    getKey () {
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      let maxPos = $chars.length
      let key = ''
      for (let i = 0; i < 32; i++) {
        key += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return key
    }
  }
}
</script>

<style lang="less" scoped>

</style>
