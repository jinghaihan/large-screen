<template>
  <div class="data-model-container">
    <component :is="data.component"></component>
  </div>
</template>

<script>
import SearchDataModel from './search.vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: { SearchDataModel }
}
</script>

<style lang="less" scoped>

</style>
