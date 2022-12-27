<template>
  <div ref="container"
       class="search-checkbox-container"
       id="search-checkbox-container">
    <div v-if="!data.enable" class="mask"></div>
    <label v-if="props.label"
           class="label"
           :style="{ color: color.color }">
      {{props.label}}：
    </label>
    <a-checkbox-group :value="value">
      <a-checkbox v-for="opt in props.options" :key="opt.value" :value="opt.value" @click="onClick">{{opt.label}}</a-checkbox>
    </a-checkbox-group>
  </div>
</template>

<script>
import $ from 'jquery'

const options = [
  { label: 'A', value: 'A' }
]

export default {
  props: {
    editor: null,
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
        checkedBorderColor: '',
        checkedBackgroundColor: ''
      },
      options: [],
      value: []
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
        const { color, backgroundColor, borderColor, checkedBorderColor, checkedBackgroundColor } = this.color
        $(this.$refs.container).find('.ant-checkbox-wrapper').css({
          color
        })
        $(this.$refs.container).find('.ant-checkbox-inner').css({
          backgroundColor, borderColor
        })
        this.$refs.container.style.setProperty('--borderColor', checkedBorderColor)
        this.$refs.container.style.setProperty('--backgroundColor', checkedBackgroundColor)
      }
    },
    onClick (e) {
      if (!this.value.includes(e.target.value)) {
        this.value.push(e.target.value)
      } else {
        this.value = this.value.filter(item => item !== e.target.value)
      }

      this.editor.cell[this.data.key].triggerObserver(this.editor.searchObserver, this.value)
    }
  }
}
</script>

<style lang="less" scoped>
  #search-checkbox-container{
    --borderColor: #fff;
    --backgroundColor: #1890ff;
  }
  .search-checkbox-container{
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
  /deep/.ant-checkbox-checked{
    .ant-checkbox-inner{
      background-color: var(--backgroundColor) !important;
    }
    .ant-checkbox-inner::after{
      border-color: var(--borderColor);
    }
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
  /deep/.ant-checkbox-disabled{
    .ant-checkbox-inner{
      background-color: #f5f5f5 !important;
    }
  }
</style>
