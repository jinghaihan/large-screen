<template>
  <div class="complex-table-container">
    <div v-if="!data.enable" class="holder"> 复杂表格 </div>
    <div v-else class="content">
      <SpreadSheet ref="sheet"
                   :sheetId="data.key + '-' + getUUID()"
                   :config="sheetConfig"
                   @init="onInit"
                   @change="onChange"
                   @select="onSelect">
      </SpreadSheet>
    </div>
  </div>
</template>

<script>
import { getUUID } from '../../../utils'
import SpreadSheet from '../../SpreadSheet'

export default {
  props: {
    entity: null,
    data: {
      type: Object,
      required: true
    }
  },
  components: { SpreadSheet },
  data () {
    return {
      cell: {},
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
      }
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
      if (this.entity.instance['componentPanel']) {
        this.entity.instance['componentPanel'].onSheetChange({ ci: 0, ri: 0 })
      }
    },
    onInit () {
      
    },
    onChange (data) {
      // console.log('onChange', data)
    },
    onSelect (data) {
      // 更新数据模型面板配置
      if (!data.mutiple) {
        let { ci, ri } = data.dataProxy.selector
        if (this.entity.instance['componentPanel']) {
          this.entity.instance['componentPanel'].onSheetChange({ ci, ri })
        }
      }
    },
    resize () {
      this.$refs.sheet.xsSheet.sheet.reload()
    }
  }
}
</script>

<style lang="less" scoped>
  .complex-table-container{
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
</style>
