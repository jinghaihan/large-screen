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
    <a-textarea v-if="config.type === 'textarea'"
              v-model="form[config.key]"
              v-bind="config.props"
              :class="config.maxLength ? 'marker-textarea' : ''"
              @change="onChange" />
    <!-- textarea角标 -->
    <span v-if="config.type === 'textarea' && config.maxLength" class="marker">
      {{form[config.key] ? form[config.key].length : 0}}/{{config.maxLength}}
    </span>
    <!-- 数字输入框 -->
    <a-input-number v-if="config.type === 'input-number'"
                    v-model="form[config.key]"
                    v-bind="config.props"
                    style="width: 100%"
                    @change="onChange" />
    <!-- 开关 -->
    <a-switch v-if="config.type === 'switch'"
              v-model="form[config.key]"
              v-bind="config.props"
              @change="onChange" >
    </a-switch>
    <!-- 下拉框 -->
    <a-select v-if="config.type === 'select'"
              v-model="form[config.key]"
              :show-search="true"
              :filter-option="filterOptions"
              v-bind="config.props"
              @change="onChange" >
    </a-select>
    <!-- 素材库 -->
    <div v-if="config.type === 'material-library'"
         class="material-library" >
      <Library :form="form" :config="config"></Library>
    </div>
    <!-- 颜色选择器 -->
    <div v-if="config.type === 'color-picker'"
         class="color-picker">
      <a-dropdown @visibleChange="onColorPicker">
        <div ref="colorHolder" class="color-placeholder"></div>
        <template slot="overlay">
          <ColorPicker v-model="color"></ColorPicker>
        </template>
      </a-dropdown>
    </div>
  </a-form-model-item>
</template>

<script>
import { Chrome } from 'vue-color'
import Library from './component/library.vue'

export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    configData: {
      type: Array,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  components: {
    ColorPicker: Chrome,
    Library
  },
  data () {
    return {
      colorVisible: false,
      // 颜色选择器
      color: {}
    }
  },
  watch: {
    color: {
      immediate: true,
      deep: true,
      handler: function (value) {
        if (this.$refs.colorHolder) {
          this.onColorPicker(value)
        }
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 颜色选择器
      switch (this.config.type) {
        case 'color-picker':
          this.color = this.form[this.config.key]
          this.$refs.colorHolder.style.background = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
          break
        default:
          break
      }
    },
    onChange () {
      if (this.config.callback && this.config.callback.change) {
        this.config.callback.change(this.form, this.configData)
      }
    },
    getTitle () {
      return ''
    },
    onColorPicker (value) {
      this.$refs.colorHolder.style.background = value.hex
      this.form[this.config.key] = this.color
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

</style>
