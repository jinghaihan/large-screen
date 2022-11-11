<template>
  <div class="layer-panel-container">
    <a-button class="button" icon="plus-circle" type="primary" size="small" @click="onCreate">新增图层</a-button>
    <draggable
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
            <tooltip-icon class="action" icon="edit" title="修改名称" @click="onEdit(element)"></tooltip-icon>
            <tooltip-icon class="action" icon="delete" title="删除图层" @click="onDelete"></tooltip-icon>
          </template>
          <a-empty></a-empty>
        </a-card>
        </li>
      </transition-group>
    </draggable>
    <LayerModal v-if="modalVisible" :modalData="modalData" @close="onModalClose"></LayerModal>
  </div>
</template>

<script>
import LayerModal from '../toolbox/layerModal.vue'

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
        this.handleList()
      }
    }
  },
  created () {
    this.handleList()
  },
  methods: {
    handleList () {
      this.list = _.cloneDeep(this.layout.map((item, index) => {
        return { 
          name: item.name,
          key: item.key,
          current: index === this.layer,
          order: index + 1
        }
      }))
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
    onDelete () {
      
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
  /deep/.ant-card-extra{
    display: flex;
  }
</style>
