<template>
  <div class="data-model-container">
    <component :is="data.component"
               v-bind="{ editor, component }"
               @change="onChange">
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
  components: { SearchDataModel },
  methods: {
    onChange (data) {
      this.$emit('change', data, true)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
