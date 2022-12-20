<template>
  <div class="toolbox-container">
    <a-divider type="vertical"></a-divider>
    <!-- 缩放 -->
    <ScaleWidget :editor="editor" :scale="scale"></ScaleWidget>
    <a-divider type="vertical"></a-divider>
    <!-- 清空 -->
    <TooltipIcon class="action delete-action" title="清空" icon="delete" placement="bottom" @click="onClear"></TooltipIcon>
    <a-divider type="vertical"></a-divider>
    <!-- 帮助 -->
    <HotkeyWidget></HotkeyWidget>
  </div>
</template>

<script>
import ScaleWidget from './widget/scaleWidget.vue'
import HotkeyWidget from './widget/hotkeyWidget.vue'
import TooltipIcon from '../../Widget/TooltipIcon'

export default {
  props: {
    editor: null,
    layout: {
      type: Array,
      required: true
    },
    scale: {
      type: Number,
      required: true
    }
  },
  components: { ScaleWidget, TooltipIcon, HotkeyWidget },
  methods: {
    onClear () {
      let _this = this
      _this.$confirm({
        title: '您确定清空画布吗？',
        content: '全部图层及组件配置数据将一同删除',
        confirmLoading: true,
        okText: '确定',
        cancelText: '取消',
        async onOk () {
          _this.editor.clear()
        },
        onCancel () { }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .toolbox-container{
    display: flex;
    align-items: center;
    color: var(--font-color);
    .delete-action{
      font-size: 16px;
      margin: 0 8px;
      color: #f5222d;
    }
    
  }
</style>
