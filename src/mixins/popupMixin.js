import overlayManager from '../common/overlayManager';

export default{
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    overlayColor: {
      type: String,
      default: '#000',
    },
    overlayOpacity: {
      type: Number,
      default: 0.4,
    },
  },
  mounted() {
    if (this.overlay && this.show) {
      overlayManager.onPopupOpen(this);
    }
  },
  beforeDestroy() {
    if (this.overlay) {
      overlayManager.onPopupClose(this);
    }
  },
  watch: {
    show(newVal) {
      if (!this.overlay) {
        return;
      }
      if (newVal) {
        overlayManager.onPopupOpen(this);
      } else {
        overlayManager.onPopupClose(this);
      }
    },
  },
};
