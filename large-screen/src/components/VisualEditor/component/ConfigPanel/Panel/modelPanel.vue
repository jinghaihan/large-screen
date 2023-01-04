<template>
  <div class="model-panel-container">
    <a-spin :spinning="loading">
      <div class="container">
        <div :class="item.key === 'model' ? 'model-content-container' : 'content-container'"
              v-for="item in content"
              :key="item.key">
          <label class="label">{{item.name}}</label>
          <div class="list-container" v-if="item.key !== 'model'">
            <a-list item-layout="horizontal" :data-source="modelData ? modelData[item.key] : []">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-icon class="icon" :type="columnType[item.columnType].icon"></a-icon>{{item.name}}
              </a-list-item>
            </a-list>
          </div>
          <div v-else class="model-container">
            <a-select :value="model"
                      :placeholder="'请选择' + config.label"
                      v-bind="config.props || {}"
                      :show-search="true"
                      :filter-option="filterOptions"
                      @change="onChange"
                      style="width: 100%" >
            </a-select>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import _ from 'lodash'
import { getModelList, getModelData } from '../../../service/model'

export default {
  props: {
    entity: null,
    paper: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      loading: false,
      // 模型选择
      model: undefined,
      config: _.cloneDeep(this.entity.config.model)[0],
      // 模型数据
      modelData: {},
      content: [
        { name: '维度', key: 'model' },
        { name: '维度', key: 'dimensions' },
        { name: '指标', key: 'measures' }
      ],
      columnType: {
        0: { type: '文本', icon: 'font-size' },
        1: { type: '数值', icon: 'number' },
        2: { type: '日期', icon: 'calendar' }
      }
    }
  },
  watch: {
    paper: {
      immediate: true,
      handler: function (value) {
        if (!this.entity.instance['model']) {
          this.model = undefined
          this.modelData = {}
          this.entity.setInstance({ model: this })
          this.update()
        }
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.loading = true
      let res = await getModelList()
      if (!res.data.success) {
        this.$notification.error({ message: '错误', description: res.data.desc })
        return
      }
      let data = res.data.data
      this.config.props.options = data.map(option => {
        return {
          label: option.modelName,
          value: option.modelId,
          ...option
        }
      })
      this.visible = true
      this.loading = false
    },
    onChange (value) {
      let _this = this
      if (_this.model) {
        _this.$confirm({
          title: `您确定切换模型吗？`,
          content: '更改模型将清空当前所有数据模型配置',
          confirmLoading: true,
          okText: '确定',
          cancelText: '取消',
          async onOk () {
            // 清空数据模型配置
            _this.entity.clearModelConfig()
            await _this.changeModel(value)
          },
          onCancel () { }
        })
      } else {
        _this.changeModel(value)
      }
    },
    async changeModel (value) {
      this.loading = true
      let res = await getModelData(value)
      if (!res.data.success) {
        this.$notification.error({ message: '错误', description: res.data.desc })
        return
      }
      this.modelData = res.data.data
      this.loading = false
      this.model = value

      // 通知组件
      this.entity.notifyComponent(this.modelData)
      this.update()
    },
    filterOptions (input, option) {
      return (
        option.componentOptions.children[0].text.includes(input)
      )
    },
    update () {
      this.entity.update({
        model: {
          model: this.model,
          modelData: this.modelData
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .model-panel-container{
    height: 100%;
    .container{
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .content-container{
        height: calc(~"(100% - 64px) / 2");
        padding: 24px;
        padding-bottom: 0;
        padding-right: 0;
        .list-container{
          height: calc(~"100% - 24px");
          overflow-x: hidden;
          overflow-y: auto;
        }
      }
      .model-content-container{
        padding: 24px;
        padding-bottom: 0;
      }
      .content-container,
      .model-content-container{
        width: 100%;
        margin-bottom: 12px;
        .label{
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .icon{
          color: #1890ff;
          margin-right: 8px;
        }
      }
    }
  }
  /deep/.ant-spin-nested-loading{
    height: 100%;
    .ant-spin{
      max-height: none;
    }
    .ant-spin-container{
      height: 100%;
    }
  }
</style>
