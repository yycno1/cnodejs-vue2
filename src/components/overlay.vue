<template>
  <transition name="modal-fade">
    <div class="overlay" @click="handleClick" :style="style" v-if="show"></div>
  </transition>
</template>
<script>
export default{
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: '#000',
    },
    opacity: {
      type: Number,
      default: 0.4,
    },
    zIndex: {
      type: Number,
      default: 10000,
    },
    overlayClick: {
      type: Function,
    },
  },
  computed: {
    style() {
      return {
        backgroundColor: this.bgColor,
        opacity: this.opacity,
        zIndex: this.zIndex,
      };
    },
  },
  methods: {
    handleClick() {
      if (typeof this.overlayClick === 'function') {
        this.overlayClick();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.overlay{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.4;
}
.modal-fade-enter,
.modal-fade-leave-active{
  opacity: 0 !important;
}
.modal-fade-enter-active,
.modal-fade-leave-active{
  transition: opacity .5s;
}
</style>
