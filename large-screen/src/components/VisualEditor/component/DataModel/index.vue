<template>
  <div class="data-model-container">
    <component :is="data.component"
               v-bind="{ editor, component }">
    </component>
  </div>
</template>

<script>
import SearchDataModel from './search.vue'

export default {
  props: {
    editor: null,
    component: {
      type: Object,
      required: true
    },
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
