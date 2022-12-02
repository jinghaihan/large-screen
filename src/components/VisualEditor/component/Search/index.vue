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
import Select from './select.vue'
import SelectMultiple from './selectMultiple.vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: { Panel, Input, InputMultiple, Select, SelectMultiple }
}
</script>

<style lang="less" scoped>

</style>
