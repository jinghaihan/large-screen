<template>
  <a-modal
    :visible="true"
    @cancel="closeModal()"
    :maskClosable="false"
    :keyboard="false"
    :width="1000"
    title="模板库"
    :getContainer="getContainer()"
    wrapClassName="visual-editor-modal"
    :footer="null"
  >
    <div class="container">
      <a-spin :spinning="loading">
        <a-row :gutter=[24,24]>
          <a-col v-for="(item, index) in data"
                :key="item.id + '-' + index"
                :xl="6"
                :md="8"
                :sm="2">
            <a-card size="small"
                    :title="item.name"
                    hoverable
                    @click="onClick(item)">
              <!-- 数据 -->
              <template>
                <!-- 缩略图 -->
                <img
                  class="image"
                  slot="cover"
                  alt="example"
                  :src="item.image"
                />
              </template>
            </a-card>
          </a-col>
        </a-row>
      </a-spin>
    </div>
  </a-modal>
</template>

<script>
import { getUUID } from '../../../utils'

export default {
  props: {
    editor: null
  },
  data () {
    return {
      data: [],
      loading: false
    }
  },
  created () {
    this.handleSearch()
  },
  methods: {
    handleSearch () {
      this.loading = true
      let data = [
        {
          name: '简单报表',
          id: getUUID(),
          image: require('@/assets/VisualEditor/template/simpleReport.png'),
          config: '{"global":{"style":{"ratioWidth":16,"ratioHeight":12,"gridColor":{"rgba":{"r":240,"g":240,"b":240,"a":1}},"background":"none"},"data":{"dataModel":{"type":"dataModel"},"builtinConditions":{}}},"layout":[{"x":0,"y":0,"w":100,"h":10,"i":"a0e0e14cc0614354aa4d38bbc4d8f82d","props":{"key":"a0e0e14cc0614354aa4d38bbc4d8f82d","component":"Search","type":"conditionPanel","enable":false,"name":"条件面板","componentType":"search"}},{"x":0,"y":10,"w":100,"h":10,"i":"a32287a2f9394f78be668730b359ff2c","props":{"key":"a32287a2f9394f78be668730b359ff2c","component":"Search","type":"searchPanel","enable":false,"name":"查询面板","componentType":"search"}},{"x":0,"y":20,"w":100,"h":20,"i":"70a7d0d0dd6649bdaefb91136c0fabb4","props":{"key":"70a7d0d0dd6649bdaefb91136c0fabb4","component":"Table","type":"simpleTable","enable":false,"name":"简单表格","componentType":"table"}}],"searchs":{},"views":{"a0e0e14cc0614354aa4d38bbc4d8f82d":{"type":"conditionPanel","id":"a0e0e14cc0614354aa4d38bbc4d8f82d","style":{"ui":{"zIndex":0,"vm-titleStyle-color":{"hex":"#fff"},"vm-titleStyle-backgroundColor":{"hex":"#1890ff"},"vm-columnStyle-color":{"hex":"#333"},"vm-columnStyle-backgroundColor":{"hex":"#fff"},"vm-columnStyle-tagColor":{"hex":"#1890ff"},"vm-columnStyle-tagHighlightColor":{"hex":"#fff"},"vm-border-component":"none","vm-border-padding":0,"vm-border-primaryColor":{"hex":"#4fd2dd"},"vm-border-deputyColor":{"hex":"#235fa7"},"vm-border-backgroundColor":{"hex":"#00000000"}},"switchKeys":[],"collapseKeys":["border"]},"data":{}},"a32287a2f9394f78be668730b359ff2c":{"type":"searchPanel","id":"a32287a2f9394f78be668730b359ff2c","style":{"ui":{"vm-button-right?pixel":0,"vm-button-bottom?pixel":0,"vm-button-margin?pixel":8,"vm-button-size":"default","vm-button-search":"primary","vm-button-reset":"default","zIndex":0,"vm-border-component":"none","vm-border-padding":0,"vm-border-primaryColor":{"hex":"#4fd2dd"},"vm-border-deputyColor":{"hex":"#235fa7"},"vm-border-backgroundColor":{"hex":"#00000000"}},"switchKeys":[],"collapseKeys":["border"]},"data":{}},"70a7d0d0dd6649bdaefb91136c0fabb4":{"type":"simpleTable","id":"70a7d0d0dd6649bdaefb91136c0fabb4","style":{"ui":{"zIndex":0,"vm-border-component":"none","vm-border-padding":0,"vm-border-primaryColor":{"hex":"#4fd2dd"},"vm-border-deputyColor":{"hex":"#235fa7"},"vm-border-backgroundColor":{"hex":"#00000000"}},"switchKeys":[],"collapseKeys":["border"]},"data":{"isGroupBy":null,"order":null,"data":{}}}}}'
        }
      ]
      this.data = data
      this.loading = false
    },
    onClick (data) {
      this.$emit('submit', data.config)
      this.closeModal()
    },
    closeModal (data) {
      this.$emit('close', data)
    },
    getContainer () {
      return () => document.getElementById('visual-editor-container')
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    overflow-x: hidden;
    overflow-y: auto;
    /deep/.ant-card-body{
      padding: 0;
    }
    .image{
      height: 120px;
    }
  }
  /deep/.ant-card{
    background: var(--primary-color);
  }
  /deep/.ant-card-head{
    background: var(--normal-color);
    color: var(--font-color);
    padding: 0;
    min-height: 28px;
    display: flex;
    align-items: center;
  }
  /deep/.ant-card-head-wrapper{
    width: 100%;
  }
  /deep/.ant-card-head-title{
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/.ant-card-bordered{
    border-color: var(--highlight-color);
  }
</style>
