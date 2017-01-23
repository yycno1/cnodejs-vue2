<template>
  <transition name="fade">
    <div class="modal" :style="style" @click="handleClick" v-if="show"></div>
  </transition>
</template>
<script>
export default{
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
    bgColor: {
      type: String,
      default: '#000',
    },
    opacity: {
      type: Number,
      default: 0.4,
    },
    transitionDuration: {
      type: Number,
      default: 0.5,
    },
  },
  computed: {
    style() {
      return {
        zIndex: this.zIndex,
        backgroundColor: this.bgColor,
        opacity: this.opacity,
        transitionDuration: `${this.transitionDuration}s`,
      };
    },
  },
  methods: {
    handleClick() {
      this.$emit('modalClick');
    },
  },
};
</script>
<style lang="scss" scoped>
.modal{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.4;
}
</style>
