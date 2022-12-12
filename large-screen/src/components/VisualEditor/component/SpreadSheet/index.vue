<template>
  <div :id="sheetId" class="sheetContainer"></div>
</template>

<script>
import $ from 'jquery'
import Spreadsheet from '../lib/spreadSheet'

export default {
  props: {
    sheetId: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      xsSheet: {},
      sheetConfig: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let _this = this
      let sheetConfig = {
        view: {
          width: () => $('#' + this.sheetId).innerWidth(),
          height: () => $('#' + this.sheetId).innerHeight()
        }
      }
      sheetConfig = { ...sheetConfig, ..._this.config }
      this.xsSheet = new Spreadsheet($('#' + this.sheetId)[0], sheetConfig)
      this.xsSheet.change(function (a, b) {
        _this.onChange(a, b)
      })
      this.xsSheet.selectCell(function (dataProxy, mutiple) {
        _this.onSelect(dataProxy, mutiple)
      })
      this.$emit('init')
    },
    onChange (a, b) {
      this.$emit('change', { a, b })
    },
    onSelect (dataProxy, mutiple) {
      this.$emit('select', { dataProxy, mutiple })
    }
  }
  
}
</script>

<style scoped lang="less">
  /deep/.x-spreadsheet{
    margin-top: 0;
  }
  .sheetContainer {
    height: 100%;
    width: 100%;
  }
</style>
