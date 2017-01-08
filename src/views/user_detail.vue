<template>
  <div>
    <my-header
      leftIconClass="icon-arrow-left"
      @leftIconClick="goBack"
      :title="title">
    </my-header>
    <div class="user-detail-header">
      <div class="user-photo">
        <img :src="info.avatar_url">
      </div>
      <p class="user-name">{{info.loginname}}</p>
      <p class="user-email"><a :href="'https://github.com/' + info.githubUsername">{{info.githubUsername + '@github.com'}}</a></p>
      <div class="user-point-wrap">
        <span class="register-time"><span>注册时间：{{info.create_at | formatTime('yyyy-MM-dd')}}</span></span>
        <span class="user-ponit">积分：<span>{{info.score}}</span></span>
      </div>
    </div>
    <div class="user-detail-content">
      <tab
        :selected="0"
        :active-style="tabItemActiveStyle"
        :item-style="tabItemStyle"
        @itemSelected="handleItemSelected">
        <tab-item>最近回复</tab-item>
        <tab-item>最新发布</tab-item>
        <tab-item>话题收藏</tab-item>
      </tab>
      <div class="tab-content">
        <div v-show="selectedIndex === 0">
          <ul>
            <li class="topic-list" v-for="topic in info.recent_replies">
              <router-link :to="'/topic/' + topic.id" class="topic-link clearfixed">
                <div class="author-phote"><img :src="topic.author.avatar_url"></div>
                <div class="topic-info">
                  <div class="text-overflow">{{topic.title}}</div>
                  <div class="topic-info-row">
                    <span>{{topic.author.loginname}}</span>
                    <span>{{topic.last_reply_at | formatTopicTime}}</span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-show="selectedIndex === 1">
          <ul>
            <li class="topic-list" v-for="topic in info.recent_topics">
              <router-link :to="'/topic/' + topic.id" class="topic-link clearfixed">
                <div class="author-phote"><img :src="topic.author.avatar_url"></div>
                <div class="topic-info">
                  <div class="text-overflow">{{topic.title}}</div>
                  <div class="topic-info-row">
                    <span>{{topic.author.loginname}}</span>
                    <span>{{topic.last_reply_at | formatTopicTime}}</span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-show="selectedIndex === 2">
          <ul>
            <li class="topic-list" v-for="topic in collectedTopics">
              <router-link :to="'/topic/' + topic.id" class="topic-link clearfixed">
                <div class="author-phote"><img :src="topic.author.avatar_url"></div>
                <div class="topic-info">
                  <div class="text-overflow">{{topic.title}}</div>
                  <div class="topic-info-row">
                    <span>{{topic.author.loginname}}</span>
                    <span>{{topic.last_reply_at | formatTopicTime}}</span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from 'components/my_header';
import Tab from 'components/tab';
import TabItem from 'components/tab_item';
import api from '../common/api';

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
      info: {
        recent_replies: [],
        recent_topics: [],
      },
      collectedTopics: [],
      selectedIndex: 0,
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
    getInfo() {
      const name = this.$route.params.username;
      api.fetchUserInfo(name)
        .then(({ data }) => {
          if (data.success) {
            this.info = data.data;
          }
        });

      api.fetchCollectedTopics(name)
        .then(({ data }) => {
          if (data.success) {
            this.collectedTopics = data.data;
          }
        });
    },
    handleItemSelected(data) {
      this.selectedIndex = data.selected;
    },
  },
  created() {
    this.getInfo();
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
.topic-list{
  padding: 10px;
  @include border;

  .topic-link{
    display: block;

    .author-phote{
      width: 36px;
      height: 36px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 10px;
      float: left;

      img{
        width: 100%;
        height: 100%;
      }
    }
    .topic-info{
      overflow: hidden;

      .topic-info-row{
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
