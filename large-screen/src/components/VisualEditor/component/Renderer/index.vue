<template>
  <div :class="getClass()"
       @click.stop="onClick"
       @contextmenu.stop="onClick">
    <a-dropdown :trigger="['contextmenu']">
      <Border ref="border" :data="border">
        <div ref="render"
            class="render-container"
            @click="e => e.preventDefault()">
          <!-- 动态加载组件 -->
          <component ref="component"
                    v-if="cell && cell.component"
                    :is="cell.component"
                    v-bind="{
                      editor: editor,
                      component: component,
                      transformScale: transformScale,
                      item: data,
                      src: cell.src,
                      data: cell.props,
                      type
                    }">
          </component>
        </div>
      </Border>
      <a-menu slot="overlay">
        <a-menu-item v-for="item in operation"
                     :key="item.key"
                     @click="onOperation(item)">
          <div class="menu-item-container">
            <a-icon class="icon" :type="item.icon"></a-icon>{{item.name}}
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <!-- 查看源码 -->
    <ViewSourceModal v-if="viewSourceVisible" :data="cell.option" @close="onModalClose"></ViewSourceModal>
  </div>
</template>

<script>
import _ from 'lodash'
import Chart from '../../entity/cell/Chart'
import Text from '../../entity/cell/Text'
import Media from '../../entity/cell/Media'
import Decoration from '../../entity/cell/Decoration'
import Search from '../../entity/cell/Search'
import Table from '../../entity/cell/Table'
import Border from './Border'
import ViewSourceModal from './sourceModal.vue'
import color from '../../config/color'
import { getImage } from '../../utils/output'

export default {
  name: 'Renderer',
  props: {
    editor: null,
    data: {
      type: Object,
      required: true
    },
    component: {
      type: Object,
      required: true
    },
    transformScale: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'config'
    }
  },
  components: { ViewSourceModal, Border },
  data () {
    return {
      cell: null,
      observer: null,
      // 边框
      border: {
        component: 'none',
        primaryColor: color['dataV-primary-color'],
        deputyColor: color['dataV-deputy-color'],
        backgroundColor: color['dataV-background-color'],
        padding: 0
      },
      // 弹窗
      viewSourceVisible: false
    }
  },
  computed: {
    operation () {
      let data = []
      if (this.type !== 'view') {
        if (this.component.componentType) {
          data = this.editor.operation.renderer.filter(item => {
            let flag
            if (!item.enable || item.enable.includes(this.component.componentType)) {
              flag = true
            }
            if (item.disable && item.disable.includes(this.component.componentType)) {
              flag = false
            }
            return flag
          })
        }
      }
      return data
    }
  },
  created () {
    this.onClick = _.debounce(this.onClick, 150)
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
            this.handleChartComponent()
            break
          case 'text':
            this.handleTextComponent()
            break
          case 'image':
            this.handleMediaComponent()
            break
          case 'video':
            this.handleMediaComponent()
            break
          case 'audio':
            this.handleMediaComponent()
            break
          case 'decoration':
            this.handleDecorationComponent()
            break
          case 'search':
            this.handleSearchComponent()
            break
          case 'table':
            this.handleTableComponent()
            break
          default:
            break
        }
        this.editor.storeCell(this.data.props, this.cell)
        this.observe()
      }
    },
    // Chart类型
    handleChartComponent () {
      let cell = this.editor.cell[this.data.props.key]
      if (cell) {
        this.cell = cell
        this.cell.changeAttr({
          vm: this,
          el: this.$refs.render
        })
        this.cell.init()
      } else {
        let cell = this.editor.cell[this.data.props.parentKey] || {}
        this.cell = new Chart({
          vm: this,
          key: this.data.props.key,
          el: this.$refs.render,
          type: this.data.props.type,
          parentOption: _.cloneDeep(cell.option),
          parentConfig: _.cloneDeep(cell.config),
          parentConfigData: _.cloneDeep(cell.configData)
        })
      }
    },
    // 文本类型
    handleTextComponent () {
      let cell = this.editor.cell[this.data.props.key]
      if (cell) {
        this.cell = cell
      } else {
        let cell = this.editor.cell[this.data.props.parentKey] || {}

        this.cell = new Text({
          vm: this,
          key: this.data.props.key,
          el: this.$refs.render,
          type: this.data.props.type,
          parentConfig: _.cloneDeep(cell.config),
          parentConfigData: _.cloneDeep(cell.configData)
        })
      }
    },
    // 多媒体类型
    handleMediaComponent () {
      let cell = this.editor.cell[this.data.props.key]
      if (cell) {
        this.cell = cell
      } else {
        let cell = this.editor.cell[this.data.props.parentKey] || {}
        this.cell = new Media({
          vm: this,
          key: this.data.props.key,
          el: this.$refs.render,
          type: this.data.props.type,
          src: cell.src || this.data.props.src,
          thumbnail: this.data.props.thumbnail,
          parentConfig: _.cloneDeep(cell.config),
          parentConfigData: _.cloneDeep(cell.configData)
        })
      }
    },
    // 装饰类型
    handleDecorationComponent () {
      let cell = this.editor.cell[this.data.props.key]
      if (cell) {
        this.cell = cell
      } else {
        let cell = this.editor.cell[this.data.props.parentKey] || {}
        this.cell = new Decoration({
          vm: this,
          key: this.data.props.key,
          el: this.$refs.render,
          type: this.data.props.type,
          props: cell.props || this.data.props,
          parentConfig: _.cloneDeep(cell.config),
          parentConfigData: _.cloneDeep(cell.configData)
        })
      }
    },
    // 查询类型
    handleSearchComponent () {
      let cell = this.editor.cell[this.data.props.key]
      if (cell) {
        this.cell = cell
      } else {
        let cell = this.editor.cell[this.data.props.parentKey] || {}
        this.cell = new Search({
          vm: this,
          key: this.data.props.key,
          el: this.$refs.render,
          type: this.data.props.type,
          props: cell.props || this.data.props,
          parentConfig: _.cloneDeep(cell.config),
          parentConfigData: _.cloneDeep(cell.configData)
        })
      }
    },
    // 表格类型
    handleTableComponent () {
      let cell = this.editor.cell[this.data.props.key]
      if (cell) {
        this.cell = cell
      } else {
        let cell = this.editor.cell[this.data.props.parentKey] || {}
        this.cell = new Table({
          vm: this,
          key: this.data.props.key,
          el: this.$refs.render,
          type: this.data.props.type,
          props: cell.props || this.data.props,
          parentConfig: _.cloneDeep(cell.config),
          parentConfigData: _.cloneDeep(cell.configData)
        })
      }
    },
    observe () {
      let _this = this
      _this.observer = new ResizeObserver(function () {
        switch (_this.data.props.componentType) {
          case 'chart':
            _this.cell.resize()
            break
          case 'text':
            _this.cell.resize()
            break
          case 'decoration':
            _this.cell.resize()
            break
          case 'search':
            _this.cell.resize()
            break
          case 'table':
            _this.cell.resize()
            break
          default:
            break
        }
        _this.$refs.border.resize()
      })
      _this.observer.observe(_this.$refs.render)
    },
    onClick (e) {
      if (this.type !== 'view') {
        this.editor.changeComponent(this.data)
      }
    },
    async onOperation (operation) {
      switch (operation.key) {
        case 'delete':
          this.$emit('delete', this.data.props)
          break
        case 'copy':
          this.editor.copyCell({
            ...this.data,
            props: {
              ...this.data.props,
              image: this.cell.componentType === 'chart' 
                ? this.cell.chart.getDataURL() 
                : (this.cell.type === 'video' ? this.cell.thumbnail : await getImage(this.cell.el))
            }
          })
          break
        case 'viewSource':
          this.viewSourceVisible = true
          break
        default:
          break
      }
    },
    getClass () {
      return this.component.key === this.data.i ? 'draggable-element draggable-element-selected' : 'draggable-element'
    },
    onModalClose () {
      this.viewSourceVisible = false
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
