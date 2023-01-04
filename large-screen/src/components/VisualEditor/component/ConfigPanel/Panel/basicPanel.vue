<template>
  <div class="basic-panel-container">
    <FormModel v-if="visible"
               ref="formModel"
               :config="config"
               @change="onModelChange">
    </FormModel>
  </div>
</template>

<script>
import FormModel from '../FormModel/formModel.vue'

export default {
  props: {
    entity: null,
    ratio: {
      type: Object,
      required: true
    },
    grid: {
      type: Object,
      required: true
    },
    paper: {
      type: String,
      required: true
    },
    tabBasicName: {
      type: String,
      required: true
    }
  },
  components: { FormModel },
  data () {
    return {
      visible: false,
      config: [],
      formData: null
    }
  },
  watch: {
    paper: {
      immediate: true,
      handler: function (value) {
        if (!this.entity.instance['basicPanel']) {
          this.visible = false
          this.init()
        }
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.entity.setInstance({ basicPanel: this })
      this.config = this.entity.config.basic.map(item => {
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
          case 'name':
            let keys = Object.keys(this.entity.instance['editor'].paper.name)
            let index = keys.findIndex(key => key === this.entity.key)
            item.defaultValue = this.tabBasicName + (index + 1)
            break
          default:
            break
        }
        return item
      })
      this.visible = true
    },
    onModelChange (data) {
      if (this.entity) {
        // 名称
        if (data['name']) {
          this.entity.changeName(data['name'])
        }
        // 画布尺寸
        if (data['ratioWidth'] && data['ratioHeight']) {
          this.entity.changeRatio({ height: data['ratioHeight'], width: data['ratioWidth'] })
        }
        // 网格线颜色
        if (data['gridColor']) {
          this.entity.changeGrid(data['gridColor'].rgba)
        }
        // 背景
        if (data['background']) {
          this.entity.changeBackground(data['background'])
        }
        this.formData = data
        this.entity.update({ basic: this.formData })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .basic-panel-container{
    padding-top: 24px;
  }
</style>
