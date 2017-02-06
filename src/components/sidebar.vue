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
          <span>积分：<span class="user-ponit" v-text="userinfo.score"></span></span>
          <span class="logout-btn" @click="logout">注销</span>
        </div>
      </div>
      <div class="sidebar-body">
        <ul class="nav-list">
          <li v-for="(item, index) of navList" :class="[item.liClass, {active: index === activeIndex}]" @click="navItemClick">
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
      activeIndex: -1,
    };
  },
  computed: {
    imgPath() {
      return this.isLogin ? this.userinfo.avatar_url : placeholderImg;
    },
    username() {
      const placeholder = '点击头像登录';
      return this.isLogin ? this.userinfo.loginname : placeholder;
    },
    userPath() {
      return this.isLogin ? `/user/${this.userinfo.loginname}` : '/login';
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
      this.$confirm('确定退出登录?', () => {
        user.delUser();
        this.clearUserInfo();
      });
    },
    overlayClick() {
      this.$emit('overlayClick');
    },
    navItemClick() {
      this.$emit('navItemClick');
    },
    clearUserInfo() {
      this.$store.commit('CLEAR_USER');
    },
    ...mapActions(['updateUserInfo']),
  },

  created() {
    this.$watch('$route', (newRoute) => {
      for (let i = 0, len = this.navList.length; i < len; i += 1) {
        const item = this.navList[i];
        if (newRoute.fullPath === item.to) {
          this.activeIndex = i;
          break;
        } else if (newRoute.fullPath === '/') {
          this.activeIndex = 0;
          break;
        }
      }
    }, {
      immediate: true,
    });
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
  padding: 15px 0;

  .nav-list li {
    padding: 0 20px;

    &.active{
      background: #eee;

      a{
        color: $mainColor;
      }
    }

    a {
      padding: 12px 0;
      display: block;
    }

    &.border-bottom a{
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
