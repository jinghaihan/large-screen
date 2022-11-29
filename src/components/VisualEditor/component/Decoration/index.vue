<template>
  <component class="decoration"
             :is="data.component"
             v-bind="{
              color: [data.primaryColor, data.deputyColor]
             }">
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
