<template>
  <div class="simple-table-container" ref="container">
    <!-- sheet类型 -->
    <template v-if="type !== 'view'">
      <div v-if="!data.enable" class="holder"> 简单表格 </div>
      <div v-else class="content">
        <SpreadSheet ref="sheet"
                    :sheetId="data.key + '-' + getUUID()"
                    :config="sheetConfig"
                    @init="onInit"
                    @select="onSelect">
        </SpreadSheet>
      </div>
    </template>
    <!-- table类型 -->
    <template v-else>
      <a-table :columns="columns"
               :data-source="rows"
               :loading="loading"
               :pagination="pagination"
               :row-key="(data, index) => index"
               :scroll="scroll"
               @change='handleTableChange'
               size="small">
      </a-table>
    </template>
  </div>
</template>

<script>
import { getUUID } from '../../../utils'
import SpreadSheet from '../../SpreadSheet'

export default {
  props: {
    editor: null,
    data: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'config'
    }
  },
  components: { SpreadSheet },
  data () {
    return {
      cell: {},
      // excel
      sheetConfig: {
        mode: 'read',
        showToolbar: false,
        showGrid: true,
        showContextmenu: false,
        row: {
          len: 100,
          height: 25
        },
        col: {
          len: 50,
          width: 100,
          indexWidth: 60
        }
      },
      // table
      loading: false,
      rows: [],
      columns: [],
      pagination: {
        size: 'small',
        current: 1,
        pageSize: 50,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showLessItems: true,
        showTotal (total, range) {
          return `共${total}条`
        },
        sorterParmas: {}
      },
      scroll: { x: 0, y: 0 }
    }
  },
  created () {
    this.getUUID = getUUID
    if (this.data.enable) {
      this.init()
    }
  },
  methods: {
    init () {
      if (this.editor.instance['componentPanel']) {
        this.editor.instance['componentPanel'].onSheetChange({ ci: 0, ri: 0 })
      }
    },
    onInit () {
      // 简单表格-回填维度/指标
      this.cell = this.editor.cell[this.data.key]
      if (this.editor.instance['model']) {
        this.cell.initDimensionAndMeasure(this.editor.instance['model'].modelData)
      }
    },
    onSelect (data) {
      // 更新数据模型面板配置
      if (!data.mutiple) {
        let { ci, ri } = data.dataProxy.selector
        if (this.editor.instance['componentPanel']) {
          this.editor.instance['componentPanel'].onSheetChange({ ci, ri: !ri ? ri : 1 })
        }
      }
    },
    resize () {
      if (this.type !== 'view') {
        this.$refs.sheet.xsSheet.sheet.reload()
      }
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.pagination.sorterParmas = {
        field: sorter.order ? sorter.field : undefined,
        order: sorter.order ? (sorter.order === 'ascend' ? 'ASC' : 'DESC') : undefined
      }
      this.onSearch()
    },
    onSearch () {
      let queryParams = this.editor.getQueryParams()
      new Promise((resolve, reject) => {
        let fields = this.editor.cell[this.data.key].fields
        let { field, order } = this.pagination.sorterParmas
        this.editor.searchComponent(
          this.editor.cell[this.data.key],
          {
            ...queryParams,
            indexOrders: order ? [
              { fieldId: fields[field].id, fieldType: fields[field].fieldType, type: order }
            ] : undefined
          },
          resolve,
          reject
        )
      }).then(result => {})
    }
  }
}
</script>

<style lang="less" scoped>
  .simple-table-container{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
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
    }
  }
  /deep/.ant-table-thead{
    background: #f5f5f5;
  }
</style>
