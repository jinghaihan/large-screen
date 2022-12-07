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
                          @change="onChange">
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
                      @change="onChange" >
              <a-select-option v-for="option in (modelData.dimensions || [])"
                               :key="option.id"
                               :value="option.id">
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
            <Measure ref="measure" :modelData="modelData" :form="form"></Measure>
          </a-form-model-item>
        </a-col>
        <!-- 默认排序 -->
        <a-col :span="24">
          <a-form-model-item ref="fieldId"
                             prop="fieldId"
                             label="默认排序">
            <a-select v-model="form.fieldId"
                      placeholder="请选择默认排序"
                      :show-search="true"
                      :filter-option="filterOptions"
                      allowClear
                      @change="onChange" >
            </a-select>
          </a-form-model-item>
          <!-- 默认排序 -->
          <a-form-model-item v-if="form.fieldId"
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
import Measure from './Measure'

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
      config: {
        circle: ['pie', 'pie-ring', 'pie-rose', 'radar']
      },
      form: {},
      rules: {},
      layout: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      }
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
    init () {
      this.cell = this.editor.cell[this.component.key]
      this.handleForm()

      // 存在全局模型配置
      if (this.editor.instance['modelPanel']) {
        this.getModelData()
      }
      this.$forceUpdate()
    },
    handleForm () {
      // 配置回显
      let data = this.cell.configData.dataModelData
      if (data) {
        this.form = { ...data }
      } else {
        this.form = {
          isGroupBy: '1'
        }
      }
    },
    filterOptions (input, option) {
      return (
        option.componentOptions.children[0].text.includes(input)
      )
    },
    onChange () {
      this.$emit('change', this.form)
    },
    getModelData () {
      this.modelData = this.editor.instance['modelPanel'].modelData
    },
    onAdd () {
      this.$refs.measure.onAdd()
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
