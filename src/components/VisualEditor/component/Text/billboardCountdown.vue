<template>
  <div class="billboard-container">
    <a-statistic-countdown ref="statistic"
                           :title="title"
                           :value="value"
                           :value-style="valueStyle"
                           :suffix="suffix"
                           :prefix="prefix"
                           :format="format">
    </a-statistic-countdown>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      title: '',
      value: 0,
      prefix: '',
      suffix: '',
      format: '',
      titleStyle: {
        color: '',
        fontSize: '',
        fontWeight: ''
      },
      valueStyle: {
        color: '',
        fontSize: '',
        fontWeight: ''
      }
    }
  },
  watch: {
    titleStyle: {
      deep: true,
      immediate: true,
      handler: function (value) {
        this.handleTitleStyle()
      }
    }
  },
  mounted () {
    this.handleTitleStyle()
  },
  methods: {
    handleTitleStyle () {
      if (this.$refs.statistic) {
        let el = this.$refs.statistic.$el
        let title = $(el).find('.ant-statistic-title')
        title.css(this.titleStyle)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .billboard-container{
    height: 100%;
    width: 100%;
  }
  /deep/.ant-statistic-title{
    color: #00000073;
    font-size: 24px;
  }
</style>
