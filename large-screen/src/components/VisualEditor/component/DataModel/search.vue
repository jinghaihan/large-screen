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
        <a-col :span="24" v-if="tips.includes(cell.type)">
          <span class="tip">提示：出于性能考虑，若您需要绑定的维度并非来自维度表，不建议选择本组件，建议您使用“输入框”或“多值输入框”组件替代。</span>
        </a-col>
        <!-- 绑定维度 -->
        <a-col :span="24">
          <a-form-model-item ref="dimension"
                             prop="dimension"
                             label="绑定维度">
            <a-select v-model="form.dimension"
                      placeholder="请选择绑定维度"
                      :show-search="true"
                      :filter-option="filterOptions"
                      @change="onChange" >
              <a-select-option v-for="option in (modelData.dimensions || [])"
                               :key="option.id"
                               :value="option.id">
                {{option.name}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- 默认维度值 -->
        <a-col :span="24" v-if="form.dimension">
          <a-form-model-item ref="defaultValue"
                             prop="defaultValue"
                             label="默认维度值">
            <a-input v-model="form.defaultValue"
                      placeholder="请输入默认维度值"
                      @change="onChange" >
            </a-input>
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
          <a-form-model-item ref="isOpenParam"
                             prop="isOpenParam"
                             label="是否作为外链入参条件">
            <a-radio-group v-model="form.isOpenParam" :options="radioOptions" @change="onChange"></a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- 外链入参后是否锁定 -->
        <a-col :span="24" v-if="form.isOpenParam">
          <a-form-model-item ref="lock"
                             prop="lock"
                             label="外链入参后是否锁定">
            <a-radio-group v-model="form.lock" :options="radioOptions" @change="onChange"></a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- 外链入参后是否隐藏 -->
        <a-col :span="24" v-if="form.isOpenParam">
          <a-form-model-item ref="hide"
                             prop="hide"
                             label="外链入参后是否隐藏">
            <a-radio-group v-model="form.hide" :options="radioOptions" @change="onChange"></a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>

export default {
  props: {
    editor: null,
    component: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cell: {},
      tips: ['select', 'select-multiple', 'radio', 'checkbox'],
      form: {
        required: false,
        isOpenParam: false,
        lock: false,
        hide: false
      },
      rules: {},
      layout: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      },
      modelData: {},
      radioOptions: [
        { label: '是', value: true },
        { label: '否', value: false }
      ]
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
        this.modelData = this.editor.instance['modelPanel'].modelData
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
          required: false,
          isOpenParam: false,
          lock: false,
          hide: false
        }
      }
    },
    filterOptions (input, option) {
      return (
        option.componentOptions.children[0].text.includes(input)
      )
    },
    onChange () {
      this.$emit('change', this.form, 'component')
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
  }
</style>
