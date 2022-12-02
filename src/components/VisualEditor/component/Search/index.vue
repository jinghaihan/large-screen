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
import Radio from './radio.vue'
import Checkbox from './checkbox.vue'
import DatePicker from './datePicker.vue'
import RangePicker from './rangePicker.vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    Panel,
    Input,
    InputMultiple,
    Select,
    SelectMultiple,
    Radio,
    Checkbox,
    DatePicker,
    RangePicker
  }
}
</script>

<style lang="less" scoped>

</style>
