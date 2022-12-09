<template>
  <component class="component"
             :is="data.type"
             :data="data">
</component>
</template>

<script>
import SimpleTable from './simpleTable.vue'
import ComplexTable from './complexTable.vue'

export default {
  props: {
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
