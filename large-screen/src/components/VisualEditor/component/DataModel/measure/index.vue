<template>
  <div class="measure-config-container">
    <a-row :gutter="8">
      <!-- 指标枚举 -->
      <a-col :col="8">jinghaihan</a-col>
      <a-col :col="7"></a-col>
      <!-- 指标乘除计算 -->
      <a-col :col="3"></a-col>
      <!-- 小数点规整 -->
      <a-col :col="3"></a-col>
      <!-- 删除按钮 -->
      <a-col :col="3"></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    modelData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    onAdd () {
      
    }
  }
}
</script>

<style lang="less" scoped>
  .measure-config-container{
    overflow-x: hidden;
  }
</style>
