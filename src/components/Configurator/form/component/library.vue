<template>
  <div class="library">
    <!-- 无数据 -->
    <div class="empty-container" @click="onLibrary">
      <a-empty v-if="isVisible('empty')"></a-empty>
    </div>
    <!-- 缩略图 -->
    <img v-if="isVisible('image')"
        :src="form[config.key]"
        alt="background">
    <!-- 遮罩层 -->
    <div v-if="isVisible('mask')" class="mask">
      <tooltip-icon class="action" icon="edit" title="修改" @click="onLibrary"></tooltip-icon>
      <tooltip-icon class="action" icon="delete" title="删除" @click="onLibraryDelete"></tooltip-icon>
    </div>
    <!-- 素材库弹窗 -->
    <library-modal v-if="libraryVisible"
                    :type="config.libraryType"
                    @submit="onLibrarySubmit"
                    @close="onModalClose"></library-modal>
</div>
</template>

<script>
import libraryModal from './libraryModal.vue'

export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  components: {
    libraryModal
  },
  data () {
    return {
      libraryVisible: false
    }
  },
  methods: {
    isVisible (type) {
      let flag = false
      switch (type) {
        case 'empty':
          if (!this.form[this.config.key] || this.form[this.config.key] === 'none') flag = true
          break
        case 'image':
          if (this.form[this.config.key] && this.form[this.config.key] !== 'none') flag = true
          break
        case 'mask':
          if (this.form[this.config.key] && this.form[this.config.key] !== 'none') flag = true
          break
        default:
          break
      }
      return flag
    },
    onLibrary () {
      this.libraryVisible = true
    },
    onLibrarySubmit (image) {
      this.form[this.config.key] = image
    },
    onLibraryDelete (e) {
      this.form[this.config.key] = 'none'
    },
    onModalClose () {
      this.libraryVisible = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
