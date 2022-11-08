<template>
  <div @drag="drag"
       @dragend="dragend"
       class="droppable-element"
       draggable="true"
       unselectable="on">
    Droppable Element (Drag me!)
  </div>
</template>

<script>

let mouseXY = { 'x': null, 'y': null }
let DragPos = { 'x': null, 'y': null, 'w': 1, 'h': 1, 'i': null }

export default {
  props: {
    layout: {
      type: Array,
      required: true
    },
    root: null
  },
  data () {
    return {
      ref: this.root.$refs.paper.$refs.layout.$refs
    }
  },
  mounted () {
    document.addEventListener('dragover', this.updateMouse, false)
  },
  beforeDestroy () {
    document.removeEventListener('dragover', this.updateMouse)
  },
  methods: {
    drag: function (e) {
      let parentRect = this.ref.gridLayout.$el.getBoundingClientRect()
      let mouseInGrid = false
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true
      }
      
      if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.colNum || 12),
          y: this.layout.length + (this.colNum || 12), // puts it at the bottom
          w: 1,
          h: 1,
          i: 'drop'
        })
      }
      let index = this.layout.findIndex(item => item.i === 'drop')
      if (index !== -1) {
        try {
          this.ref.gridLayout.$children[this.layout.length].$refs.item.style.display = 'none'
        } catch (error) {
          console.log(error)
        }
        let el = this.ref.gridLayout.$children[index]
        el.dragging = { 'top': mouseXY.y - parentRect.top, 'left': mouseXY.x - parentRect.left }
        let newPos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left)
        if (mouseInGrid === true) {
          this.ref.gridLayout.dragEvent('dragstart', 'drop', newPos.x, newPos.y, 1, 1)
          DragPos.i = String(index)
          DragPos.x = this.layout[index].x
          DragPos.y = this.layout[index].y
        }
        if (mouseInGrid === false) {
          this.ref.gridLayout.dragEvent('dragend', 'drop', newPos.x, newPos.y, 1, 1)
          this.layout = this.layout.filter(obj => obj.i !== 'drop')
        }
      }
    },
    dragend: function (e) {
      let parentRect = this.ref.gridLayout.$el.getBoundingClientRect()
      let mouseInGrid = false
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true
      }
      if (mouseInGrid === true) {
        alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`)
        this.ref.gridLayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1)
        this.layout = this.layout.filter(obj => obj.i !== 'drop')
        // UNCOMMENT below if you want to add a grid-item
        /*
                this.layout.push({
                    x: DragPos.x,
                    y: DragPos.y,
                    w: 1,
                    h: 1,
                    i: DragPos.i,
                });
                this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,1,1);
                try {
                    this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display="block";
                } catch {
                }
                */
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
