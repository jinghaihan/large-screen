<template>
  <a-form-model-item :prop="config.key"
                     :hasFeedback="!whitelist.includes(config.type)"
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
    <!-- 素材库 -->
    <div v-if="config.type === 'material-library'"
         class="material-library"
         @click="onLibrary">
      <!-- 无数据 -->
      <a-empty v-if="!form[config.key]"></a-empty>
      <!-- 缩略图 -->
      <img v-else :src="form[config.key]" alt="background">
      <!-- 素材库弹窗 -->
      <library-modal v-if="libraryVisible"
                     :type="config.libraryType"
                     @submit="onLibrarySubmit"
                     @close="onModalClose"></library-modal>
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
import libraryModal from './libraryModal.vue'
import { Chrome } from 'vue-color' 

export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  components: {
    libraryModal,
    ColorPicker: Chrome
  },
  data () {
    return {
      libraryVisible: false,
      colorVisible: false,
      whitelist: ['textarea', 'material-library', 'color-picker'],
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
  created () {
    this.init()
  },
  methods: {
    init () {
      // 颜色选择器
      switch (this.config.type) {
        case 'color-picker':
          this.color = this.form[this.config.key]
          break
        default:
          break
      }
    },
    getTitle () {
      return ''
    },
    onChange () {
      this.$forceUpdate()
      this.$emit('change')
    },
    onLibrary () {
      this.libraryVisible = true
    },
    onLibrarySubmit (image) {
      this.form[this.config.key] = image
      this.$emit('change')
    },
    onModalClose () {
      this.libraryVisible = false
    },
    onColorPicker (value) {
      this.$refs.colorHolder.style.background = value.hex
      this.form[this.config.key] = this.color.rgba
      this.$emit('change')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
