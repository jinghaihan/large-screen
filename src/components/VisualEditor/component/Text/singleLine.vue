<template>
  <div class="single-line-container" :style="style">{{text}}</div>
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
  .single-line-container{
    height: 100%;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
