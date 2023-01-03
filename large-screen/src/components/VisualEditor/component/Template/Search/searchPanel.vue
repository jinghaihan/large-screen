<template>
  <div class="search-panel-container">
    <!-- 组件面板展示 -->
    <div v-if="!data.enable" class="holder"> 查询面板 </div>
    <div v-else ref="content" class="content">
      <!-- 无组件样式 -->
      <div v-if="!layout.length" class="holder">
        <a-empty></a-empty>
      </div>
      <!-- 画布布局 -->
      <GridLayout ref="gridLayout"
                  :layout.sync="layout"
                  :col-num="grid.count"
                  :max-rows="grid.maxRows"
                  :row-height="grid.rowHeight"
                  :is-draggable="data.enable"
                  :is-resizable="data.enable"
                  :vertical-compact="false"
                  :prevent-collision="true"
                  :margin="[0, 0]"
                  :transformScale="transformScale"
                  @layout-updated="layoutUpdatedEvent">
        <GridItem v-for="item in layout"
                  :key="item.i"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  :i="item.i"
                  :maxW="grid.count"
                  :maxH="grid.maxRows"
                  :static="type === 'view'">
          <Renderer :entity="entity" :data="item" :component="component" :transformScale="transformScale" :type="type" @delete="onDelete"></Renderer>
        </GridItem>
      </GridLayout>
      <!-- 按钮 -->
      <div ref="button" class="button-container">
        <a-button class="button"
                  icon="search"
                  :size="button.size"
                  :type="button.search"
                  @click="onSearch">查询</a-button>
        <a-button class="button"
                  icon="redo"
                  :size="button.size"
                  :type="button.reset"
                  @click="onReset">重置</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { GridLayout, GridItem } from '../../lib/vue-grid-layout/components/index'

const Renderer = () => import('../../Renderer/index.vue')

export default {
  name: 'SearchPanel',
  props: {
    entity: null,
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
    },
    transformScale: {
      type: Number,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: 'config'
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
      },
      button: {
        bottom: 0,
        right: 0,
        margin: '8px',
        size: 'default',
        search: 'primary',
        reset: 'default'
      }
    }
  },
  watch: {
    button: {
      deep: true,
      handler (value) {
        this.updateButtonStyle(value)
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
      delete this.entity.instance['searchPanel']
    }
  },
  methods: {
    onSearch () {
      if (this.type === 'view') {
        this.entity.handleSearch()
      }
    },
    onReset () {
      if (this.type === 'view') {
        this.entity.handleReset()
      }
    },
    init () {
      if (this.data.enable) {
        this.entity.setInstance({ searchPanel: this })
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
          _this.entity.deleteCell(data)
          _this.entity.changeComponent()
        },
        onCancel () { }
      })
    },
    resize () {
      this.calcGrid()
    },
    calcGrid () {
      if (this.$refs.content) {
        const rect = this.$refs.content.getBoundingClientRect()
        this.grid.count = this.item.w
        this.grid.maxRows = Math.floor(this.grid.count / rect.width * rect.height)
        this.grid.rowHeight = rect.width / this.grid.count / this.transformScale
      }
    },
    updateButtonStyle (value) {
      $(this.$refs.button).css({
        right: value.right || 0,
        bottom: value.bottom || 0
      })
      $(this.$refs.button).find('.button').eq(0).css('margin-right', value.margin || (8 + 'px'))
    },
    // 回显
    onUpdate (layout) {
      this.updatePromise = {}
      return new Promise((resolve, reject) => {
        this.updatePromise.resolve = resolve
        this.updatePromise.reject = reject
        this.layout = layout
      })
    },
    layoutUpdatedEvent () {
      if (this.updatePromise) {
        this.updatePromise.resolve()
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
    overflow: hidden;
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
    .button-container{
      position: absolute;
      bottom: 0;
      right: 0;
      .button:first-of-type{
        margin-right: 8px;
      }
    }
  }
</style>
