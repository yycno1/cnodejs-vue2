<template>
  <x-dialog v-model="showDialog">
    <slot></slot>
    <div slot="footer">
      <a class="dialog-button confirm-button" @click="handleConfirm">确定</a>
    </div>
  </x-dialog>
</template>

<script>
import XDialog from './dialog';

export default{
  name: 'alert',

  data() {
    return {
      showDialog: false,
    };
  },

  props: {
    value: Boolean,
  },

  components: {
    XDialog,
  },

  methods: {
    handleConfirm() {
      this.$emit('confirm');
      this.showDialog = false;
    },
  },

  watch: {
    value(val) {
      this.showDialog = val;
    },
    showDialog(val) {
      this.$emit('input', val);
    },
  },

  created() {
    if (this.value !== undefined) {
      this.showDialog = this.value;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable";
.dialog-button{
  margin: 0 20px;
  font-size: 12px;
  color: $mainColor;
}
</style>
