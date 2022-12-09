<template>
  <a-modal
    :visible="true"
    @ok="onSubmit"
    @cancel="closeModal()"
    :maskClosable="false"
    :keyboard="false"
    :width="600"
  >
    <template slot="title">指标<span class="name">[{{modalData.measureName}}]</span>小数点规整</template>
    <a-row :gutter="8">
      <!-- 保留小数 -->
      <a-col :span="14">
        <!-- 保留小数 -->
        <div class="container">
          <div class="text">保留</div>
          <a-input-number v-model="data.decimalPlace"
                          allowClear
                          style="width: 80%;" />
          <div class="text">位小数</div>
        </div>
      </a-col>
      <!-- 保留方式 -->
      <a-col :span="10">
        <a-select v-model="data.truncType"
                  placeholder="请选择保留方式"
                  :show-search="true"
                  :filter-option="filterOptions"
                  :options="truncTypeOptions"
                  allowClear
                  style="width: 100%;" >
        </a-select>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>

const truncTypeOptions = [
  { label: '四舍五入', value: '0' },
  { label: '截取', value: '1' }
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
      truncTypeOptions
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.modalData.point) {
        this.data = { ...this.modalData.point }
      }
    },
    onSubmit () {
      let { decimalPlace, truncType } = this.data
      let and = decimalPlace && truncType
      let or = decimalPlace || truncType

      if (or && !and) {
        this.$notification.error({ message: '错误', description: '请您先完善小数点规整配置' })
        return false
      }

      if ((decimalPlace || decimalPlace === 0) && truncType) {
        // 校验数字
        if (Number.isInteger(+decimalPlace)) {
          if (decimalPlace < 0 || decimalPlace > 4) {
            this.$notification.error({ message: '错误', description: '请输入[0,4]范围内整数' })
            return false
          }
        } else {
          this.$notification.error({ message: '错误', description: '请输入整数' })
          return false
        }
      }

      this.$emit('submit', this.data, 'point')
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
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
    .text{
      flex-shrink: 0;
      margin: 0 8px;
    }
  }
</style>
