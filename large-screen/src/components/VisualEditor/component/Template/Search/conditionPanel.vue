<template>
  <div ref="container" id="condition-panel-container" class="condition-panel-container">
    <div v-if="!data.enable" class="holder"> 条件面板 </div>
    <div v-else
         ref="content"
         class="content"
         :style="{ backgroundColor: columnStyle.backgroundColor }">
      <div :class="collapse.includes(item.key) ? 'condition-container condition-container-expand' : 'condition-container'"
           v-for="item in condition"
           :key="item.key">
        <div class="title-container"
            :style="titleStyle">
            {{item.name}}
        </div>
        <div class="column-container"
             :style="columnStyle">
          <div class="tag-container"
               v-for="column in getColumnTag(modelData[item.key])"
               :key="column.id">
            <a-checkable-tag :checked="item.checked[column.id]"
                             @change="handleChecked($event, item, column)">
              {{column.name}}
            </a-checkable-tag>
          </div>
          <!-- 已选维度组合 -->
          <div class="selected-container" v-if="item.key === 'dimensions-selected'">
            {{getDimensionsSelected()}}
          </div>
          <!-- 已选指标 -->
          <div class="selected-container" v-if="item.key === 'measures-selected'">
            {{getMeasuresSelected()}}
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
      // 展开面板
      condition: [
        { name: '可选维度', key: 'dimensions', checked: {} },
        { name: '已选维度组合', key: 'dimensions-selected', checked: {} },
        { name: '可选指标', key: 'measures', checked: {} },
        { name: '已选指标', key: 'measures-selected', checked: {} }
      ],
      collapse: [],
      // 模型
      model: null,
      modelData: {},
      // 颜色配置
      titleStyle: {
        color: '#fff',
        backgroundColor: '#1890ff'
      },
      columnStyle: {
        color: '#333',
        backgroundColor: '#fff',
        tagColor: '#1890ff',
        tagHighlightColor: '#fff'
      }
    }
  },
  watch: {
    columnStyle: {
      deep: true,
      immediate: true,
      handler: function (value) {
        if (this.data.enable) {
          this.handleColor()
        }
      }
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
      this.getModelConfig()
    },
    getModelConfig () {
      let instance = this.editor.instance.modelPanel
      if (instance) {
        this.model = instance.model
        this.modelData = instance.modelData
      }
    },
    onMore (data) {
      if (this.collapse.includes(data.key)) {
        this.collapse = this.collapse.filter(item => item !== data.key)
      } else {
        this.collapse.push(data.key)
      }
    },
    getColumnTag (data) {
      return data ? [{ id: 'all', name: '全选' }].concat(data) : []
    },
    handleChecked (checked, condition, column) {
      if (column.id === 'all') {
        this.modelData[condition.key].forEach(item => {
          condition.checked[item.id] = checked
        })
      }
      condition.checked[column.id] = checked

      // 判断全选选中状态
      if (column.id !== 'all') {
        let flag = true
        condition.checked['all'] = true
        this.modelData[condition.key].forEach(item => {
          if (!condition.checked[item.id]) {
            flag = false
          }
        })
        condition.checked['all'] = flag
      }
      this.$forceUpdate()
    },
    getDimensionsSelected () {
      if (!this.modelData['dimensions']) return

      let string = ''
      this.modelData['dimensions'].forEach(item => {
        if (this.condition[0].checked[item.id]) {
          string += item.name + ' + '
        }
      })
      string = string.slice(0, string.length - 3)

      return string
    },
    getMeasuresSelected () {
      if (!this.modelData['measures']) return
      let string = ''
      this.modelData['measures'].forEach(item => {
        if (this.condition[2].checked[item.id]) {
          string += item.name + ' '
        }
      })
      string = string.slice(0, string.length - 1)

      return string
    },
    handleColor () {
      this.$refs.container.style.setProperty('--color', this.columnStyle.color)
      this.$refs.container.style.setProperty('--tagColor', this.columnStyle.tagColor)
      this.$refs.container.style.setProperty('--tagHighlightColor', this.columnStyle.tagHighlightColor)
    }
  }
}
</script>

<style lang="less" scoped>
  #condition-panel-container{
    --color: #333;
    --tagColor: #1890ff;
    --tagHighlightColor: #fff;
  }
  .condition-panel-container{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    overflow-y: auto;
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
        .title-container{
          height: 100%;
          width: 100px;
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
        .selected-container{
          font-size: 12px;
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
        .title-container{
          height: auto;
        }
      }
    }
  }
  /deep/.ant-tag{
    color: var(--color);
  }
  /deep/.ant-tag-checkable-checked{
    color: var(--tagHighlightColor);
    background-color: var(--tagColor);
  }
</style>
