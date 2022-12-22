<template>
  <div class="data-model-container">
    <component ref="component"
               :is="data.component"
               v-bind="{ editor, component }"
               @change="onChange"
               @dimension="onDimension">
    </component>
  </div>
</template>

<script>
import SearchDataModel from './search.vue'
import ChartDataModel from './chart/index.vue'
import TableDataModel from './table.vue'

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
    },
    onDimension () {
      this.$emit('dimension')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
