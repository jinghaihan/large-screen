<template>
  <div class="border-container" :style="{ padding: data.padding + 'px' }">
    <component class="component"
               :is="data.component"
               ref="border"
               v-bind="{
                color: [data.primaryColor, data.deputyColor],
                backgroundColor: data.backgroundColor
               }">
    </component>
    <slot></slot>
  </div>
</template>

<script>
import None from './none.vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: { none: None },
  methods: {
    resize () {
      if (this.data.component !== 'none') {
        try {
          this.$refs.border.initWH()
        } catch (error) {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .border-container{
    height: 100%;
    width: 100%;
    position: relative;
    .component{
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
