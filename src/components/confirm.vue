<template>
  <x-dialog
    :closeOnClickModal="closeOnClickModal"
    :modalColor="modalColor"
    :modalOpacity="modalOpacity"
    :modalTransitionDuration="modalTransitionDuration"
    :dialogTransition="dialogTransition"
    :cover="cover"
    v-model="showDialog"
    @modalClick="$emit('modalClick')"
    @open="$emit('open')"
    @close="$emit('close')">
    <slot></slot>
    <div slot="footer">
      <a class="dialog-button cancel-button" :style="{ color: cancelBtnColor }" @click="handleCancel">{{cancelBtnText}}</a>
      <a class="dialog-button confirm-button" :style="{ color: confirmBtnColor }" @click="handleConfirm">{{confirmBtnText}}</a>
    </div>
  </x-dialog>
</template>

<script>
import XDialog from './dialog';

export default{
  name: 'confirm',

  data() {
    return {
      showDialog: false,
    };
  },

  props: {
    value: Boolean,
    confirmBtnText: {
      type: String,
      default: '确定',
    },
    cancelBtnText: {
      type: String,
      default: '取消',
    },
    confirmBtnColor: String,
    cancelBtnColor: String,
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    modalColor: String,
    modalOpacity: Number,
    modalTransitionDuration: Number,
    dialogTransition: String,
    cover: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    XDialog,
  },

  watch: {
    value(val) {
      this.showDialog = val;
    },
    showDialog(val) {
      this.$emit('input', val);
    },
  },

  methods: {
    handleConfirm() {
      this.$emit('confirm');
      this.showDialog = false;
    },
    handleCancel() {
      this.$emit('cancel');
      this.showDialog = false;
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
.confirm-button{
  color: $mainColor;
}
.cancel-button{
  color: #777;
}
</style>
