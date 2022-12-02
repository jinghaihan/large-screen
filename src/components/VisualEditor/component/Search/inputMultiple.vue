<template>
  <div ref="container" 
       class="search-input-multiple-container"
       id="search-input-multiple-container">
    <label v-if="props.label"
           class="label"
           :style="{ color: color.color }">
      {{props.label}}：
    </label>
    <a-select
      class="select"
      mode="tags"
      v-bind="{
        ...props,
        placeholder: props.placeholder || '请输入'
      }"
      style="width: 100%"
      :getPopupContainer="triggerNode => {
        return triggerNode.parentNode || document.body;
      }"
    >
    </a-select>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      props: {
        size: 'default',
        placeholder: '',
        label: ''
      },
      color: {
        color: '',
        backgroundColor: '',
        borderColor: '',
        placeholderColor: ''
      }
    }
  },
  watch: {
    color: {
      deep: true,
      immediate: true,
      handler: function (value) {
        this.handleColor()
      }
    }
  },
  methods: {
    handleColor () {
      if (this.$refs.container) {
        const { color, backgroundColor, borderColor, placeholderColor } = this.color
        $(this.$refs.container).find('.ant-select').css({
          color 
        })
        $(this.$refs.container).find('.ant-select-selection').css({
          backgroundColor, borderColor
        })
        $(this.$refs.container).find('.ant-select-selection__placeholder').css({
          color: placeholderColor
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-input-multiple-container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .label{
      flex-shrink: 0;
    }
  }
</style>
