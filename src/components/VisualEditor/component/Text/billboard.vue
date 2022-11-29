<template>
  <div class="billboard-container">
    <a-statistic :value="value"
                 :value-style="valueStyle"
                 :suffix="suffix"
                 :prefix="prefix"
                 :groupSeparator="groupSeparator">
      <div slot="title" :style="titleStyle">{{title}}</div>
    </a-statistic>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      value: 0,
      prefix: '',
      suffix: '',
      groupSeparator: ',',
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
  }
}
</script>

<style lang="less" scoped>
  .billboard-container{
    height: 100%;
    width: 100%;
  }
</style>
