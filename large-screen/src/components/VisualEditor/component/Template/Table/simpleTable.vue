<template>
  <div class="simple-table-container">
    <div v-if="!data.enable" class="holder"> 简单表格 </div>
    <div v-else class="content">
      <SpreadSheet ref="sheet"
                   :sheetId="data.key"
                   :config="sheetConfig"
                   @update="onUpdate"
                   @change="onChange"
                   @select="onSelect">
      </SpreadSheet>
    </div>
  </div>
</template>

<script>
import SpreadSheet from '../../SpreadSheet'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: { SpreadSheet },
  data () {
    return {
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
  methods: {
    onUpdate (data) {
      console.log('onUpdate', data)
    },
    onChange (data) {
      console.log('onChange', data)
    },
    onSelect (data) {
      console.log('onSelect', data)
    },
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
