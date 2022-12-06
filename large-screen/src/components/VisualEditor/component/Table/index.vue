<template>
  <component class="component"
             :is="data.type"
             :data="data">
</component>
</template>

<script>
import ConditionPanel from './conditionPanel.vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    ConditionPanel
  }
}
</script>

<style lang="less" scoped>

</style>
