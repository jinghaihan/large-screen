<template>
  <div class="tool-container">
    <!-- 图层 -->
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
    <!-- 缩放 -->
    <div class="scale-container">
      <tooltip-icon class="icon" title="放大" icon="plus" placement="bottom" @click="onScale('up')"></tooltip-icon>
      <span class="scale">{{(scale * 100).toFixed(0)}}%</span>
      <tooltip-icon class="icon" title="缩小" icon="minus" placement="bottom" @click="onScale('down')"></tooltip-icon>
    </div>
    <a-divider type="virtical"></a-divider>
    <!-- 清空 -->
    <tooltip-icon class="action delete-action" title="清空" icon="delete" placement="bottom"></tooltip-icon>
    <a-divider type="virtical"></a-divider>
    <!-- 帮助 -->
    <a-popover title="快捷键">
      <template slot="content">
        <div class="shortcut-container" v-for="key in shortcutKey" :key="key.description">
          <!-- tag展示 -->
          <div class="tag-container">
            <a-tag v-for="tag in key.combo" :key="tag">{{tag}}</a-tag>
          </div>
          <!-- 描述 -->
          <span class="description" v-if="key.description">{{key.description}}</span>
        </div>
      </template>
      <a-icon class="action help-action" type="question-circle"></a-icon>
    </a-popover>
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
  data () {
    return {
      shortcutKey: [
        {
          combo: ['ctrl+shift > up', 'command+shift > up'],
          description: '放大画布'
        },
        {
          combo: ['ctrl+shift > down', 'command+shift > down'],
          description: '缩小画布'
        },
        {
          combo: ['ctrl+shift > k', 'command+shift > k'],
          description: '画布网格线'
        }
      ]
    }
  },
  methods: {
    onScale (direction) {
      this.$emit('change-scale', direction)
    },
    onCreateLayer () {
      this.$emit('create-layer')
    },
    onChangeLayer (item) {
      this.$emit('change-layer', item.key) 
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
    .delete-action{
      color: #f5222d;
    }
    .help-action{
      color: #52c41a;
    }
  }
</style>

<style lang="less">
  .shortcut-container{
    margin: 8px 0;
    width: 350px;
    display: flex;
    align-items: center;
    .tag-container{
      width: 280px;
    }
    .description{
      color: #ccc;
    }
  }
</style>
