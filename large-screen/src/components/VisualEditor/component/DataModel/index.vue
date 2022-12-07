<template>
  <div class="data-model-container">
    <component ref="component"
               :is="data.component"
               v-bind="{ editor, component }"
               @change="onChange">
    </component>
  </div>
</template>

<script>
import SearchDataModel from './search.vue'
import ChartDataModel from './chart.vue'

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
  components: { SearchDataModel, ChartDataModel },
  methods: {
    onChange (data) {
      this.$emit('change', data, true)
    },
    onModelChange () {
      if (this.$refs.component) {
        this.$refs.component.getModelData()
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
