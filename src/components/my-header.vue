<template>
  <div class="header-bar">
    <a class="header-icon iconfont"
      :class="leftIconClass"
      @click="leftIconClick">
    </a>
    <h2 class="no-margin no-padding align-center" v-text="title"></h2>
    <a class="header-icon iconfont"
      :class="rightIconClass"
      @click="rightIconClick">
    </a>
  </div>
</template>
<script>
export default {
  methods: {
    leftIconClick() {
      this.$emit('leftIconClick');
    },
    rightIconClick() {
      this.$emit('rightIconClick');
    },
  },
  props: {
    title: String,
    leftIconClass: String,
    rightIconClass: String,
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/style/variable';
.header-bar{
  position: fixed;
  top: 0;
  width: 100%;height: $headerHeight;
  background-color: $barColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  .header-icon{
    display: block;
    width: 20px;
    font-size: 20px;
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
