<template>
  <div v-if="visible" ref="container" class="notable-container">
    <p ref="text"
       class="text"
       :text="text"
       :style="style">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: true,
      text: '',
      style: {
        color: '',
        fontSize: '',
        fontWeight: '',
        animation: 'notableMove 4s linear infinite'
      },
      duration: null
    }
  },
  watch: {
    duration: {
      handler: function (value) {
        this.style.animation = `notableMove ${value}s linear infinite`
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .notable-container{
    height: 100%;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    .text{
      position: relative;
      width: fit-content;
      padding-left: 20px;
    }
    .text::after{
      position: absolute; 
			right: -100%;
			content: attr(text);
    }
    
  }
</style>

<style>
  @keyframes notableMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
