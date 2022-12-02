<template>
  <div ref="container" class="search-input-container" id="search-input-container">
    <label class="label" v-if="props.label">{{props.label}}：</label>
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
    --color: #808080;
  }
  .search-input-container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .label{
      flex-shrink: 0;
    }
  }
  ::-webkit-input-placeholder {
    color: var(--color);
  }
</style>
