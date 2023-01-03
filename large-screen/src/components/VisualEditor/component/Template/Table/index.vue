<template>
  <component class="component"
             :is="data.type"
             :entity="entity"
             :data="data">
</component>
</template>

<script>
import SimpleTable from './simpleTable.vue'
import ComplexTable from './complexTable.vue'

export default {
  props: {
    entity: null,
    data: {
      type: Object,
      required: true
    }
  },
  components: { SimpleTable, ComplexTable }
}
</script>

<style lang="less" scoped>

</style>
