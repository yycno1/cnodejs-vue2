<template>
  <x-dialog
    :closeOnClickModal="closeOnClickModal"
    :modalColor="modalColor"
    :modalOpacity="modalOpacity"
    :modalTransitionDuration="modalTransitionDuration"
    :dialogTransition="dialogTransition"
    :cover="cover"
    v-model="showDialog"
    @open="$emit('open')"
    @close="$emit('close')">
    <slot></slot>
    <div slot="footer">
      <a class="dialog-button confirm-button" :style="{ color: buttonColor }" @click="showDialog = false">{{buttonText}}</a>
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
    buttonText: {
      type: String,
      default: '确定',
    },
    buttonColor: String,
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
}
.confirm-button{
  color: $mainColor;
}
</style>
