<template>
  <div class="search-input-container">
    <a-input placeholder="请输入" v-bind="props"></a-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      props: {
        size: 'default'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-input-container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
