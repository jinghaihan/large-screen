<template>
  <div class="border-none-container"
       :style="{ backgroundColor }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      required: true,
      default: 'transparent'
    }
  }
}
</script>

<style lang="less" scoped>
  .border-none-container{
    height: 100%;
    width: 100%;
  }
</style>
