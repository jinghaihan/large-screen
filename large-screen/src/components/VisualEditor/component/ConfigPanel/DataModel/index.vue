<template>
  <div class="data-model-container">
    <component ref="component"
               :is="data.component"
               v-bind="{ entity, component }"
               @change="onChange">
    </component>
  </div>
</template>

<script>
import SearchDataModel from './search.vue'
import ChartDataModel from './chart/index.vue'
import TableDataModel from './table.vue'

export default {
  props: {
    entity: null,
    component: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: { SearchDataModel, ChartDataModel, TableDataModel },
  methods: {
    onChange (data) {
      this.$emit('change', data, true)
    },
    onModelChange () {
      if (this.$refs.component) {
        this.$refs.component.getModelData()
      }
    },
    onSheetChange (data) {
      if (this.$refs.component) {
        this.$refs.component.init()
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
