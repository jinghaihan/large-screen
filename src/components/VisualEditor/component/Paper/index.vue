<template>
  <TickMark :scale="scale">
    <Layout :editor="editor"
            :layout="layout"
            :scale="scale"
            :layer="layer"
            :ratio="ratio"
            :grid="grid"
            :component="component">
    </Layout>
  </TickMark>
</template>

<script>
import TickMark from './TickMark'
import Layout from './Layout'

export default {
  props: {
    editor: null,
    layout: {
      type: Array,
      required: true
    },
    scale: {
      type: Number,
      required: true
    },
    layer: {
      type: Object,
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
      this.editor.setInstance({ paper: this })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
