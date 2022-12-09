<template>
  <div class="simple-table-container">
    <div v-if="!data.enable" class="holder"> 简单表格 </div>
    <div v-else class="content">
      <Spread ref="sheet" :sheetId="data.key" :config="sheetConfig"></Spread>
    </div>
  </div>
</template>

<script>
import Spread from '../../Spread'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: { Spread },
  data () {
    return {
      sheetConfig: {
        row: {
          height: 25
        },
        col: {
          len: 50,
          width: 100,
          indexWidth: 60,
          minWidth: 60
        }
      }
    }
  },
  methods: {
    resize () {
      this.$refs.sheet.xsSheet.sheet.reload()
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
</style>
