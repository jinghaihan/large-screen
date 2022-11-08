<template>
  <div>
    <div @drag="drag($event, conf)"
          @dragend="dragend($event, conf)"
          class="droppable-element"
          draggable="true"
          unselectable="on"
          v-for="conf in config"
          :key="conf.name">
      <a-card hoverable size="small" :title="conf.name">
        <img slot="cover" :src="conf.image" />
      </a-card>
    </div>
  </div>
  
</template>

<script>
import config from './config'

let mouseXY = { 'x': null, 'y': null }
let DragPos = { 'x': null, 'y': null, 'i': null }

export default {
  props: {
    layout: {
      type: Array,
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
      ref: this.root.$refs.paper.$refs.layout.$refs,
      config
    }
  },
  mounted () {
    document.addEventListener('dragover', this.updateMouse, false)
  },
  beforeDestroy () {
    document.removeEventListener('dragover', this.updateMouse)
  },
  methods: {
    drag: function (e, item) {
      let parentRect = this.ref.gridLayout.$el.getBoundingClientRect()
      let mouseInGrid = false
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true
      }
      if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.colNum || 100),
          y: this.layout.length + (this.colNum || 100),
          w: item.w,
          h: item.h,
          i: 'drop'
        })
      }
      let index = this.layout.findIndex(item => item.i === 'drop')
      if (index !== -1) {
        try {
          this.ref.gridLayout.$children[this.layout.length].$refs.item.style.display = 'none'
        } catch (error) { }
        let el = this.ref.gridLayout.$children[index]
        el.dragging = { 'top': mouseXY.y - parentRect.top, 'left': mouseXY.x - parentRect.left }
        let newPos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left)
        if (mouseInGrid === true) {
          this.ref.gridLayout.dragEvent('dragstart', 'drop', newPos.x, newPos.y, item.h, item.w)
          DragPos.x = this.layout[index].x
          DragPos.y = this.layout[index].y
        }
        if (mouseInGrid === false) {
          this.ref.gridLayout.dragEvent('dragend', 'drop', newPos.x, newPos.y, item.h, item.w)
          this.layout = this.layout.filter(obj => obj.i !== 'drop')
        }
      }
    },
    dragend: function (e, item) {
      let parentRect = this.ref.gridLayout.$el.getBoundingClientRect()
      let mouseInGrid = false
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true
      }
      if (mouseInGrid === true) {
        this.ref.gridLayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, item.h, item.w)
        this.layout = this.layout.filter(obj => obj.i !== 'drop')

        alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`)

        let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        let maxPos = $chars.length
        let key = ''
        for (let i = 0; i < 32; i++) {
          key += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        this.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: item.w,
          h: item.h,
          i: item.i + '-' + key
        })
        this.$emit('drop', this.layout)
        try {
          this.ref.gridLayout.$children[this.layout.length].$refs.item.style.display = 'block'
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
