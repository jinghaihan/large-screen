<template>
  <div class="table-data-model-container">
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      v-bind="layout"
    >
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
                          { label: '升序', value: 'ASC' },
                          { label: '降序', value: 'DESC' }
                          ]"
                          @change="onChange">
          </a-radio-group>
        </a-form-model-item>
      </a-col>
      <!-- 数据类型 -->
      <a-col :span="24">
        <a-form-model-item ref="type"
                            prop="type"
                            label="数据类型">
          <a-select v-model="form.type"
                    placeholder="请选择数据类型"
                    :show-search="true"
                    :filter-option="filterOptions"
                    :options="typeOptions"
                    :disabled="component.type === 'simpleTable'"
                    @change="onTypeChange" >
          </a-select>
        </a-form-model-item>
      </a-col>
      <!-- 文字内容 -->
      <a-col :span="24" v-if="form.type === 'text'">
        <a-form-model-item ref="fieldData"
                            prop="fieldData"
                            label="文字内容">
          <a-input  v-model="form.fieldData"
                    placeholder="请选择文字内容"
                    @change="onChange" >
          </a-input>
        </a-form-model-item>
      </a-col>
      <!-- 数据字段 -->
      <a-col :span="24" v-if="form.type === 'field'">
        <a-form-model-item ref="fieldData"
                           prop="fieldData"
                           label="数据字段">
          <a-row :gutter="8">
            <a-col :span="form.isGroupBy === '1' && fieldDataType === 'measure' ? 10 : 20">
              <a-tree-select
                v-model="form.fieldData"
                placeholder="请选择数据字段"
                :tree-data="fieldTree"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                show-search
                :filterTreeNode='filterTreeOptions'
                tree-default-expand-all
                @change="onFieldDataChange"
              >
              </a-tree-select>
            </a-col>
            <a-col :span="10" v-if="form.isGroupBy === '1' && fieldDataType === 'measure'">
              <a-select v-model="form.aggregationType"
                        placeholder="请选择"
                        :show-search="true"
                        :filter-option="filterOptions"
                        :options="aggregationOptions"
                        @change="onChange" >
              </a-select>
            </a-col>
            <a-col :span="2">
              <a-tooltip>
                <template slot="title">点击配置指标乘除计算</template>
                <img v-show="fieldDataType === 'measure'" class="action" :src="form.calculate ? icon['calculate'] : icon['calculateUnused']" @click="onCalculate()">
              </a-tooltip>
            </a-col>
            <a-col :span="2">
              <a-tooltip>
                <template slot="title">点击配置小数点规整</template>
                <img v-show="fieldDataType === 'measure'" class="action" :src="form.point ? icon['point'] : icon['pointUnused']" @click="onPoint()">
              </a-tooltip>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-form-model>

    <CalculateModal v-if="calculateVisible" :modalData="modalData" @submit="onModalSubmit" @close="onModalClose"></CalculateModal>
    <PointModal v-if="pointVisible" :modalData="modalData" @submit="onModalSubmit" @close="onModalClose"></PointModal>
  </div>
</template>

<script>
import _ from 'lodash'
import CalculateModal from './chart/Measure/calculateModal.vue'
import PointModal from './chart/Measure/pointModal.vue'

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

const typeOptions = [
  { label: '文字', value: 'text' },
  { label: '字段', value: 'field' }
]

export default {
  props: {
    editor: null,
    component: {
      type: Object,
      required: true
    }
  },
  components: { CalculateModal, PointModal },
  data () {
    return {
      cell: {},
      modelData: {},
      dimensionMap: {},
      measureMap: {},
      form: {},
      rules: {},
      layout: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      },
      fieldOptions: [],
      typeOptions,
      aggregationOptions,
      // 图标
      icon: {
        calculate: require('@/assets/VisualEditor/icon/measure_calculate.png'),
        calculateUnused: require('@/assets/VisualEditor/icon/measure_calculate_unused.png'),
        point: require('@/assets/VisualEditor/icon/decimal_point.png'),
        pointUnused: require('@/assets/VisualEditor/icon/decimal_point_unused.png')
      },
      // 弹窗
      modalData: {},
      calculateVisible: false,
      pointVisible: false
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
  computed: {
    fieldTree () {
      let options = []
      let map = { 'dimension': '维度', 'measure': '指标' }
      this.fieldOptions.forEach(item => {
        let index = options.findIndex(option => option.value === item.type)
        if (index === -1) {
          options.push({
            label: map[item.type],
            value: item.type,
            children: [],
            isLeaf: false
          })
          index = options.length - 1
        }
        options[index].children.push({
          label: item.label,
          value: item.value + '-' + item.label,
          isLeaf: true,
          type: item.type
        })
      })
      return options
    },
    fieldDataType () {
      let type = ''
      try {
        this.fieldTree.forEach(item => {
          item.children.forEach(option => {
            if (option.value === this.form.fieldData) {
              type = item.value
              throw new Error()
            }
          })
        })
      } catch (error) {}
      return type
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.cell = this.editor.cell[this.component.key]
      this.handleForm()

      // 存在全局模型配置
      if (this.editor.instance['modelPanel']) {
        this.getModelData()
      }
      this.$forceUpdate()
    },
    handleForm () {
      this.selector = this.editor.instance['componentPanel'].sheetSelector
      // 配置回显
      let data = this.cell.configData.dataModelData ? this.cell.configData.dataModelData[this.selector.ri + '-' + this.selector.ci] : null
      if (data) {
        this.form = { ...data }
      } else {
        this.form = {
          isGroupBy: '1'
        }
      }
      // 简单表格数据类型为字段
      if (this.component.type === 'simpleTable') {
        this.form.type = 'field'
      }
    },
    getModelData () {
      this.modelData = this.editor.instance['modelPanel'].modelData
      if (this.modelData.dimensions && this.modelData.measures) {
        this.fieldOptions = []
        this.dimensionMap = {}
        this.measureMap = {}
        
        this.modelData['dimensions'].forEach(item => {
          this.fieldOptions.push({
            label: item.name,
            value: item.id,
            type: 'dimension'
          })
          this.dimensionMap[item.id] = item
        })
        this.modelData['measures'].forEach(item => {
          this.fieldOptions.push({
            label: item.name,
            value: item.id,
            type: 'measure'
          })
          this.measureMap[item.id] = item
        })
      }
    },
    onCalculate () {
      let measure = this[this.fieldDataType + 'Map'][this.form.fieldData]
      this.modalData.isGroupBy = this.form.isGroupBy
      this.modalData.measureName = measure.name
      this.modalData.calculate = _.cloneDeep(this.form.calculate)
      this.calculateVisible = true
    },
    onPoint () {
      let measure = this[this.fieldDataType + 'Map'][this.form.fieldData]
      this.modalData.isGroupBy = this.form.isGroupBy
      this.modalData.measureName = measure.name
      this.modalData.point = _.cloneDeep(this.form.point)
      this.pointVisible = true
    },
    onModalSubmit (data, type) {
      this.form[type] = data
      this.onChange()
    },
    onModalClose () {
      this.modalData = {}
      this.calculateVisible = false
      this.pointVisible = false
    },
    onGroupByChange () {
      // 不再聚合，删除指标乘除计算的聚合优先级配置
      if (this.form.isGroupBy === '0') {
        if (this.form.calculate && this.form.calculate.aggregatePriority) {
          delete this.form.calculate.aggregatePriority
        }
      }
      this.onChange()
    },
    onFieldChange () {
      if (!this.form.orderType && typeof this.form.orderType !== 'boolean') {
        this.form.orderType = 'ASC'
      }
      this.onChange()
    },
    onTypeChange (value) {
      if (value === 'text') {
        // 文字类型
        delete this.form.fieldData
        delete this.form.aggregationType
        delete this.form.calculate
        delete this.form.point
      } else {
        // 字段类型
        delete this.form.textValue
      }
      this.onChange()
    },
    onFieldDataChange (value, node) {
      // 维度类型-删除指标相关配置项
      if (this.fieldDataType === 'dimension') {
        delete this.form.aggregationType
        delete this.form.calculate
        delete this.form.point
      }

      this.onChange()
    },
    onChange () {
      this.$forceUpdate()
      let data = {}
      data[this.selector.ri + '-' + this.selector.ci] = _.cloneDeep(this.form)
      this.$emit('change', data)
    },
    filterOptions (input, option) {
      return (
        option.componentOptions.children[0].text.includes(input)
      )
    },
    filterTreeOptions (input, option) {
      let flag = false
      if (!option.data.props.isLeaf) {
        option.componentOptions.children.forEach(item => {
          if (item.data.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
            flag = true
          }
        })
      } else {
        flag = option.componentOptions.propsData.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      return flag
    }
  }
}
</script>

<style lang="less" scoped>
  .table-data-model-container{
    padding: 0 24px;
    .action{
      cursor: pointer;
      height: 24px;
      width: 24px;
    }
  }
</style>
