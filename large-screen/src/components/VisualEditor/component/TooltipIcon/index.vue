<template>
  <a-tooltip :placement="placement">
    <template slot="title">{{title}}</template>
    <a-icon :type="icon"
            @click="$emit('click')" >
    </a-icon>
  </a-tooltip>
</template>

<script>

export default {
  name: 'authIcon',
  props: {
    icon: null,
    title: null,
    placement: {
      default: 'top'
    }
  }
}
</script>
