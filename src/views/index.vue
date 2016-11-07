<template>
  <div>
    <my-header title="话题" leftIconClass="icon-nav" @leftIconClick="onLeftIconClick"></my-header>
  </div>
</template>
<script>
import MyHeader from 'components/my-header';

export default{
  components: {
    MyHeader,
  },
  methods: {
    /* eslint-disable no-console */
    onLeftIconClick() {
      console.log('left Icon Clicked!');
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
