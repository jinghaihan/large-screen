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
      v-model="value"
      mode="multiple"
      v-bind="{
        ...props,
        placeholder: props.placeholder || '请选择'
      }"
      style="width: 100%"
      @change="onChange"
    >
    </a-select>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    entity: null,
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
      },
      options: [],
      value: undefined
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
    observerCallback (value) {
      this.value = undefined
      this.setProps({
        disabled: !value && value !== 0,
        options: this.options.filter(opt => opt.parent === value)
      })
    },
    setProps (props) {
      this.props = {
        ...this.props,
        ...props
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
    },
    onChange () {
      this.entity.cell[this.data.key].triggerObserver(this.entity.searchObserver, this.value)
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
  /deep/.ant-select-disabled{
    color: rgba(0,0,0,.25) !important;
    .ant-select-selection{
      background: #f5f5f5 !important;
    }
  }
</style>
