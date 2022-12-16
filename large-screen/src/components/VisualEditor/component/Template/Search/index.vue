<template>
  <component class="component"
             :is="data.type"
             :data="data">
</component>
</template>

<script>
import SearchPanel from './searchPanel.vue'
import ConditionPanel from './conditionPanel.vue'
import Input from './input.vue'
import InputMultiple from './inputMultiple.vue'
import Select from './select.vue'
import SelectMultiple from './selectMultiple.vue'
import Radio from './radio.vue'
import Checkbox from './checkbox.vue'
import TimePicker from './timePicker.vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    SearchPanel,
    ConditionPanel,
    Input,
    InputMultiple,
    Select,
    SelectMultiple,
    Radio,
    Checkbox,
    TimePicker
  }
}
</script>

<style lang="less" scoped>

</style>
