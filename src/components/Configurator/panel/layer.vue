<template>
  <a-spin :spinning="loading">
    <div class="layer-panel-container">
      <div class="operator-container">
        <a-button class="button" icon="redo" size="small" @click="onRefresh">刷新预览</a-button>
        <a-button class="button" icon="plus-circle" type="primary" size="small" @click="onCreate">新增图层</a-button>
        <a-button class="button" icon="save" type="danger" size="small" @click="onUpdate">更新配置</a-button>
      </div>
        <draggable
          v-if="!loading"
          class="layer-list-group"
          tag="ul"
          v-model="list"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <li class="list-group-item"
                v-for="element in list"
                :key="element.key"
            >
            <a-card size="small" :title="element.name">
              <template slot="extra">
                <tooltip-icon class="action"
                              :icon="element.visible ? 'eye' : 'eye-invisible'"
                              :title="element.visible ? '可见' : '不可见'"
                              @click="element.visible = !element.visible">
                </tooltip-icon>
                <tooltip-icon class="action" icon="edit" title="修改名称" @click="onEdit(element)"></tooltip-icon>
                <tooltip-icon class="action" icon="delete" title="删除图层" @click="onDelete(element)"></tooltip-icon>
              </template>
              <img v-if="element.image" class="image" :src="element.image" alt="thumbnail">
              <a-empty v-else description="该图层不可见"></a-empty>
            </a-card>
            </li>
          </transition-group>
        </draggable>
      <LayerModal v-if="modalVisible" :modalData="modalData" @close="onModalClose"></LayerModal>
    </div>
  </a-spin>
</template>

<script>
import LayerModal from '../toolbox/layerModal.vue'
import { getUUID, getThumbnail } from '../utils'

export default {
  props: {
    layout: {
      type: Array,
      required: true
    },
    layer: {
      type: Number,
      required: true
    },
    root: null
  },
  components: { LayerModal },
  data () {
    return {
      loading: false,
      list: [],
      drag: false,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      },
      modalData: {},
      modalVisible: false
    }
  },
  watch: {
    layout: {
      deep: true,
      handler: function () {
        this.onRefresh()
      }
    }
  },
  created () {
    this.handleList()
  },
  methods: {
    handleList (isRefresh) {
      this.loading = true
      Promise.all(this.layout.map(async (item, index) => {
        const el = this.root.$refs.paper.$refs.layoutContainer.$refs.layer[index].$el
        return { 
          name: item.name,
          key: item.key,
          visible: item.visible,
          current: index === this.layer,
          layer: index,
          image: item.visible ? await getThumbnail(el, 0.1) : ''
        }
      })).then(result => {
        console.log(this.layout)
        this.list = _.cloneDeep(result)
        this.loading = false
      })
    },
    onRefresh () {
      this.handleList(true)
    },
    onCreate () {
      this.modalData.modalType = 'create'
      this.modalData.name = '图层' + (this.layout.length + 1)
      this.modalVisible = true
    },
    onEdit (el) {
      this.modalData = {
        modalType: 'edit',
        name: el.name,
        key: el.key
      }
      this.modalVisible = true
    },
    onDelete (el) {
      this.root.onDeleteLayer(el)
    },
    onUpdate () {
      let keys = []
      let layer
      this.list.forEach((item, index) => {
        keys.push(item.key)
        if (item.current) {
          layer = index
        }
      })
      let layout = keys.map((key, order) => {
        let index = this.layout.findIndex(data => data.key === key)
        return {
          ...this.layout[index],
          key: getUUID(),
          visible: this.list[order].visible,
          layout: this.root.$refs.paper.$refs.layoutContainer.$refs.layer[index].layout
        }
      })

      this.root.onUpdateLayer({ layout, layer })
    },
    onModalClose (data) {
      if (data) {
        switch (this.modalData.modalType) {
          case 'create':
            this.root.onCreateLayer(data)
            break
          case 'edit':
            this.root.onEditLayer(data)
            break
          default:
            this.root.onDeleteLayer(data)
            break
        }
      }
      this.modalData = {}
      this.modalVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.ant-card-body{
    padding: 4px 0;
  }
  /deep/.ant-card-extra{
    display: flex;
  }
  /deep/.ant-card{
    background: var(--primary-color);
  }
  /deep/.ant-card-head{
    background: var(--normal-color);
    color: var(--font-color);
  }
  /deep/.ant-card-bordered{
    border-color: var(--highlight-color);
  }
</style>
