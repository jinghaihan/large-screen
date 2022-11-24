<template>
  <div ref="container"
       class="single-line-container"
       :style="style">
    {{text}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '文本内容',
      style: {
        fontSize: '14px',
        color: '#333'
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
