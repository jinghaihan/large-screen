<template>
  <div class="tool-container">
    <div class="layer-container">
      <span class="layer">{{layout[layer].name}}</span>
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
    }
  }
}
</script>

<style lang="less" scoped>
  .tool-container{
    display: flex;
    align-items: center;
    .layer-container{
      display: flex;
      align-items: center;
      .layer{
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
