<template>
  <div ref="container" class="single-line-container">{{text}}</div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .single-line-container{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
