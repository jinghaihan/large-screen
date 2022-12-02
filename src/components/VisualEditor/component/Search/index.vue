<template>
  <component class="component"
             :is="data.type"
             :data="data">
</component>
</template>

<script>
import Panel from './panel.vue'
import Input from './input.vue'
import InputMultiple from './inputMultiple.vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: { Panel, Input, InputMultiple }
}
</script>

<style lang="less" scoped>

</style>
