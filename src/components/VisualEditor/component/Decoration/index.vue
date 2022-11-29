<template>
  <component class="decoration"
             ref="decoration"
             :is="props.component"
             v-bind="{
              color: props.primaryColor ? [props.primaryColor, props.deputyColor] : [],
              dur: props.duration ? props.duration : 6,
              reverse: props.reverse
             }">
  </component>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      props: this.data
    }
  },
  methods: {
    resize () {
      try {
        this.$refs.decoration.initWH()
      } catch (error) {}
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
