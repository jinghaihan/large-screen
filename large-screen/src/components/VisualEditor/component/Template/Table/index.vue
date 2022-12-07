<template>
  <component class="component"
             :is="data.type"
             :data="data">
</component>
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

</style>
