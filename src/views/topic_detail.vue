<template>
  <div>
    <my-header
      leftIconClass="icon-arrow-left"
      @leftIconClick="goBack"
      :title="title">
    </my-header>
    <div class="show-loading" v-if="loading"></div>
    <div class="topic-detail-container" v-else>
      <section class="info-wrap">
        <h2 class="topic-title" v-text="content.title"></h2>
        <div class="author-info">
          <img :src="content.author.avatar_url" alt="photo" class="author-photo">
          <div class="other-author-info">
            <div class="info-row">
                <span v-text="content.author.loginname" :class="label" class="author-name"></span>
                <i class="icon-like iconfont icon-like-empty"></i>
            </div>
            <div class="info-row">
              <p class="co-grey">
                <span>{{content.create_at | formatTopicTime}}</span>
                创建 ·
                <span v-text="content.visit_count"></span>次浏览
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="topic-content">
        <div class="markdown-body" v-html="content.content"></div>
      </section>
      <section class="reply-section">
        <p class="gap"></p>
        <p class="reply-header">
          <span v-text="content.reply_count"></span>条回复
        </p>
        <ul class="reply-list">
          <li class="reply-item" v-for="(reply,index) in replies">
            <div class="author-info">
              <div class="info-left">
                <img :src="reply.author.avatar_url" alt="photo" class="author-photo">
                <div>
                  <span v-text="reply.author.loginname"></span>
                  <p><span class="reply-floor" v-text="index+1+'楼'"></span> · <span>{{reply.create_at | formatTopicTime}}</span></p>
                </div>
              </div>
              <div class="info-right">
                <i class="iconfont icon-up"></i>
                <span class="up-count" v-text="reply.ups.length"></span>
                <i class="iconfont icon-reply"></i>
              </div>
            </div>
            <div class="reply-content">
              <div class="markdown-body" v-html="reply.content"></div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import MyHeader from 'components/my_header';
import { mapGetters } from 'vuex';
import { getLabel } from '../common/filter';
import api from '../common/api';

export default {
  data() {
    return {
      title: '话题',
      content: {
        author: {},
        replies: [{
          author: {},
          ups: [],
        }],
      },
      fetching: true,
    };
  },
  computed: {
    replies() {
      return this.content.replies;
    },
    label() {
      return getLabel(this.content);
    },
    loading() {
      return this.fetching || !this.transitionStatus.enter;
    },
    ...mapGetters(['transitionStatus']),
  },
  components: {
    MyHeader,
  },
  methods: {
    initData(id) {
      return api.fetchTopicDetail(id).then((res) => {
        this.content = res.data.data;
        this.fetching = false;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    const id = this.$route.params.id;
    this.initData(id);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable";
.show-loading{
  background: url(../assets/img/ic_no_data.png) no-repeat center;
  background-size: 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: $headerHeight;
  bottom: 0;
}
.topic-detail-container{
  margin-top: $headerHeight;
  overflow: hidden;
}
.info-wrap{
  padding: 0 $contentPadding;

  .topic-title{
    line-height: 1.5;
    margin: 10px 0;
    border-radius: 5px;
    font-size: 16px;
  }
}
.author-info{
  display: flex;
  align-items: center;
  justify-content: space-between;

  .author-photo{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 15px;
  }

  p{
    margin: 5px 0;
  }

  .other-author-info{
    flex: 1;

    .info-row{
      display: flex;
      justify-content: space-between;

      .author-name:before{
        @extend %label;
      }

      .icon-like{
        margin-right: 20px;
      }
    }
  }

}
.topic-content{
  padding: 0 $contentPadding;
}
.reply-section{
  margin-top: 30px;
}
.reply-header{
  height: 50px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 $contentPadding;
  font-size: 14px;
  color: #000;
  @include border;
}
.reply-item{
  padding: $contentPadding 0;
  @include border;

  .author-info,.reply-content{
    padding: 0 $contentPadding;
  }

  .info-left{
    display: flex;
    .reply-floor{
      color: $mainColor;
    }
  }

  .info-right{
    align-self: center;

    .icon-up{
      font-size: 18px;
    }
    .up-count{
      margin-right: 10px;
      font-size: 14px;
    }
    .icon-reply{
      font-size: 16px;
    }
  }
}
</style>
