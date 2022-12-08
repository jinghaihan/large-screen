<template>
  <div class="measure-config-container">
    <a-row :gutter="8" v-for="(item, index) in data" :key="item.fieldId">
      <!-- 指标枚举 -->
      <a-col :span="9">
        <a-select v-model="data[index].measure"
                  placeholder="请选择指标"
                  :show-search="true"
                  :filter-option="filterOptions"
                  @change="onChange" >
          <a-select-option v-for="option in (modelData.measures || [])"
                            :key="option.id"
                            :value="option.id + '-' + option.name">
            {{option.name}}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="9">
        <a-select v-model="data[index].aggregationType"
                  placeholder="请选择"
                  :show-search="true"
                  :filter-option="filterOptions"
                  :options="aggregationOptions"
                  @change="onChange" >
        </a-select>
      </a-col>
      <!-- 指标乘除计算 -->
      <a-col :span="2">
        <a-tooltip>
          <template slot="title">点击配置指标乘除计算</template>
          <img v-show="data[index].measure" class="action" :src="data[index].calculate ? icon['calculate'] : icon['calculateUnused']" @click="onCalculate(item)">
        </a-tooltip>
      </a-col>
      <!-- 小数点规整 -->
      <a-col :span="2">
        <a-tooltip>
          <template slot="title">点击配置小数点规整</template>
          <img v-show="data[index].measure" class="action" :src="data[index].point ? icon['point'] : icon['pointUnused']" @click="onPoint(item)">
        </a-tooltip>
      </a-col>
      <!-- 删除按钮 -->
      <a-col :span="2">
        <TooltipIcon title="删除"
                     icon="close"
                     @click="onDelete(item)">
        </TooltipIcon>
      </a-col>
    </a-row>

    <CalculateModal v-if="calculateVisible" :modalData="modalData" @submit="onModalSubmit" @close="onModalClose"></CalculateModal>
    <PointModal v-if="pointVisible" :modalData="modalData" @submit="onModalSubmit" @close="onModalClose"></PointModal>
  </div>
</template>

<script>
import _ from 'lodash'
import { getUUID } from '../../../../utils'
import TooltipIcon from '../../../Widget/TooltipIcon'
import CalculateModal from './calculateModal.vue'
import PointModal from './pointModal.vue'

export default {
  props: {
    modelData: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    measureData: {
      type: Array,
      required: true
    },
    aggregationOptions: {
      type: Array,
      required: true
    }
  },
  components: { TooltipIcon, CalculateModal, PointModal },
  data () {
    return {
      data: _.cloneDeep(this.measureData),
      icon: {
        calculate: require('@/assets/VisualEditor/icon/measure_calculate.png'),
        calculateUnused: require('@/assets/VisualEditor/icon/measure_calculate_unused.png'),
        point: require('@/assets/VisualEditor/icon/decimal_point.png'),
        pointUnused: require('@/assets/VisualEditor/icon/decimal_point_unused.png')
      },
      modalData: {},
      calculateVisible: false,
      pointVisible: false
    }
  },
  methods: {
    onAdd () {
      this.data.push({
        fieldId: getUUID()
      })
      this.onChange()
    },
    onDelete (data) {
      this.data = this.data.filter(item => item.fieldId !== data.fieldId)
      this.onChange()
    },
    onChange () {
      if (this.validate()) {
        this.$emit('change', this.data)
      }
    },
    // 校验指标 + 聚合方式是否存在完全相同
    validate () {
      let arr = []
      this.data.forEach(item => {
        if (item.measure && item.aggregationType) {
          arr.push(item.measure + '-' + item.aggregationType)
        }
      })
      if (arr.length !== [...new Set(arr)].length) {
        this.$notification.error({ message: '错误', description: '存在指标与聚合方式相同配置，请检查' })
        return false
      }
      return true
    },
    onGroupByChange () {
      // 不再聚合，删除指标乘除计算的聚合优先级配置
      if (this.form.isGroupBy === '0') {
        this.data.forEach(item => {
          if (item.calculate && item.calculate.aggregatePriority) {
            delete item.calculate.aggregatePriority
          }
        })
      }
      this.onChange()
    },
    onCalculate (data) {
      this.modalData = _.cloneDeep(data)
      let id = data.measure.split('-')[0]
      this.modalData.measureName = this.modelData['measures'].find(item => item.id === id).name
      this.modalData.isGroupBy = this.form.isGroupBy
      this.calculateVisible = true
    },
    onPoint (data) {
      this.modalData = _.cloneDeep(data)
      let id = data.measure.split('-')[0]
      this.modalData.measureName = this.modelData['measures'].filter(item => item.id === id).name
      this.modalData.isGroupBy = this.form.isGroupBy
      this.pointVisible = true
    },
    onModalSubmit (data, type) {
      let value = this.data.find(item => item.id === this.modalData.id)
      value[type] = data
      this.onChange()
    },
    onModalClose () {
      this.modalData = {}
      this.calculateVisible = false
      this.pointVisible = false
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
  .measure-config-container{
    overflow-x: hidden;
    .action{
      cursor: pointer;
      height: 24px;
      width: 24px;
    }
  }
</style>
