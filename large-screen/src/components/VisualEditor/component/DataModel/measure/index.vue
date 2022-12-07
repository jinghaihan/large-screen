<template>
  <div class="measure-config-container">
    <a-row :gutter="8" v-for="(item, index) in data" :key="item.id">
      <!-- 指标枚举 -->
      <a-col :span="9">
        <a-select v-model="data[index].measure"
                  placeholder="请选择指标"
                  :show-search="true"
                  :filter-option="filterOptions"
                  @change="onChange" >
          <a-select-option v-for="option in (modelData.measures || [])"
                            :key="option.id"
                            :value="option.id">
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
          <img v-show="data[index].measure" class="action" :src="icon['mduCalc']" @click="onMduCalc(item)">
        </a-tooltip>
      </a-col>
      <!-- 小数点规整 -->
      <a-col :span="2">
        <a-tooltip>
          <template slot="title">点击配置小数点规整</template>
          <img v-show="data[index].measure" class="action" :src="icon['dimPoint']" @click="onDimPoint(item)">
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

    <MduCalcModal v-if="mduVisible" :modalData="modalData" @close="onModalClose"></MduCalcModal>
  </div>
</template>

<script>
import _ from 'lodash'
import { getUUID } from '../../../utils/index'
import TooltipIcon from '../../TooltipIcon'
import MduCalcModal from './mduCalcModal.vue'

const aggregationOptions = [
  {
    label: '总和',
    value: 'SUM'
  },
  {
    label: '最大值',
    value: 'MAX'
  },
  {
    label: '最小值',
    value: 'MIN'
  },
  {
    label: '平均值',
    value: 'AVG'
  },
  {
    label: '数量',
    value: 'COUNT'
  },
  {
    label: '数量(去重)',
    value: 'COUNT_DISTINCT'
  }
]

export default {
  props: {
    modelData: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  components: { TooltipIcon, MduCalcModal },
  data () {
    return {
      data: [],
      aggregationOptions,
      icon: {
        mduCalc: require('@/assets/VisualEditor/icon/mduCalc.png'),
        mduCalcDisabled: require('@/assets/VisualEditor/icon/mduCalc_disabled.png'),
        dimPoint: require('@/assets/VisualEditor/icon/dimPoint.png'),
        dimPointDisabled: require('@/assets/VisualEditor/icon/dimPoint_disabled.png')
      },
      modalData: {},
      mduVisible: false,
      dimVisible: false
    }
  },
  methods: {
    onAdd () {
      this.data.push({
        id: getUUID(),
        aggregationType: 'SUM'
      })
    },
    onDelete (data) {
      this.data = this.data.filter(item => item.id !== data.id)
    },
    onChange () {

    },
    filterOptions (input, option) {
      return (
        option.componentOptions.children[0].text.includes(input)
      )
    },
    onMduCalc (data) {
      this.modalData = _.cloneDeep(data)
      this.modalData.measureName = this.modelData['measures'].filter(item => item.id === data.measure)[0].name
      this.modalData.isGroupBy = this.form.isGroupBy
      this.mduVisible = true
    },
    onDimPoint (data) {
      this.modalData = _.cloneDeep(data)
      this.modalData.measureName = this.modelData['measures'].filter(item => item.id === data.measure)[0].name
      this.modalData.isGroupBy = this.form.isGroupBy
      this.dimVisible = true
    },
    onModalClose () {
      this.modelData = {}
      this.mduVisible = false
      this.dimVisible = false
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
