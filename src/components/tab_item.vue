<template>
  <div class="tab-item" :class="activeClass" @click="onClick" :style="style">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: -1,
    };
  },
  props: {
    selected: {
      type: Boolean,
    },
    activeStyle: {
      type: Object,
    },
    itemStyle: {
      type: Object,
    },
  },
  computed: {
    activeClass() {
      return {
        active: this.selected,
      };
    },
    style() {
      if (this.selected) {
        return Object.assign({}, this.itemStyle, this.activeStyle);
      }
      return this.itemStyle;
    },
  },
  methods: {
    onClick() {
      this.$emit('itemSelected', { index: this.index });
    },
  },
};
</script>
<style lang="scss" scoped>
.tab-item{
  flex:1;
  text-align: center;
  height: 100%;
  color: #aaa;

  &.active{
    color: #fff;
  }
}
</style>
