<template>
    <transition
      :name="animateName"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @after-leave="afterLeave">
      <keep-alive include="topic">
        <router-view></router-view>
      </keep-alive>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import user from './common/user';

export default {
  name: 'app',
  data() {
    return {
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
    ...mapGetters(['direction']),
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
  watch: {
    $route(to, from) {
      this.toPath = to.path;
      this.from = from.path;
    },
  },

  created() {
    const savedToken = user.getToken();
    const saveUser = user.getUser();

    if (savedToken) {
      this.$store.commit('UPDATE_TOKEN', { token: savedToken });
    }

    if (saveUser.loginname) {
      this.$store.dispatch('updateUserInfo', saveUser.loginname);
    }
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
