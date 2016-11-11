<template>
  <transition name="sidebar-slide">
    <div class="sidebar" v-show="show">
      <div class="sidebar-header">
        <div class="user-photo">
          <router-link :to="userPath">
            <img :src="imgPath">
          </router-link>
        </div>
        <p class="user-name" v-text="username"></p>
        <div class="user-point-wrap" v-if="isLogin">
          <span>积分：<span class="user-ponit" v-text="userInfo.score"></span></span>
          <span class="logout-btn" @click="logout">注销</span>
        </div>
      </div>
      <div class="sidebar-body">
        <ul class="nav-list">
          <li v-for="item of navList" :class="item.liClass" @click="navItemClick">
            <router-link :to="item.to">
              <i class="iconfont" :class="item.iconClass"></i>
              <span v-text="item.text"></span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import placeholderImg from 'assets/img/image_placeholder.png';
import { mapGetters, mapActions } from 'vuex';
import popupMixin from '../mixins/popupMixin';
import user from '../common/user';

export default {
  mixins: [popupMixin],
  data() {
    return {
      navList: [
        {
          to: '/topic?tab=all',
          text: '全部',
          iconClass: 'icon-index',
          liClass: '',
        }, {
          to: '/topic?tab=good',
          text: '精华',
          iconClass: 'icon-good',
          liClass: '',
        }, {
          to: '/topic?tab=share',
          text: '分享',
          iconClass: 'icon-share',
          liClass: '',
        }, {
          to: '/topic?tab=ask',
          text: '问答',
          iconClass: 'icon-ask',
          liClass: '',
        }, {
          to: '/topic?tab=job',
          text: '工作',
          iconClass: 'icon-job',
          liClass: 'border-bottom',
        }, {
          to: '/msg',
          text: '消息',
          iconClass: 'icon-msg',
          liClass: '',
        }, {
          to: '/about',
          text: '关于',
          iconClass: 'icon-about',
          liClass: '',
        },
      ],
    };
  },
  computed: {
    imgPath() {
      return this.isLogin ? this.userInfo.avatar_url : placeholderImg;
    },
    username() {
      const placeholder = '点击头像登录';
      return this.isLogin ? this.userInfo.loginname : placeholder;
    },
    userPath() {
      return this.isLogin ? `/user/${this.userInfo.loginname}` : '/login';
    },
    showSidebar() {
      return this.show;
    },
    ...mapGetters(['isLogin', 'userinfo']),
  },
  methods: {
    emitClose() {
      this.$emit('close');
    },
    logout() {
      user.delUser();
      this.clearUserInfo();
    },
    overlayClick() {
      this.$emit('overlayClick');
    },
    navItemClick() {
      this.$emit('navItemClick');
    },
    ...mapActions(['clearUserInfo']),
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/variable";

.sidebar-slide-enter,
.sidebar-slide-leave-active{
  transform: translate3d(-100%,0,0);
}
.sidebar-slide-enter-active,
.sidebar-slide-leave-active{
  transition: all .5s;
}
.sidebar{
  position: fixed;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  width: 250px;
  background-color:#fff;
}

.sidebar-header{
  height: 150px;
  @include border;
  background: url("../assets/img/main_nav_header_bg.png") no-repeat bottom;
  overflow: hidden;

  .user-photo{
    width: 70px;
    height: 70px;
    margin: 15px auto 0;
    border-radius: 50%;
    overflow: hidden;
    background-color:#fff;

    img{
      width: 100%;
      height: 100%;
    }
  }

  .user-name{
    color: #fff;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }

  .user-point-wrap{
    display: flex;
    justify-content: space-around;
    color: #fff;

    .user-ponit{
      color: $mainColor;
    }
  }

  .logout-btn{
    color: $mainColor;
  }
}

.sidebar-body{
  padding: 15px 20px;

  .nav-list li{
    padding: 15px 0;

    &.border-bottom{
      border-bottom: 1px solid #eee;
    }

    .iconfont{
      font-size: 18px;
    }

    span{
      font-size: 16px;
      margin-left: 25px;
    }
  }
}
</style>
