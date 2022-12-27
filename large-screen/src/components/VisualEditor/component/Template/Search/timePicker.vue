<template>
  <div ref="container" 
       class="search-timepicker-container"
       id="search-timepicker-container">
    <div v-if="!data.enable" class="mask"></div>
    <label v-if="props.label"
           class="label"
           :style="{ color: color.color }">
      {{props.label}}：
    </label>
    <TimePicker :props="props" v-bind="propsData"></TimePicker>
  </div>
</template>

<script>
import $ from 'jquery'
import TimePicker from '../../Widget/TimePicker'

export default {
  props: {
    editor: null,
    data: {
      type: Object,
      required: false
    }
  },
  components: { TimePicker },
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
      },
      propsData: {}
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
  #search-timepicker-container{
    --color: #bfbfbf;
  }
  .search-timepicker-container{
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
  /deep/.ant-calendar-picker{
    ::-webkit-input-placeholder {
      color: var(--color);
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
