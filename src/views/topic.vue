<template>
  <div>
    <my-header leftIconClass="icon-nav"
      :title="title"
      @leftIconClick="toggleSidebar">
    </my-header>
    <loading :ready="!fetching" @loadingChange="handleLoadingChange"></loading>
    <ul class="topic-list" v-show="showContent" v-infinity="infinityCall">
      <li v-for="topic in topics" class="clearfix">
        <router-link :to="'/topic/'+topic.id" class="topic-link">
          <div class="topic-title text-overflow"
            :class="getLabel(topic)"
            :title="formatLabel(getLabel(topic))"
            v-text="topic.title">
          </div>
          <div class="topic-info">
            <div class="author-photo">
              <img :src="topic.author.avatar_url" alt="photo">
            </div>
            <div class="other-topic-info">
              <div class="topic-info-row">
                <span v-text="topic.author.loginname"></span>
                <p class="co-grey no-margin">
                  <span v-text="topic.reply_count"></span>/
                  <span v-text="topic.visit_count"></span>
                </p>
              </div>
              <div class="topic-info-row">
                <p class="co-grey no-margin">创建于：
                  <span>
                    {{topic.create_at | formatTime('yyyy-MM-dd hh:mm:ss')}}
                  </span>
                </p>
                <span class="co-grey">
                  {{topic.last_reply_at | formatTopicTime}}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <sidebar v-model="showSidebar"
      @modalClick="closeSidebar"
      @navItemClick="closeSidebar">
    </sidebar>
  </div>
</template>
<script>
import MyHeader from 'components/my_header';
import Sidebar from 'components/sidebar';
import Loading from 'components/loading';
import { mapGetters } from 'vuex';
import { getLabel, formatLabel } from '../common/filter';
import api from '../common/api';
import infinity from '../directives/infinity';

export default{
  name: 'topic',

  data() {
    return {
      topics: [],
      pageInfo: {
        page: 1,
        limit: 10,
        tab: 'all',
        mdrender: false,
      },
      showSidebar: false,
      fetching: false,
      showContent: false,
      path: this.$route.path,
    };
  },
  computed: {
    title() {
      return this.formatLabel(this.pageInfo.tab);
    },
    loading() {
      return this.topics.length === 0 || this.transitionStatus.enterPath === this.path;
    },
    ...mapGetters(['transitionStatus']),
  },
  components: {
    MyHeader,
    Sidebar,
    Loading,
  },
  directives: {
    [infinity.name]: infinity,
  },
  methods: {
    /* eslint-disable no-console */
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    initData() {
      this.fetching = true;
      api.fetchTopic(this.pageInfo)
        .then(({ data }) => {
          if (data.success) {
            this.topics = data.data;
            this.pageInfo.page += 1;
          }
        })
        .finally(() => {
          this.fetching = false;
        });
    },
    closeSidebar() {
      this.showSidebar = false;
    },
    setTab() {
      const tab = this.$route.query.tab;
      if (!tab) {
        this.pageInfo.tab = 'all';
      } else {
        this.pageInfo.tab = tab;
      }
    },
    infinityCall() {
      api.fetchTopic(this.pageInfo)
        .then(({ data }) => {
          if (data.success) {
            this.topics = [...this.topics, ...data.data];
            this.pageInfo.page += 1;
          }
        });
    },
    handleLoadingChange(payload) {
      this.showContent = payload.isLoaded;
    },
    getLabel,
    formatLabel,
  },
  watch: {
    $route() {
      this.setTab();
      this.topics = [];
      this.pageInfo.page = 1;
      this.initData();
    },
  },
  created() {
    this.setTab();
    this.initData();
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/style/variable';
.show-loading{
  background: url(../assets/img/ic_no_data.png) no-repeat center;
  background-size: 50%;
  position: absolute;z-index: 10;
  left: 0;
  right: 0;
  top: $headerHeight;
  bottom: 0;
}
.topic-list{
  position: absolute;z-index: 11;
  left: 0;
  right: 0;
  top: $headerHeight;
  bottom: 0;
  overflow: auto;

  li{
    padding: 10px;
    border-bottom: 1px solid #eee;

    &.load-info{
      height: 40px;
      p{
        text-align: center;
        width: 100%;
      }
    }

    @at-root {
      .topic-title{
        line-height: 1.5;
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: bold;
        &:before{
          @extend %label;
        }
      }

      .topic-info{
        display: flex;
        align-items:center;
      }

      .author-photo{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img{
          max-height: 100%;
          max-width: 100%;
        }
      }

      .other-topic-info{
        flex: 1;
      }

      .topic-info-row{
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
