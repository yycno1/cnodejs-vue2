<template>
  <transition
    :name="animateName"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      direction: 'forword',
      toPath: '',
      fromPath: '',
    };
  },
  computed: {
    animateName() {
      return this.direction === 'forword' ?
        'pop-left' :
        'pop-right';
    },
    pathRecord() {
      return this.$store.getters.pathRecord;
    },
  },
  methods: {
    beforeEnter() {
      this.$store.commit('UPDATE_TRANSITION_STATUS', {
        enterPath: this.toPath,
      });
    },
    afterEnter() {
      this.$store.commit('UPDATE_TRANSITION_STATUS', {
        enterPath: '',
      });
    },
    beforeLeave() {
      this.$store.commit('UPDATE_TRANSITION_STATUS', {
        leavePath: this.fromPath,
      });
    },
    afterLeave() {
      this.$store.commit('UPDATE_TRANSITION_STATUS', {
        leavePath: '',
      });
    },
  },
  mounted() {
    const path = this.$route.path;
    this.$store.commit('ADDPATHRECORD', { path });
  },
  watch: {
    $route(to, from) {
      const toPath = this.toPath = to.path;
      const fromPath = this.fromPath = from.path;
      if (this.pathRecord.indexOf(toPath) > -1) {
        this.$store.commit('REMOVEPATHRECORD', { path: fromPath });
        this.direction = 'backword';
      } else {
        this.$store.commit('ADDPATHRECORD', { path: toPath });
        this.direction = 'forword';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pop-left-enter{
  transform: translate3d(100%,0,0);
}
.pop-right-enter{
  transform: translate3d(-100%,0,0)
}
.pop-left-enter-active,
.pop-left-leave-active,
.pop-right-enter-active,
.pop-right-leave-active {
  width: 100%;
  animation-duration: .5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
  will-change: transform;
  height: 100%;
  position: absolute;z-index: 11;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
}
.pop-left-enter-active{
  animation-name: popInRight;
}
.pop-left-leave-active{
  animation-name: popOutLeft;
}
.pop-right-enter-active{
  animation-name: popInLeft;
}
.pop-right-leave-active{
  animation-name: popOutRight;
}
@keyframes popInLeft{
  from{
    transform: translate3d(-100%,0,0);
  }
  to{
    transform: translate3d(0,0,0);
  }
}
@keyframes popOutLeft{
  from{
    transform: translate3d(0,0,0);
  }
  to{
    transform: translate3d(-100%,0,0);
  }
}
@keyframes popInRight{
  from{
    transform: translate3d(100%,0,0);
  }
  to{
    transform: translate3d(0,0,0);
  }
}
@keyframes popOutRight{
  from{
    transform: translate3d(0,0,0);
  }
  to{
    transform: translate3d(100%,0,0);
  }
}
</style>
