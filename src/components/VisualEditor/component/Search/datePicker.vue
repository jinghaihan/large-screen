<template>
  <div ref="container" 
       class="search-datepicker-container"
       id="search-datepicker-container">
    <div v-if="!data.enable" class="mask"></div>
    <label v-if="props.label"
           class="label"
           :style="{ color: color.color }">
      {{props.label}}：
    </label>
    <a-date-picker
      class="datepicker"
      v-bind="{ ...props }"
      style="width: 100%"/>
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
        $(this.$refs.container).find('.ant-calendar-picker-input').css({
          color, backgroundColor, borderColor
        })
        this.$refs.container.style.setProperty('--color', placeholderColor)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #search-datepicker-container{
    --color: #bfbfbf;
  }
  .search-datepicker-container{
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
