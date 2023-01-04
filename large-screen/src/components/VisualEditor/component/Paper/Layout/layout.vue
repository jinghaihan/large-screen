<template>
  <div class="layout-container" @click="onClick">
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
                :transformScale="transformScale"
                @layout-updated="layoutUpdatedEvent">
      <GridItem v-for="item in layout"
                :key="item.i"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                :maxW="maxW"
                :maxH="maxH"
                :style="getGridItemStyle(item)">
        <Renderer :id="item.i" :entity="entity" :data="item" :component="component" :transformScale="transformScale" @delete="onDelete"></Renderer>
      </GridItem>
    </GridLayout>
  </div>
</template>

<script>
import _ from 'lodash'
import { GridLayout, GridItem } from '../../lib/vue-grid-layout/components/index'
import Renderer from '../../Renderer/index.vue'

export default {
  props: {
    entity: null,
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
        this.entity.changeComponent()
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
    getGridItemStyle (item) {
      let cell = this.entity.cell[item.i]
      if (cell) {
        let zIndex = cell.configData.configData ? cell.configData.configData.zIndex : 0
        return { zIndex }
      }
      return {}
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
  .layout-container{
    height: 100%;
    .vue-grid-layout{
      height: 100% !important;
    }
  }
</style>
