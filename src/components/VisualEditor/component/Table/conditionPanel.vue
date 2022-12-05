<template>
  <div class="condition-panel-container">
    <div v-if="!data.enable" class="holder"> 条件面板 </div>
    <div v-else ref="content" class="content">
      <div :class="collapse.includes(item.key) ? 'condition-container condition-container-expand' : 'condition-container'"
           v-for="item in condition"
           :key="item.key">
        <div class="name-container">{{item.name}}</div>
        <div class="column-container">
          <div class="tag-container" v-for="name in tag" :key="name">
            <a-tag class="tag">{{name}}</a-tag>
          </div>
        </div>
        <div class="more-container" @click="onMore(item)">
          更多<a-icon :type="collapse.includes(item.key) ? 'caret-up' : 'caret-down'"></a-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const tag = []
for (let i = 0; i < 60; i++) {
  tag.push('column' + i)
}
export default {
  props: {
    editor: null,
    data: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      condition: [
        { name: '可选维度', key: 'dimension' },
        { name: '已选维度组合', key: 'dimension-selected' },
        { name: '可选指标', key: 'measure' },
        { name: '已选指标', key: 'measure-selected' }
      ],
      collapse: [],
      tag
    }
  },
  created () {
    if (this.data.enable) {
      this.init()
    }
  },
  methods: {
    init () {
      if (this.data.enable) {
        this.editor.setInstance({ conditionPanel: this })
      }
      let instance = this.editor.instance.modelPanel
      console.log('条件面板', instance.model, instance.modelData)
    },
    onMore (data) {
      if (this.collapse.includes(data.key)) {
        this.collapse = this.collapse.filter(item => item !== data.key)
      } else {
        this.collapse.push(data.key)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .condition-panel-container{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    overflow-y: auto;
    background: #fff;
    .holder{
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content{
      height: 100%;
      .condition-container{
        height: 25%;
        display: flex;
        border-bottom: 1px solid var(--highlight-color);
        .name-container{
          height: 100%;
          width: 100px;
          background: #1890ff;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: left;
          padding: 8px;
        }
        .column-container{
          height: 100%;
          width: calc(~"100% - 100px - 80px");
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding-left: 8px;
          overflow: hidden;
          .tag-container{
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .more-container{
          cursor: pointer;
          width: 80px;
          display: flex;
          align-items: center;
        }
      }
      .condition-container-expand{
        height: auto;
        .name-container{
          height: auto;
        }
        .tag-container{
          margin: 8px 0;
        }
      }
    }
  }
</style>
