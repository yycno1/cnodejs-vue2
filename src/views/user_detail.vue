<template>
  <div>
    <my-header
      leftIconClass="icon-arrow-left"
      @leftIconClick="goBack"
      :title="title">
    </my-header>
    <div class="user-detail-header">
      <div class="user-photo">
        <img src="../assets/img/image_placeholder.png">
      </div>
      <p class="user-name">username</p>
      <p class="user-email"><a href="githubAddress">aaa@github.com</a></p>
      <div class="user-point-wrap">
        <span class="register-time"><span>注册时间：2016-01-01</span></span>
        <span class="user-ponit">积分：<span>80</span></span>
      </div>
    </div>
    <div class="user-detail-content">
      <tab tab-bg="#333333" :active-style="tabItemActiveStyle" :item-style="tabItemStyle">
        <tab-item :selected="true">最近回复</tab-item>
        <tab-item>最新发布</tab-item>
        <tab-item>话题设置</tab-item>
      </tab>
      <tab-content>
        <tab-panel></tab-panel>
        <tab-panel></tab-panel>
        <tab-panel></tab-panel>
      </tab-content>
    </div>
  </div>
</template>
<script>
import MyHeader from 'components/my_header';
import Tab from 'components/tab';
import TabItem from 'components/tab_item';

export default {
  data() {
    return {
      title: '用户中心',
      tabItemActiveStyle: {
        color: '#fff',
      },
      tabItemStyle: {
        color: '#aaa',
      },
    };
  },
  components: {
    MyHeader,
    Tab,
    TabItem,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};

</script>
<style lang="scss" scoped>
@import '../assets/style/variable';
.user-detail-header{
  background: url("../assets/img/user_detail_header_bg.png") no-repeat bottom;
  background-size: 100%;
  overflow: hidden;
  margin-top: $headerHeight;

  .user-photo{
    width: 70px;
    height: 70px;
    margin: 15px auto;
    border-radius: 50%;
    overflow: hidden;
    background-color:#fff;

    img{
      width: 100%;
      height: 100%;
    }
  }

  .user-name,.user-email{
    font-size: 14px;
    text-align: center;
    line-height: 1;
    margin-top: 0;
  }

  .user-name{
    color: #fff;
    margin-bottom: 10px;
  }
  .user-email{
    margin-bottom: 20px;
    a{
      color: #999;
      text-decoration: underline;
    }
  }

  .user-point-wrap{
    display: flex;
    justify-content: space-around;
    color: #fff;
    margin-bottom: 15px;

    .user-ponit{
      color: $mainColor;
    }
  }
}

.tab-container{
  display: flex;
  align-item: center;
  height: 44px;
  .tab{
    flex:1;
    text-align: center;
    background: linear-gradient(180deg,#e5e5e5,#e5e5e5,hsla(0,0%,90%,0)) 0 100% no-repeat;
    &.active{
      color: rgb(4,190,2);
    }
  }
}
</style>
