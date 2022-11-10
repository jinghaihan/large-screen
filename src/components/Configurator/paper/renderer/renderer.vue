<template>
  <div :class="getStyle()"
       @click="onClick">
    <a-dropdown :trigger="['contextmenu']">
      <div class="render-container" @click="e => e.preventDefault()">
        {{data.i}}
      </div>
      <a-menu slot="overlay">
        <a-menu-item v-for="item in operation" :key="item.key" @click="onOperation(item)">
          <div class="draggable-element-menu-item-container">
            <a-icon class="icon" :type="item.icon"></a-icon>{{item.name}}
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    component: {
      type: Object,
      required: true
    },
    root: null
  },
  data () {
    return {
      operation: [
        {
          name: '复制',
          key: 'copy',
          icon: 'copy'
        },
        {
          name: '删除',
          key: 'delete',
          icon: 'delete'
        }
      ]
    }
  },
  methods: {
    getStyle () {
      return this.component.i === this.data.i ? 'draggable-element draggable-element-selected' : 'draggable-element'
    },
    onClick () {
      this.root.updateSelectedComponent(this.data)
    },
    onDelete () {
      this.$emit('delete', this.data)
    },
    onOperation (data) {
      switch (data.key) {
        case 'delete':
          this.onDelete()
          break
        case 'copy':
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
