<template>
  <a-form-model-item :prop="config.key"
                     :hasFeedback="config.type !== 'textarea'"
                     :title="getTitle(form[config.key], config)"
                     :label="config.label">
    <!-- 输入框 -->
    <a-input v-if="config.type === 'input'"
              :placeholder="config.placeholder || '请输入' + config.label"
              v-model="form[config.key]"
              :disabled="config.disabled || false"
              :suffix="config.suffix || ''"
              @change="onChange" />
    <!-- 文本框 -->
    <a-textarea v-if="config.type === 'textarea'"
              :placeholder="config.placeholder || '请输入' + config.label"
              v-model="form[config.key]"
              :disabled="config.disabled || false"
              :auto-size="{ minRows: 3}"
              :maxLength="config.maxLength || Infinity"
              :class="config.maxLength ? 'marker-textarea' : ''"
              @change="onChange" />
    <!-- textarea角标 -->
    <span v-if="config.type === 'textarea' && config.maxLength" class="marker">
      {{form[config.key] ? form[config.key].length : 0}}/{{config.maxLength}}
    </span>
    <!-- 数字输入框 -->
    <a-input-number v-if="config.type === 'input-number'"
                    :placeholder="config.placeholder || '请输入' + config.label"
                    v-model="form[config.key]"
                    :disabled="config.disabled || false"
                    :min="config.min || -Infinity"
                    :max="config.max || Infinity"
                    style="width: 100%"
                    @change="onChange" />
    <!-- 素材库 -->
    <div v-if="config.type === 'material-library'"
         class="material-library">
      <a-empty v-if="!form[config.key]"></a-empty>
    </div>
  </a-form-model-item>
</template>

<script>
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
  methods: {
    getTitle () {
      return ''
    },
    onChange () {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
