<template>
  <div class="complex-table-container">
    <div v-if="!data.enable" class="holder"> 复杂表格 </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
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
  }
</style>
