<template>
  <a-form-model-item :ref="config.key"
                     :prop="config.key"
                     :title="getTitle(form[config.key], config)"
                     :label="config.label">
    <!-- 输入框 -->
    <a-input v-if="config.type === 'input'"
              v-model="form[config.key]"
              v-bind="config.props"
              @change="onChange" />
    <!-- 文本框 -->
    <Textarea v-if="config.type === 'textarea'"
              :config="config"
              :form="form"
              @change="onChange">
    </Textarea>
    <!-- 数字输入框 -->
    <a-input-number v-if="config.type === 'input-number'"
                    v-model="form[config.key]"
                    v-bind="config.props"
                    style="width: 100%"
                    @change="onChange" />
    <!-- 下拉框 -->
    <a-select v-if="config.type === 'select'"
              v-model="form[config.key]"
              v-bind="config.props"
              :show-search="true"
              :filter-option="filterOptions"
              @change="onChange" >
    </a-select>
    <!-- 级联下拉框-TODO -->
    <!-- 多选框-TODO -->
    <!-- 单选框-TODO -->
    <!-- 日期选择框-TODO -->
    <!-- 时间选择器-TODO -->
    <!-- 开关 -->
    <a-switch v-if="config.type === 'switch'"
              v-model="form[config.key]"
              v-bind="config.props"
              @change="onChange" >
    </a-switch>
    <!-- 评分 -->
    <!-- 颜色选择器 -->
    <ColorPicker v-if="config.type === 'color-picker'"
                 :config="config"
                 :form="form"
                 :color="form[config.key]">
    </ColorPicker>
    <!-- 素材库 -->
    <MaterialLibrary v-if="config.type === 'material-library'"
                     :config="config"
                     :form="form">
    </MaterialLibrary>
  </a-form-model-item>
</template>

<script>
import Textarea from './widget/textarea.vue'
import ColorPicker from './widget/colorPicker.vue'
import MaterialLibrary from './widget/MaterialLibrary'

export default {
  props: {
    config: {
      type: Array,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  components: { Textarea, ColorPicker, MaterialLibrary },
  data () {
    return {}
  },
  methods: {
    onChange () {
      if (this.config.callback && this.config.callback.change) {
        this.config.callback.change(this.form, this.configData)
      }
    },
    getTitle () {
      return ''
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
  /deep/.ant-form-item-label{
    >label{
      font-size: 13px;
    }
  }
</style>
