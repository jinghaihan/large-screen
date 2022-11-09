<template>
  <div class="tool-container">
    <div class="layer-container">
      <a-dropdown v-show="layout.length > 1">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <span class="layer">{{layout[layer].name}}</span><a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item v-for="item in layout.filter((item, index) => index !== layer)"
                      :key="item.key"
                      @click="onChangeLayer(item)">
            <a href="javascript:;">{{item.name}}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <span class="layer" v-show="layout.length === 1">{{layout[layer].name}}</span>
    </div>
    <tooltip-icon class="action" title="新增图层" icon="block" placement="bottom" @click="onCreateLayer"></tooltip-icon>
    <a-divider type="virtical"></a-divider>
    <div class="scale-container">
      <tooltip-icon class="icon" title="放大" icon="plus" placement="bottom"></tooltip-icon>
      <span class="scale">{{scale * 100}}%</span>
      <tooltip-icon class="icon" title="缩小" icon="minus" placement="bottom"></tooltip-icon>
    </div>
    <a-divider type="virtical"></a-divider>
    <tooltip-icon class="action" title="帮助" icon="question-circle" placement="bottom"></tooltip-icon>
  </div>
</template>

<script>
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
    scale: {
      type: Number,
      required: true
    }
  },
  methods: {
    onCreateLayer () {
      this.$emit('createLayer')
    },
    onChangeLayer (item) {
      this.$emit('changeLayer', item.key) 
    }
  }
}
</script>

<style lang="less" scoped>
  .tool-container{
    display: flex;
    align-items: center;
    color: var(--icon-color);
    .layer-container{
      display: flex;
      align-items: center;
      .layer{
        color: var(--icon-color);
        font-weight: bold;
        font-size: 15px;
      }
    }
    .scale-container{
      display: flex;
      align-items: center;
      .scale{
        font-weight: bold;
        font-size: 15px;
      }
      .icon{
        margin: 0 8px;
        font-size: 12px;
      }
    }
    .action{
      color: #1890ff;
      font-size: 16px;
      margin: 0 8px;
    }
  }
</style>
