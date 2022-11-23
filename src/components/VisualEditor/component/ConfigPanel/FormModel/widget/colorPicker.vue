<template>
  <div class="color-picker">
    <a-dropdown @visibleChange="onChange">
      <div ref="holder" class="holder"></div>
      <template slot="overlay">
        <ColorPicker v-model="color"></ColorPicker>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'

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
    ColorPicker: Chrome
  },
  data () {
    return {

    }
  },
  watch: {
    color: {
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
      this.$refs.holder.style.background = this.color.hex
    },
    onChange (value) {
      this.$refs.holder.style.background = value.hex
      this.form[this.config.key] = this.color
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
