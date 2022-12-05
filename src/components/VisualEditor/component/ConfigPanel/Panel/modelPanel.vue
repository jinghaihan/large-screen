<template>
  <a-spin :spinning="loading">
    <div class="model-panel-container">
      <FormModel v-if="!loading"
                :config="editor.config.model"
                @change="onModelChange">
      </FormModel>
    </div>
  </a-spin>
</template>

<script>
import FormModel from '../FormModel/formModel.vue'

export default {
  props: {
    editor: null
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { FormModel },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
  .model-panel-container{
    padding-top: 24px;
  }
</style>
