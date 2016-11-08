<template>
  <div class="sidebar-container" :class="gotoShow?'goto-show':''" v-show="doDisplay">
    <div class="mask" @click="emitClose"></div>
    <div class="sidebar" @transitionend="listenTransitionend"  @webkitTransitionEnd="listenWebkitTransitionEnd">
      <div class="sidebar-header">
        <div class="user-photo">
          <a v-link="{path:userPath}">
            <img :src="imgPath">
          </a>
        </div>
        <p class="user-name" v-text="username"></p>
        <div class="user-point-wrap" v-if="isLogin">
          <span>积分：<span class="user-ponit" v-text="userInfo.score"></span></span>
          <span class="logout-btn" @click="logout">注销</span>
        </div>
      </div>
      <div class="sidebar-body">
        <ul class="nav-list" @click="delegateNav">
          <li>
            <a v-link="{path:'/?tab=all',exact: true}">
              <i class="iconfont icon-index"></i>
              <span>全部</span>
            </a>
          </li>
          <li>
            <a v-link="{path:'/?tab=good',exact: true}">
              <i class="iconfont icon-good"></i>
              <span>精华</span>
            </a>
          </li>
          <li>
            <a v-link="{path:'/?tab=share',exact: true}">
              <i class="iconfont icon-share"></i>
              <span>分享</span>
            </a>
          </li>
          <li>
            <a v-link="{path:'/?tab=ask',exact: true}">
              <i class="iconfont icon-ask"></i>
              <span>问答</span>
            </a>
          </li>
          <li class="border-bottom">
            <a v-link="{path:'/?tab=job',exact: true}">
              <i class="iconfont icon-job"></i>
              <span>工作</span>
            </a>
          </li>
          <li>
            <i class="iconfont icon-msg"></i>
            <span>消息</span>
          </li>
          <li>
            <i class="iconfont icon-about"></i>
            <span>关于</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import user from '../common/user'
import {isLogin,userInfo} from '../vuex/getter'
import {clearUserInfo} from '../vuex/action'
import placeholderImg from '../assets/img/image_placeholder.png'
export default{
  data () {
    return {
      gotoShow: false,
      doDisplay: false
    }
  },
  props: ['show'],
  computed: {
    imgPath () {
      const placeholder = placeholderImg
      return this.isLogin?this.userInfo.avatar_url:placeholder
    },
    username () {
      const placeholder = '点击头像登录'
      return this.isLogin?this.userInfo.loginname:placeholder
    },
    userPath () {
      return this.isLogin?`/user/${this.userInfo.loginname}`:'/login'
    }
  },
  vuex: {
    getters: {
      isLogin,
      userInfo
    },
    actions: {
      clearUserInfo
    }
  },
  methods: {
    listenTransitionend () {
      if(this.show === false){
        this.doDisplay = false
      }
    },
    listenWebkitTransitionEnd () {
      this.listenTransitionend()
    },
    emitClose () {
      this.$emit('close')
    },
    delegateNav (e) {
      if(e.target.href || e.target.parentNode.href){
        this.emitClose()
      }
    },
    logout () {
      user.delUser()
      this.clearUserInfo()
    }
  },
  watch: {
    'show': function(val,oldVal) {
      if(val === true){
        this.doDisplay = true,
        setTimeout(() =>{
          this.gotoShow = true
        },0)
      }else{
        this.gotoShow = false
      }
    }
  }
}
</script>
<style lang="sass" scoped>

@import "../assets/style/variable";

.sidebar-container{
  width: 100%;height:100%;
  position: fixed;
  top:0;left:0;
  overflow:hidden;

  &.goto-show{
    .mask{
      opacity: 0.4;
      display: block
    }

    .sidebar{
      transform: translateX(0);
    }
  }

  .mask{
    position: absolute;z-index:999;
    width: 100%;height:100%;
    background-color: #000;
    opacity: 0;
    transition: opacity .3s;
  }

  .sidebar{
    width: 250px;height:100%;
    position:absolute;z-index:1000;
    background-color:#fff;
    transition: all .3s;
    transform: translateX(-100%);
  }

  .sidebar-header{
    height: 150px;
    border-bottom: 1px solid #eee;
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
}
</style>
