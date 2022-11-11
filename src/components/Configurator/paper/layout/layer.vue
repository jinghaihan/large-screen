<template>
  <div class="layer-container" @click="onClick">
    <grid-layout ref="gridLayout"
                :layout.sync="layout"
                :col-num="colNum"
                :max-rows="maxH"
                :row-height="rowHeight"
                :is-draggable="draggable"
                :is-resizable="resizable"
                :vertical-compact="false"
                :prevent-collision="true"
                :margin="[0, 0]">
        <grid-item v-for="item in layout"
                  :key="item.i"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  :i="item.i"
                  :maxW="maxW"
                  :maxH="maxH"
                  @move="onMove(item)"
                  @resize="onResize(item)">
          <Renderer :data="item" :component="component" :root="root" @delete="onDelete"></Renderer>
        </grid-item>
    </grid-layout>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import Renderer from '../renderer/renderer.vue'

export default {
  props: {
    rowHeight: {
      type: Number,
      required: true
    },
    ratio: {
      type: Object,
      required: true
    },
    resizable: {
      type: Boolean,
      required: true
    },
    draggable: {
      type: Boolean,
      required: true
    },
    component: {
      type: Object,
      required: true
    },
    root: null
  },
  components: { Renderer },
  data () {
    return {
      layout: [],
      maxW: 0,
      maxH: 0
    }
  },
  created () {
    this.initGridSize()
  },
  computed: {
    ...mapGetters('configurator', [ 'colNum' ])
  },
  methods: {
    initGridSize () {
      this.maxW = this.colNum
      this.maxH = (this.colNum / this.ratio.width * this.ratio.height).toFixed(0)
    },
    onDelete (data) {
      let _this = this
      _this.$confirm({
        title: '您确定删除该组件吗？',
        content: '该组件配置数据将一同删除',
        confirmLoading: true,
        okText: '确定',
        cancelText: '取消',
        onOk () {
          _this.layout = _this.layout.filter(item => item.i !== data.i)
          _this.root.updateSelectedComponent({})
        },
        onCancel () { }
      })
    },
    onMove (data) {
      this.root.updateSelectedComponent(data)
    },
    onResize (data) {
      this.root.updateSelectedComponent(data)
    },
    onClick (e) {
      let srcElement = e.srcElement
      if (srcElement.getAttribute('class') === 'vue-grid-layout') {
        this.root.updateSelectedComponent({})
      }
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
