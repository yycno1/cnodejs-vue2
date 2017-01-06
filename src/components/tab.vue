<template>
  <div class="tab" :style="tabStyle">
    <slot></slot>
    <div class="tab-line" :style="lineStyle" :class="lineClass"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 0,
      itemNumber: 0,
      direction: 'forward',
    };
  },
  props: {
    selectedIndex: {
      type: Number,
      default: 0,
    },
    tabLineHeight: {
      type: Number,
      default: 3,
    },
    tabLineColor: {
      type: String,
      default: '#80bd01',
    },
    tabBg: {
      type: String,
      default: '#ffffff',
    },
    tabHeight: {
      type: Number,
      default: 44,
    },
    activeStyle: {
      type: Object,
    },
    itemStyle: {
      type: Object,
    },
  },
  computed: {
    lineStyle() {
      return {
        left: this.left,
        right: this.right,
        height: this.tabLineHeight,
        backgroundColor: this.tabLineColor,
      };
    },
    left() {
      return this.itemNumber > 0 ? `${(this.activeIndex / this.itemNumber) * 100}%` : 0;
    },
    right() {
      return this.itemNumber > 0 ?
        `${((this.itemNumber - this.activeIndex - 1) / this.itemNumber) * 100}%` : 0;
    },
    lineClass() {
      return {
        'transition-forward': this.direction === 'forward',
        'transition-backward': this.direction === 'backward',
      };
    },
    tabStyle() {
      return {
        height: `${this.tabHeight}px`,
        lineHeight: `${this.tabHeight}px`,
        background: this.tabBg,
      };
    },
  },
  methods: {
    updateIndex() {
      const $children = this.$children;
      if (!$children) {
        return;
      }

      $children.forEach((child, index) => {
        child.index = index;
        if (child.selected) {
          this.activeIndex = index;
        }
      });
    },
    itemSelectedHandler() {
      const $children = this.$children;
      if (!$children) {
        return;
      }

      $children.forEach((child) => {
        child.$on('itemSelected', ({ index }) => {
          this.activeIndex = index;
          this.$emit('itemSelected', { selectedIndex: index });
        });
      });
    },
  },
  watch: {
    activeIndex(newVal, oldVal) {
      this.$children[oldVal].selected = false;
      this.$children[newVal].selected = true;
      if (newVal > oldVal) {
        this.direction = 'forward';
      } else {
        this.direction = 'backward';
      }
    },
    selectedIndex(newVal) {
      this.activeIndex = newVal;
    },
    activeStyle(newVal) {
      if (this.itemNumber === 0) {
        return;
      }
      this.$children.forEach((child) => {
        child.activeStyle = newVal;
      });
    },
    itemStyle(newVal) {
      if (this.itemNumber === 0) {
        return;
      }

      this.$children.forEach((child) => {
        child.itemStyle = newVal;
      });
    },
  },
  mounted() {
    this.updateIndex();
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/style/variable';
.tab{
  height: 44px;
  // line-height: 44px;
  display: flex;
  align-items: center;
  position: relative;

  .tab-line{
    position: absolute;
    bottom: 0;
  }
  .transition-forward{
    transition: left .3s ease-in-out .09s,right .3s ease-in-out;
  }
  .transition-backward{
    transition: right .3s ease-in-out .09s,left .3s ease-in-out;
  }
}
</style>
