<template>
  <div ref="container"
       class="search-input-container"
       id="search-input-container">
    <div v-if="!data.enable" class="mask"></div>
    <label v-if="props.label"
           class="label"
           :style="{ color: color.color }">
      {{props.label}}：
    </label>
    <a-input class="input"
      v-bind="{
      ...props,
      placeholder: props.placeholder || '请输入'
    }"></a-input>
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
        $(this.$refs.container).find('.ant-input').css({
          color, backgroundColor, borderColor
        })
        this.$refs.container.style.setProperty('--color', placeholderColor)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #search-input-container{
    --color: #bfbfbf;
  }
  .search-input-container{
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
  ::-webkit-input-placeholder {
    color: var(--color);
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
