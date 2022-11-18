<template>
  <div class="basic-panel-container">
    <FormModel v-if="visible"
               :config="config"
               @change="onModelChange">
    </FormModel>
  </div>
</template>

<script>
export default {
  props: {
    editor: null,
    ratio: {
      type: Object,
      required: true
    },
    grid: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      config: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.config = this.editor.config.basic.map(item => {
        switch (item.key) {
          case 'ratioWidth':
            item.defaultValue = this.ratio.width
            break
          case 'ratioHeight':
            item.defaultValue = this.ratio.height
            break
          case 'gridColor':
            item.defaultValue = { rgba: this.grid.color }
            break
          default:
            break
        }
        return item
      })

      this.visible = true
    },
    onModelChange () {
      
    }
  }
}
</script>

<style lang="less" scoped>
  .basic-panel-container{
    padding: 24px;
  }
</style>
