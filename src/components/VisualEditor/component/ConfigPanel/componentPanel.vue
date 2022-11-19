<template>
  <div></div>
</template>

<script>
export default {
  props: {
    editor: null,
    component: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cell: null
    }
  },
  watch: {
    component: {
      deep: true,
      immediate: true,
      handler: function (curr, prev) {
        prev = prev || {}
        if (curr.key !== prev.key) {
          this.init()
        }
      }
    }
  },
  methods: {
    init () {
      this.cell = this.editor.cell[this.component.key]
      console.log(this.cell)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
