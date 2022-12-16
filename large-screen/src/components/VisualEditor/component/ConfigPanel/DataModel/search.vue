<template>
  <div class="search-data-model-container">
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      v-bind="layout"
    >
      <a-row>
        <!-- tip -->
        <a-col :span="24" v-if="config.hasTip.includes(cell.type)">
          <span class="tip">提示：出于性能考虑，若您需要绑定的维度并非来自维度表，不建议选择本组件，建议您使用“输入框”或“多值输入框”组件替代。</span>
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
        <!-- 绑定维度 -->
        <a-col :span="24">
          <a-form-model-item ref="dimension"
                             prop="dimension">
            <span class="help-label" slot="label">
              绑定维度
              <TooltipIcon title="提示：选择绑定维度后将同步更改查询组件标签。"
                           class="help"
                           icon="question-circle">
              </TooltipIcon>
            </span>
            <a-select v-model="form.dimension"
                      placeholder="请选择绑定维度"
                      :show-search="true"
                      :filter-option="filterOptions"
                      @change="onDimensionChange" >
              <a-select-option v-for="option in (modelData.dimensions || [])"
                               :key="option.id"
                               :value="option.id">
                {{option.name}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- 格式 -->
        <a-col :span="24" v-if="cell.type === 'time-picker'">
          <a-form-model-item ref="format"
                             prop="format"
                             label="格式">
            <a-input v-model="form.format"
                      @change="onChange"
                      :disabled="true" >
            </a-input>
          </a-form-model-item>
        </a-col>
        <!-- 日期区间 -->
        <a-col :span="24" v-if="cell.type === 'time-picker'">
          <a-form-model-item ref="isRange"
                             prop="isRange"
                             label="日期区间">
            <a-switch v-model="form.isRange"
                      @change="onRangeChange" >
            </a-switch>
          </a-form-model-item>
        </a-col>
        <!-- 默认维度值 -->
        <a-col :span="24" v-if="form.dimension">
          <a-form-model-item ref="defaultValue"
                             prop="defaultValue"
                             label="默认维度值">
            <!-- 非时间类型 -->
            <a-input  v-if="cell.type !== 'time-picker'"
                      v-model="form.defaultValue"
                      placeholder="请输入默认维度值"
                      @change="onChange" >
            </a-input>
            <!-- 时间类型 -->
            <TimePicker v-else
                        :isRange="form.isRange"
                        :dateOption="getDateOption()"
                        @change="onTimeChange">
            </TimePicker>
          </a-form-model-item>
        </a-col>
        <!-- 关联父级维度 -->
        <a-col :span="24" v-if="config.hasParent.includes(cell.type) && parentVisible">
          <a-form-model-item ref="hasParent"
                             prop="hasParent"
                             label="关联父级维度">
            <a-radio-group v-model="form.hasParent" :options="radioOptions" @change="onChange"></a-radio-group>
          </a-form-model-item>
        </a-col>
         <!-- 父级维度 -->
        <a-col :span="24" v-if="form.hasParent && parentVisible">
          <a-form-model-item ref="parentDim"
                             prop="parentDim"
                             label="父级维度">
            <a-select v-model="form.parentDim"
                      placeholder="请选择父级维度"
                      :show-search="true"
                      :filter-option="filterOptions"
                      :options="parentDimOptions" >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- 是否必填 -->
        <a-col :span="24">
          <a-form-model-item ref="required"
                             prop="required"
                             label="是否必填">
            <a-radio-group v-model="form.required" :options="radioOptions" @change="onChange"></a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- 是否作为外链入参条件 -->
        <a-col :span="24">
          <a-form-model-item ref="isOpen"
                             prop="isOpen"
                             label="是否作为外链入参条件">
            <a-radio-group v-model="form.isOpen" :options="radioOptions" @change="onChange"></a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- 外链入参后是否锁定 -->
        <a-col :span="24" v-if="form.isOpen">
          <a-form-model-item ref="isLock"
                             prop="isLock"
                             label="外链入参后是否锁定">
            <a-radio-group v-model="form.isLock" :options="radioOptions" @change="onChange"></a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- 外链入参后是否隐藏 -->
        <a-col :span="24" v-if="form.isOpen">
          <a-form-model-item ref="isHide"
                             prop="isHide"
                             label="外链入参后是否隐藏">
            <a-radio-group v-model="form.isHide" :options="radioOptions" @change="onChange"></a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import TooltipIcon from '../../Widget/TooltipIcon'
import TimePicker from '../../Widget/TimePicker'

export default {
  props: {
    editor: null,
    component: {
      type: Object,
      required: true
    }
  },
  components: { TooltipIcon, TimePicker },
  data () {
    return {
      cell: {},
      modelData: {},
      config: {
        hasTip: ['select', 'select-multiple', 'radio', 'checkbox'],
        hasParent: ['select', 'select-multiple', 'radio', 'checkbox']
      },
      form: {},
      rules: {},
      layout: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      },
      radioOptions: [
        { label: '是', value: true },
        { label: '否', value: false }
      ],
      parentDimOptions: [],
      parentVisible: false
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
          isGroupBy: '1',
          required: false,
          isOpen: false,
          isLock: false,
          isHide: false
        }
      }
    },
    onDimensionChange () {
      let dimension = this.modelData['dimensions'].find(item => item.id === this.form.dimension)
      // 时间类型查询组件联动修改format
      if (this.cell.type === 'time-picker') {
        this.form.format = dimension.format
        this.cell.changeTimePicker({ isRange: this.form.isRange, dateOption: this.getDateOption() })
      }
      // 关联父维度
      if (this.config.hasParent.includes(this.cell.type)) {
        if (this.modelData.dimensionParents && this.modelData.dimensionParents.length) {
          this.modelData.dimensionParents.forEach(item => {
            if (item.dimensionId === this.form.dimension) {
              this.parentVisible = true
              this.form.hasParent = true
              this.form.parentDim = item.parentId
              this.parentDimOptions = [{ label: item.parentName, value: item.parentId }]
            }
          })
        }
      }
      let data = {
        ...this.cell.configData.configData,
        'vm-props-label': dimension.name
      }
      // 修改查询组件标签
      this.cell.update(data)
      this.cell.setConfigData({ configData: data })
      
      this.onChange()
    },
    onTimeChange (value) {
      this.form.defaultValue = value
      this.onChange()
    },
    getDateOption () {
      if (!this.form.format) {
        return {}
      }
      let format = this.form.format.replace(/y/g, 'Y').replace(/d/g, 'D')
      let timeSize = format.charAt(format.length - 1)
      let dayOfWeek = this.timeSize === 'w' ? (this.dayOfWeek || 0) : undefined
      let timeFormat
      if (timeSize === 'H' || timeSize === 'm' || timeSize === 's') {
        timeFormat = format.substring(format.indexOf('H'), format.length)
      }
      return {
        format,
        timeSize,
        dayOfWeek,
        timeFormat
      }
    },
    onRangeChange () {
      this.cell.changeTimePicker({ isRange: this.form.isRange, dateOption: this.getDateOption() })
      this.onChange()
    },
    onChange () {
      this.$emit('change', this.form)
    },
    getModelData () {
      this.modelData = this.editor.instance['modelPanel'].modelData
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
  .search-data-model-container{
    padding: 0 24px;
    .tip{
      display: inline-block;
      color: #f5222d;
      margin-bottom: 8px;
    }
    .help-label{
      display: flex;
      align-items: center;
      .help{
        color: #1890ff;
      }
    }
  }
</style>
