import popupManager from '../common/popupManager';

export default{
  data() {
    return {
      show: false,
    };
  },
  props: {
    value: Boolean,
    showModal: {
      type: Boolean,
      default: true,
    },
    modalColor: {
      type: String,
      default: '#000',
    },
    modalOpacity: {
      type: Number,
      default: 0.4,
    },
    modalTransitionDuration: Number,
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    cover: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    if (this.value !== undefined) {
      this.show = this.value;
    }
    if (this.showModal && this.show) {
      popupManager.onPopupOpen(this);
    }
  },
  beforeDestroy() {
    if (this.showModal) {
      popupManager.onPopupClose(this);
    }
  },
  watch: {
    value(newVal) {
      this.show = newVal;
    },
    show(newVal) {
      this.$emit('input', newVal);
      if (!this.showModal) {
        return;
      }
      if (newVal) {
        popupManager.onPopupOpen(this);
      } else {
        popupManager.onPopupClose(this);
      }
    },
  },
};
