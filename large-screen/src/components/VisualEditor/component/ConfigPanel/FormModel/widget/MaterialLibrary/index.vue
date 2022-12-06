<template>
  <div class="material-library">
     <!-- 无数据 -->
      <div v-if="isVisible('empty')"
           class="empty-container"
           @click="onClick">
        <a-empty></a-empty>
      </div>
      <!-- 缩略图 -->
      <img v-if="isVisible('image')"
          :src="form[config.key]"
          class="image"
          alt="background">
      <!-- 遮罩层 -->
      <div v-if="isVisible('mask')" class="mask">
        <TooltipIcon class="action" icon="edit" title="修改" @click="onClick"></TooltipIcon>
        <TooltipIcon class="action" icon="delete" title="删除" @click="onDelete"></TooltipIcon>
      </div>

      <Modal v-if="visible" :type="config.libraryType" @submit="onSubmit" @close="onModalClose"></Modal>
  </div>
</template>

<script>
import Modal from './modal.vue'
import TooltipIcon from '../../../../TooltipIcon'

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
  components: { Modal, TooltipIcon },
  data () {
    return {
      visible: false
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
    onClick () {
      this.visible = true
    },
    onSubmit (image) {
      this.form[this.config.key] = image
    },
    onDelete () {
      this.form[this.config.key] = 'none'
    },
    onModalClose () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
  .material-library{
    height: 160px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    border: 1px dashed var(--highlight-color);
    .image{
      height: 100%;
      width: 100%;
    }
    .empty-container{
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mask{
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      .action {
        font-size: 16px;
        color: transparent;
        margin: 0 8px
      }
    }
    .mask:hover {
      background-color: var(--font-color);
      opacity: 0.6;
      .action {
        color: var(--primary-color);
      }
    }
  }
</style>
