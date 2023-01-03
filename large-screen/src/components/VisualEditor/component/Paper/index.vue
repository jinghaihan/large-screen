<template>
  <TickMark :scale="scale">
    <Layout :entity="entity"
            :layout="layout"
            :scale="scale"
            :ratio="ratio"
            :grid="grid"
            :component="component">
    </Layout>
  </TickMark>
</template>

<script>
import TickMark from './TickMark'
import Layout from './Layout/container'

export default {
  props: {
    entity: null,
    layout: {
      type: Array,
      required: true
    },
    scale: {
      type: Number,
      required: true
    },
    ratio: {
      type: Object,
      required: true
    },
    grid: {
      type: Object,
      required: true
    },
    component: {
      type: Object,
      required: true
    }
  },
  components: { TickMark, Layout },
  data () {
    return {

    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.$emit('rendered')
  },
  methods: {
    init () {
      this.entity.setInstance({ paper: this })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
