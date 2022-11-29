<template>
  <div class="border-container">
    <component class="component"
               :is="data.component"
               ref="border">
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
        this.$refs.border.initWH()
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
