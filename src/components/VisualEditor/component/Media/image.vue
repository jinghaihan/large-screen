<template>
  <div class="image-container">
    <img class="image" v-if="src" :src="src" alt="image">
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .image-container,
  .image{
    height: 100%;
    width: 100%;
  }
</style>
