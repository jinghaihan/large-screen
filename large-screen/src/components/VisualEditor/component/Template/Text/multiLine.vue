<template>
  <div class="multi-line-container" :style="style">{{text}}</div>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      style: {
        color: '',
        fontSize: '',
        fontWeight: '',
        textAlign: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .multi-line-container{
    height: 100%;
    width: 100%;
    white-space: pre-wrap;
    word-break: break-all;
    overflow: hidden;
  }
</style>
