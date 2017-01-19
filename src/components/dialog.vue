<template>
  <div class="dialog-container" v-show="show">
    <div class="dialog-content">
      <slot></slot>
    </div>
    <div class="dialog-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import popupMixin from '../mixins/popupMixin';

export default{
  name: 'xDialog',
  mixins: [popupMixin],
};
</script>

<style lang="scss" scoped>
.dialog-content{
  padding: 20px 20px;
  font-size: 15px;
  word-wrap: break-word;
  word-break: break-all;
  text-align: left;
  font-size: 12px;
}
.dialog-footer{
  line-height: 42px;
  text-align: right;
}
</style>
