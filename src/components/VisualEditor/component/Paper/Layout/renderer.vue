<template>
  <div :class="getStyle()"
       @click="onClick">
    <a-dropdown :trigger="['contextmenu']">
      <Border ref="border" :data="border">
        <div ref="render"
            class="render-container"
            @click="e => e.preventDefault()">
          <!-- 动态加载组件 -->
          <component ref="component"
                    v-if="cell && cell.component"
                    :is="cell.component"
                    :src="cell.src"
                    :data="cell.props">
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
import Chart from '../../../entity/Chart'
import Text from '../../../entity/Text'
import Media from '../../../entity/Media'
import Decoration from '../../../entity/Decoration'
import Border from './border/index.vue'
import ViewSourceModal from './viewSourceModal.vue'
import { getImage } from '../../../utils'

export default {
  props: {
    editor: null,
    data: {
      type: Object,
      required: true
    },
    component: {
      type: Object,
      required: true
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
        primaryColor: '#235fa7',
        deputyColor: '#4fd2dd',
        backgroundColor: '',
        padding: 0
      },
      // 弹窗
      viewSourceVisible: false
    }
  },
  computed: {
    operation () {
      let data = []
      if (this.component.componentType) {
        data = this.editor.operation.renderer.filter(item => {
          if (!item.only || item.only.includes(this.component.componentType)) {
            return true
          }
        })
      }
      return data
    }
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
            this.handleChart()
            break
          case 'text':
            this.handleText()
            break
          case 'image':
            this.handleMedia()
            break
          case 'video':
            this.handleMedia()
            break
          case 'audio':
            this.handleMedia()
            break
          case 'decoration':
            this.handleDecoration()
            break
          default:
            break
        }
        this.editor.setCell(this.data.props, this.cell)
        this.observe()
      }
    },
    // Chart类型
    handleChart () {
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
    handleText () {
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
    handleMedia () {
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
    handleDecoration () {
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
          default:
            break
        }
        _this.$refs.border.resize()
      })
      _this.observer.observe(_this.$refs.render)
    },
    onClick () {
      this.editor.changeComponent(this.data)
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
    getStyle () {
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
