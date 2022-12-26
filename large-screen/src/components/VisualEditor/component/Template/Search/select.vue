<template>
  <div ref="container" 
       class="search-select-container"
       id="search-select-container">
    <div v-if="!data.enable" class="mask"></div>
    <label v-if="props.label"
           class="label"
           :style="{ color: color.color }">
      {{props.label}}：
    </label>
    <a-select
      class="select"
      v-bind="{
        ...props,
        placeholder: props.placeholder || '请选择'
      }"
      style="width: 100%"
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
    setOptions (options) {
      this.props = {
        ...this.props,
        options
      }
    },
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
  .search-select-container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .label{
      flex-shrink: 0;
    }
  }
  .mask{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 1;
  }
</style>
