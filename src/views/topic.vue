<template>
  <div>
    <my-header :title="title" leftIconClass="icon-nav" @leftIconClick="onLeftIconClick"></my-header>
    <ul class="topic-list">
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
  </div>
</template>
<script>
import MyHeader from 'components/my-header';
import api from '../common/api';
import { getLabel, formatLabel } from '../common/filter';

export default{
  data() {
    return {
      topics: [],
      pageInfo: {
        page: 1,
        limit: 30,
        tab: 'all',
        mdrender: false,
      },
    };
  },
  computed: {
    title() {
      return this.formatLabel(this.pageInfo.tab);
    },
  },
  components: {
    MyHeader,
  },
  methods: {
    /* eslint-disable no-console */
    onLeftIconClick() {
      console.log('left Icon Clicked!');
    },
    initData() {
      api.fetchTopic(this.pageInfo)
        .then((res) => {
          this.topics = res.data.data;
        });
    },
    getLabel,
    formatLabel,
  },
  mounted() {
    this.initData();
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/style/variable';
.topic-list{
  margin-top: $headerHeight;

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
