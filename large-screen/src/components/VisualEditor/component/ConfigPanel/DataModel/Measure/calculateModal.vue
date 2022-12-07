<template>
  <a-modal
    :visible="true"
    @ok="onSubmit"
    @cancel="closeModal()"
    :maskClosable="false"
    :keyboard="false"
    :width="650"
  >
    <template slot="title">指标<span class="name">[{{modalData.measureName}}]</span>乘除计算</template>
    <a-row :gutter="8">
      <!-- 计算方式 -->
      <a-col :span="8">
        <a-select v-model="data.calculation"
                  placeholder="请选择计算方式"
                  :show-search="true"
                  :filter-option="filterOptions"
                  :options="calculationOptions"
                  allowClear
                  style="width: 100%;" >
        </a-select>
      </a-col>
      <!--乘数/除数 -->
      <a-col :span="8">
        <a-input-number v-model="data.number"
                        placeholder='乘数/除数'
                        allowClear
                        style="width: 100%;" />
      </a-col>
      <!-- 计算与聚合优先级 -->
      <a-col :span="8">
        <a-select v-model="data.aggregatePriority"
                  placeholder="请选择计算与聚合优先级"
                  :show-search="true"
                  :filter-option="filterOptions"
                  :options="aggregatePriorityOptions"
                  allowClear
                  style="width: 100%;" >
        </a-select>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>

const calculationOptions = [
  { label: '乘以', value: '*' },
  { label: '除以', value: '/' }
]
const aggregatePriorityOptions = [
  { label: '先聚合后计算', value: 0 },
  { label: '先计算后聚合', value: 1 }
]

export default {
  props: {
    modalData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      data: {},
      calculationOptions,
      aggregatePriorityOptions
    }
  },
  methods: {
    onSubmit () {
      let { calculation, number, aggregatePriority } = this.data
      let and = calculation && (number || number === 0) && (this.modalData.isGroupBy === '1' ? aggregatePriority || aggregatePriority === 0 : true)
      let or = calculation || (number || number === 0) || (this.modalData.isGroupBy === '1' ? aggregatePriority || aggregatePriority === 0 : false)

      if (or && !and) {
        this.$notification.error({ message: '错误', description: '乘除计算配置项未完整填充，请检查' })
        return false
      }

      if (calculation && (number || number === 0) && (this.modalData.isGroupBy === '1' ? aggregatePriority || 0 : true)) {
        // 校验数字
        if (!Number.isInteger(+number)) {
          if (number.toString().split('.')[1].length > 4) {
            this.$notification.error({ message: '错误', description: '请输入小数点后4位' })
            return false
          }
        }
        if (number === 0 && calculation === '/') {
          this.$notification.error({ message: '错误', description: '乘除计算配置项不能除以0' })
          return false
        }
      }

      this.$emit('submit', this.data, 'calculate')
      this.$emit('close')
    },
    closeModal () {
      this.$emit('close')
    },
    filterOptions (input, option) {
      return (
        option.componentOptions.children[0].text.includes(input)
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .name{
    color: #1890ff;
  }
</style>
