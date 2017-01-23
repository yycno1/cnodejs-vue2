<template>
  <transition :name="dialogTransition">
    <div class="dialog-container" v-show="show">
      <div class="dialog-content">
        <slot></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import popupMixin from '../mixins/popupMixin';

export default{
  name: 'xDialog',
  mixins: [popupMixin],

  props: {
    dialogTransition: {
      type: String,
      default: 'fade',
    },
  },

  watch: {
    show(val) {
      if (val) {
        this.$emit('open');
      } else {
        this.$emit('close');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-container{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 2px;
  width: 80%;
}
.dialog-content{
  padding: 20px 20px;
  font-size: 15px;
  word-wrap: break-word;
  word-break: break-all;
  text-align: left;
  font-size: 12px;
}
.dialog-footer{
  line-height: 42px;
  text-align: right;
}
</style>
