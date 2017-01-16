<template>
  <div class="loaing" v-show="loaing"></div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
  name: 'loading',

  data() {
    return {
      path: this.$route.path,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['transitionStatus']),
  },
  props: {
    ready: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    transitionStatus(status) {
      if (status.enterPath !== this.path && this.ready) {
        this.loading = false;
        this.$emit('finishLoading');
      } else {
        this.loading = true;
        this.$emit('loading');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable";
.show-loading{
  background: url(../assets/img/ic_no_data.png) no-repeat center;
  background-size: 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: $headerHeight;
  bottom: 0;
}
</style>
