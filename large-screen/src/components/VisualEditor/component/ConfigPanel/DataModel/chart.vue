<template>
  <div class="chart-data-model-container">
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      v-bind="layout"
    >
      <a-row>
        <!-- tip -->
        <a-col :span="24">
          <span class="tip">注：若您绑定的维度，维度值过多，报表展示时默认只展示前100维度值下的数据情况。</span>
        </a-col>
        <!-- 聚合控制 -->
        <a-col :span="24">
          <a-form-model-item ref="isGroupBy"
                             prop="isGroupBy"
                             label="聚合控制">
            <a-radio-group v-model="form.isGroupBy"
                          :options="[
                            { label: '允许聚合', value: '1' },
                            { label: '不再聚合', value: '0' }
                          ]"
                          @change="onGroupByChange">
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- 维度 -->
        <a-col :span="24">
          <a-form-model-item ref="dimension"
                             prop="dimension"
                             label="维度">
            <a-select v-model="form.dimension"
                      placeholder="请选择维度"
                      :show-search="true"
                      :filter-option="filterOptions"
                      mode="multiple"
                      @change="onDimensionChange" >
              <a-select-option v-for="option in (modelData.dimensions || [])"
                               :key="option.id"
                               :value="option.id + '-' + option.name +  '-' + dimensionMap[option.id].fieldId">
                {{option.name}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- 指标 -->
        <a-col :span="24">
          <a-form-model-item>
            <div class="label" slot="label" @click="onAdd">
              指标 <a-icon class="action" type="plus-square"></a-icon>
            </div>
            <Measure ref="measure" :measureData="form.measure" :modelData="modelData" :form="form" :aggregationOptions="aggregationOptions" @change="onMeasureChange"></Measure>
          </a-form-model-item>
        </a-col>
        <!-- 默认排序 -->
        <a-col :span="24">
          <a-form-model-item ref="orderFieldId"
                             prop="orderFieldId"
                             label="默认排序">
            <a-select v-model="form.orderFieldId"
                      placeholder="请选择默认排序"
                      :show-search="true"
                      :filter-option="filterOptions"
                      allowClear
                      :options="fieldOptions"
                      @change="onFieldChange" >
            </a-select>
          </a-form-model-item>
          <!-- 默认排序 -->
          <a-form-model-item v-if="form.orderFieldId"
                             ref="orderType"
                             prop="orderType">
            <a-radio-group v-model="form.orderType"
                           :options="[
                            { label: config.circle.includes(cell.type) ? '顺时针升序' : '升序', value: 'ASC' },
                            { label: config.circle.includes(cell.type) ? '顺时针降序' : '降序', value: 'DESC' }
                           ]"
                           @change="onChange">
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import _ from 'lodash'
import Measure from './Measure'
import { getUUID } from '../../../utils'

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
    editor: null,
    component: {
      type: Object,
      required: true
    }
  },
  components: { Measure },
  data () {
    return {
      cell: {},
      modelData: {},
      dimensionMap: {},
      measureMap: {},
      config: {
        circle: ['pie', 'pie-ring', 'pie-rose', 'radar']
      },
      form: {},
      rules: {},
      layout: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      },
      aggregationOptions
    }
  },
  computed: {
    fieldOptions () {
      let options = []
      if (this.dimensionMap && this.measureMap) {
        if (this.form.dimension && this.form.dimension instanceof Array) {
          this.form.dimension.forEach(value => {
            // value: value - label - fieldId
            options.push({
              label: this.dimensionMap[value.split('-')[0]].name,
              value: value + '-' + '-dimension'
            })
          })
        }
        if (this.form.measure && this.form.measure instanceof Array) {
          this.form.measure.forEach(item => {
            let aggregation = this.aggregationOptions.find(option => option.value === item.aggregationType)
            if (aggregation) {
              let label = this.measureMap[item.measure.split('-')[0]].name + `（${aggregation.label}）`
              if (!options.find(option => option.lablel === label)) {
                // item.measure: value - label
                options.push({
                  label: label,
                  value: item.measure + '-' + item.fieldId + '-measure'
                })
              }
            }
          })
        }
      }
      return options
    }
  },
  watch: {
    component: {
      deep: true,
      handler: function (curr, prev) {
        if (curr.key) {
          prev = prev || {}
          if (curr.key !== prev.key) {
            this.init()
          }
        } else {
          this.cell = {}
          this.form = {}
          this.rules = {}
        }
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.cell = this.editor.cell[this.component.key]
      if (this.$refs.measure) {
        this.$refs.measure.data = []
      }
      this.handleForm()

      // 存在全局模型配置
      if (this.editor.instance['modelPanel']) {
        this.getModelData()
      }
      // 没有指标配置-自动添加一行
      if (!this.form.measure.length) {
        await this.$nextTick()
        this.onAdd()
      }
      this.$forceUpdate()
    },
    handleForm () {
      // 配置回显
      let data = this.cell.configData.dataModelData
      if (data) {
        this.form = { ...data }
        if (this.$refs.measure) {
          this.$refs.measure.data = data.measure
        }
      } else {
        this.form = {
          isGroupBy: '1',
          measure: []
        }
      }
    },
    onAdd () {
      this.$refs.measure.onAdd()
    },
    onGroupByChange () {
      this.onChange()
      this.$refs.measure.onGroupByChange()
    },
    onDimensionChange () {
      this.validateField()
      this.onChange()
    },
    onMeasureChange (data) {
      this.form.measure = _.cloneDeep(data)
      this.validateField()
      this.onChange()
    },
    onFieldChange () {
      if (!this.form.orderType && typeof this.form.orderType !== 'boolean') {
        this.form.orderType = 'ASC'
      }
      this.onChange()
    },
    // 校验当前选择默认排序字段，是否在枚举中
    validateField () {
      if (!this.form.orderFieldId) return
      if (!this.fieldOptions.find(item => item.value === this.form.orderFieldId)) {
        this.form.orderFieldId = undefined
        this.form.orderType = undefined
      }
    },
    onChange () {
      this.$emit('change', this.form)
    },
    getModelData () {
      this.modelData = this.editor.instance['modelPanel'].modelData
      
      if (this.modelData.dimensions && this.modelData.measures) {
        this.dimensionMap = {}
        this.measureMap = {}

        // 已选维度-回显相同uuid
        let fieldIdMap = {}
        if (this.form.dimension && this.form.dimension.length) {
          this.form.dimension.forEach(item => {
            fieldIdMap[item.split('-')[0]] = item.split('-')[2]
          })
        }
        this.modelData['dimensions'].forEach(item => {
          this.dimensionMap[item.id] = { ...item, fieldId: fieldIdMap[item.id] || getUUID() }
        })
        this.modelData['measures'].forEach(item => {
          this.measureMap[item.id] = item
        })
      }
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
  .chart-data-model-container{
    padding: 0 24px;
    .tip{
      display: inline-block;
      color: #f5222d;
      margin-bottom: 8px;
    }
    .action{
      cursor: pointer;
      color: #1890ff;
    }
  }
</style>
