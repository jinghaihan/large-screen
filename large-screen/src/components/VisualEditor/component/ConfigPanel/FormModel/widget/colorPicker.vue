<template>
  <div class="color-picker">
    <a-dropdown @visibleChange="onChange">
      <div ref="holder" class="holder"></div>
      <template slot="overlay">
        <ColorPicker v-model="data"></ColorPicker>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'

export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    color: {
      type: Object,
      required: true
    }
  },
  components: {
    ColorPicker: Sketch
  },
  data () {
    return {
      data: this.color
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler: function (value) {
        if (this.$refs.holder) {
          this.onChange(value)
        }
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$refs.holder.style.background = this.data.hex8 || this.data.hex
    },
    onChange (value) {
      this.$refs.holder.style.background = value.hex8 || value.hex
      this.form[this.config.key] = this.data
    }
  }
}
</script>

<style lang="less" scoped>
  .color-picker{
    padding-top: 10px;
    .holder{
      cursor: pointer;
      border: 1px solid var(--highlight-color);
      border-radius: 2px;
      width: 24px;
      height: 24px;
    }
  }
</style>
