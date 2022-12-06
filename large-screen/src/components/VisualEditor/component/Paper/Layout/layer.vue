<template>
  <div class="layer-container" @click="onClick">
    <GridLayout ref="gridLayout"
                :layout.sync="layout"
                :col-num="grid.count"
                :max-rows="maxH"
                :row-height="rowHeight"
                :is-draggable="draggable"
                :is-resizable="resizable"
                :vertical-compact="false"
                :prevent-collision="true"
                :margin="[0, 0]"
                :transformScale="transformScale">
      <GridItem v-for="item in layout"
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
        <Renderer :editor="editor" :data="item" :component="component" :transformScale="transformScale" @delete="onDelete"></Renderer>
      </GridItem>
    </GridLayout>
  </div>
</template>

<script>
import _ from 'lodash'
import { GridLayout, GridItem } from 'vue-grid-layout'
import Renderer from '../../Renderer/index.vue'

export default {
  props: {
    editor: null,
    layoutData: {
      type: Array,
      required: true
    },
    ratio: {
      type: Object,
      required: true
    },
    grid: {
      type: Object,
      required: true
    },
    component: {
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
    rowHeight: {
      type: Number,
      required: true
    },
    transformScale: {
      type: Number,
      required: true
    }
  },
  components: { GridLayout, GridItem, Renderer },
  data () {
    return {
      layout: _.cloneDeep(this.layoutData),
      maxW: this.grid.count,
      maxH: parseInt((this.grid.count / this.ratio.width * this.ratio.height).toFixed(0)),
      visible: false
    }
  },
  watch: {
    ratio: {
      deep: true,
      handler: function (value) {
        this.maxH = parseInt((this.grid.count / this.ratio.width * this.ratio.height).toFixed(0))
      }
    }
  },
  methods: {
    onClick (e) {
      let srcElement = e.srcElement
      if (srcElement.getAttribute('class') === 'vue-grid-layout') {
        this.editor.changeComponent()
      }
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
          _this.layout = _this.layout.filter(item => item.i !== data.key)
          _this.editor.deleteCell(data)
          _this.editor.changeComponent()
        },
        onCancel () { }
      })
    },
    onMove (data) {
      this.editor.changeComponent(data)
    },
    onResize (data) {
      this.editor.changeComponent(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .layer-container{
    height: 100%;
    .vue-grid-layout{
      height: 100% !important;
    }
  }
</style>
