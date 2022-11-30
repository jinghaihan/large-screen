<template>
  <div class="search-panel-container">
    <!-- 组件面板展示 -->
    <div v-if="!data.enable" class="holder"> 查询面板 </div>
    <div v-else ref="content" class="content">
      <div v-if="!layout.length" class="holder">
        <a-empty></a-empty>
      </div>
      <GridLayout ref="gridLayout"
                  :layout.sync="layout"
                  :col-num="grid.count"
                  :max-rows="grid.maxRows"
                  :row-height="grid.rowHeight"
                  :is-draggable="data.enable"
                  :is-resizable="data.enable"
                  :vertical-compact="false"
                  :prevent-collision="true"
                  :margin="[0, 0]">
        <GridItem v-for="item in layout"
                  :key="item.i"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  :i="item.i"
                  :maxW="grid.count"
                  :maxH="grid.maxRows"
                  @move="onMove(item)"
                  @resize="onResize(item)">
          <Renderer :editor="editor" :data="item" :component="component" @delete="onDelete"></Renderer>
        </GridItem>
      </GridLayout>
    </div>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

const Renderer = () => import('../Renderer/index.vue')

export default {
  props: {
    editor: null,
    component: {
      type: Object,
      required: false
    },
    data: {
      type: Object,
      required: false
    },
    item: {
      type: Object,
      required: false
    }
  },
  components: { GridLayout, GridItem, Renderer },
  data () {
    return {
      layout: [],
      grid: {
        count: 0,
        maxRows: 0,
        rowHeight: 0
      }
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.calcGrid()
  },
  beforeDestroy () {
    if (this.data.enable) {
      delete this.editor.instance['searchPanel']
    }
  },
  methods: {
    init () {
      if (this.data.enable) {
        this.editor.setInstance({ 'searchPanel': this })
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
    },
    resize () {
      this.calcGrid()
    },
    calcGrid () {
      if (this.$refs.content) {
        const rect = this.$refs.content.getBoundingClientRect()
        this.grid.count = this.item.w
        this.grid.maxRows = Math.ceil(this.grid.count / rect.width * rect.height)
        this.grid.rowHeight = rect.width / this.grid.count
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-panel-container{
    height: 100%;
    width: 100%;
    position: relative;
    .holder{
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content{
      height: 100%;
      .vue-grid-layout{
        height: 100% !important;
      }
      .holder{
        z-index: -1;
      }
    }
  }
</style>
