<template>
  <transition name="slide">
    <div class="reply-button">
      <i class="iconfont icon-reply"></i>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import "../assets/style/variable";
.reply-button{
  width: 50px;
  height: 50px;
  background: $mainColor;
  position: fixed;
  bottom: 20px;
  right: 10px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
}
.slide-enter-active, .slide-leave-active{
  transition: all .5s ease;
}
.slide-enter, .slide-leave-active{
  transform: translate3d(0, 70px, 0);
}
</style>
