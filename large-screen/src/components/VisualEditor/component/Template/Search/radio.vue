<template>
  <div ref="container"
       class="search-radio-container"
       id="search-radio-container">
    <div v-if="!data.enable" class="mask"></div>
    <label v-if="props.label"
           class="label"
           :style="{ color: color.color }">
      {{props.label}}：
    </label>
    <a-radio-group :value="value">
      <a-radio v-for="opt in props.options" :key="opt.value" :value="opt.value" @click="onClick">{{opt.label}}</a-radio>
    </a-radio-group>
  </div>
</template>

<script>
import $ from 'jquery'

const options = [
  { label: 'A', value: 'A' }
]

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
        label: '',
        options
      },
      color: {
        color: '',
        backgroundColor: '',
        borderColor: '',
        checkedColor: ''
      },
      options: [],
      value: 'A'
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
        const { color, backgroundColor, borderColor, checkedColor } = this.color
        $(this.$refs.container).find('.ant-radio-wrapper').css({
          color
        })
        $(this.$refs.container).find('.ant-radio-inner').css({
          backgroundColor, borderColor
        })
        this.$refs.container.style.setProperty('--color', checkedColor)
      }
    },
    onClick (e) {
      this.value = e.target.value
      
      this.entity.cell[this.data.key].triggerObserver(this.entity.searchObserver, this.value)
    }
  }
}
</script>

<style lang="less" scoped>
  #search-radio-container{
    --color: #1890ff;
  }
  .search-radio-container{
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
  /deep/.ant-radio-inner::after{
    background-color: var(--color);
  }
  .mask{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 2;
  }
  /deep/.ant-radio-disabled{
    .ant-radio-inner{
      background-color: #f5f5f5 !important;
    }
  }
</style>
