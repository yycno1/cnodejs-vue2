<template>
  <div class="login-page">
    <my-header
      leftIconClass="icon-arrow-left"
      @leftIconClick="goBack"
      :title="title">
    </my-header>
    <img src="../assets/img/login_header_bg.png" alt="logo" class="logo-img">
    <div class="login-box">
      <div class="input-box">
        <p class="token-tip" :class="{'show': token.length>0}">Access Token:</p>
        <input type="text" v-model="token" placeholder="Access Token">
      </div>
      <div class="button-box">
        <button type="button" class="login-btn" @click="getLogin">登录</button>
      </div>
      <p class="login-tip" @click="howGetAccessToken">如何获取Access Token?</p>
    </div>
    <confirm
      v-model="confirm"
      @open="print('open')"
      @close="print('close')"
      @confirm="print('confirm')"
      @cancel="print('cancel')">
      是否获取Access Token?
    </confirm>
  </div>
</template>
<script>
import MyHeader from 'components/my_header';
import Confirm from 'components/confirm';
import { mapActions } from 'vuex';
import api from '../common/api';
import user from '../common/user';

export default {
  name: 'login',

  data() {
    return {
      title: '登录',
      token: '',
      confirm: false,
    };
  },
  components: {
    MyHeader,
    Confirm,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getLogin() {
      api.login(this.token)
        .then((res) => {
          user.saveUser(res.data);
          user.saveToken(this.token);
          this.updateUserInfo(res.data.loginname);
          this.$store.commit('UPDATE_TOKEN', { token: this.token });
          this.$router.go(-1);
        })
        .catch((res) => {
          /* eslint-disable no-console */
          console.log(res);
        });
    },
    howGetAccessToken() {
      this.confirm = true;
    },
    print(text) {
      console.log(text);
    },
    ...mapActions(['updateUserInfo']),
  },
};

</script>
<style lang="scss" scoped>
@import '../assets/style/variable';
.logo-img{
  width: 100%;
  margin-top: $headerHeight;
}
.login-box{
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  top: -25px;
  background-color: #fff;
  border-radius: 2px;

  .input-box{
    margin-bottom: 20px;
    padding-top: 10px;
    position: relative;

    .token-tip{
      color: $mainColor;
      opacity: 0;
      margin: 0;
      position: absolute;
      transition: all .3s;
      top: 0;

      &.show{
        opacity: 1;
        top: -8px;
      }
    }

    input{
      width: 100%;
      border: none;
      @include border($color: $mainColor);
    }
  }

  .button-box{
    margin-bottom: 20px;
    text-align: center;

    .login-btn{
      background-color: $mainColor;
      color: #fff;
      width: 120px;
      height: 36px;
      line-height: 36px;
      border: none;
      border-radius: 4px;
    }
  }

  .login-tip{
    text-align: center;
    color: $mainColor;
  }
}
</style>
