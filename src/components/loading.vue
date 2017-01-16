<template>
  <div class="loading" v-show="loading"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default{
  name: 'loading',

  data() {
    return {
      path: this.$route.path,
    };
  },
  computed: {
    ...mapGetters(['transitionStatus']),
    loading() {
      return !this.ready || this.transitionStatus.enterPath === this.path;
    },
  },
  props: {
    ready: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.$watch('loading', (newVal) => {
      this.$emit('loadingChange', { isLoaded: !newVal });
    }, {
      immediate: true,
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable";
.loading{
  background: url(../assets/img/ic_no_data.png) no-repeat center;
  background-size: 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: $headerHeight;
  bottom: 0;
}
</style>
