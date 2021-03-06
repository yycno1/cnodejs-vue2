<template>
  <div>
    <my-header
      leftIconClass="icon-arrow-left"
      @leftIconClick="goBack"
      :title="title">
    </my-header>
    <loading :ready="!fetching" @loadingChange="handleLoadingChange"></loading>
    <div class="topic-detail-container" v-show="showContent" ref="topicDetailContainer">
      <section class="info-wrap">
        <h2 class="topic-title" v-text="content.title"></h2>
        <div class="author-info">
          <router-link :to="'/user/' + content.author.loginname">
            <img :src="content.author.avatar_url" alt="photo" class="author-photo">
          </router-link>
          <div class="other-author-info">
            <div class="info-row">
              <router-link :to="'/user/' + content.author.loginname">
                <span v-text="content.author.loginname" :class="label" class="author-name"></span>
              </router-link>
              <i
                class="icon-like iconfont"
                :class="isCollect ? 'icon-like-full' : 'icon-like-empty'"
                @click="toggleCollect(content.id)">
              </i>
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
                <router-link :to="'/user/' + reply.author.loginname">
                  <img :src="reply.author.avatar_url" alt="photo" class="author-photo">
                </router-link>
                <div>
                  <router-link :to="'/user/' + reply.author.loginname">
                    <span v-text="reply.author.loginname"></span>
                  </router-link>
                  <p><span class="reply-floor" v-text="index+1+'楼'"></span> · <span>{{reply.create_at | formatTopicTime}}</span></p>
                </div>
              </div>
              <div class="info-right">
                <i class="iconfont icon-up" @click="toggleUps(reply.id)"></i>
                <span class="up-count" v-text="reply.ups.length"></span>
                <i class="iconfont icon-reply" @click="handleReplyReplies(reply)"></i>
              </div>
            </div>
            <div class="reply-content">
              <div class="markdown-body" v-html="reply.content"></div>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <x-dialog v-model="showReplyInput">
      <p class="text-overflow">回复 <span>{{replyTarget}}</span></p>
      <div class="reply-input">
        <textarea v-model="replyContent" placeholder="说点什么吧..."></textarea>
      </div>
      <div slot="footer">
        <a class="dialog-button cancel-button" @click="showReplyInput = false">取消</a>
        <a class="dialog-button confirm-button" @click="handleSubmit">确定</a>
      </div>
    </x-dialog>
    <reply-button v-show="showReplyButton" @click.native="handleReplyTopic"></reply-button>
  </div>
</template>

<script>
import MyHeader from 'components/my_header';
import Loading from 'components/loading';
import XDialog from 'components/dialog';
import ReplyButton from 'components/replyButton';
import { mapGetters } from 'vuex';
import { getLabel } from '../common/filter';
import api from '../common/api';

export default {
  name: 'topicDetail',

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
      isCollect: false,
      fetching: false,
      showContent: false,
      showReplyInput: false,
      replyType: 0, // 0: 回复话题 1: 回复评论
      replyContent: '',
      replyTarget: '',
      reply_id: '',

      showReplyButton: true,
    };
  },
  computed: {
    replies() {
      return this.content.replies;
    },
    label() {
      return getLabel(this.content);
    },
    ...mapGetters(['transitionStatus', 'token', 'isLogin']),
  },
  components: {
    MyHeader,
    Loading,
    XDialog,
    ReplyButton,
  },
  methods: {
    initData(id) {
      this.fetching = true;
      return api.fetchTopicDetail(id, this.token).then((res) => {
        this.content = res.data.data;
        this.isCollect = this.content.is_collect;
        this.fetching = false;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    toggleCollect(id) {
      if (!this.checkLogin()) {
        return;
      }

      const postData = {
        accesstoken: this.token,
        topic_id: id,
      };

      if (this.isCollect) {
        api.deCollectTopic(postData)
          .then(({ data }) => {
            console.log(data);
            if (data.success) {
              console.log('取消收藏成功');
              this.isCollect = false;
            } else {
              console.log('取消收藏失败');
            }
          });
      } else {
        api.collectTopic(postData)
          .then(({ data }) => {
            console.log(data);
            if (data.success) {
              console.log('收藏成功');
              this.isCollect = true;
            } else {
              console.log('收藏失败');
            }
          });
      }
    },
    interceptMDLink() {
      const vm = this;
      function handleLinkClick(event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'a') {
          const href = target.getAttribute('href');
          if (href && !/^https?:\/\//.test(href)) {
            event.preventDefault();
            vm.$router.push(href);
          }
        }
      }
      const markdownBody = document.querySelectorAll('.markdown-body');
      for (const node of markdownBody) {
        node.addEventListener('click', handleLinkClick, false);
      }
    },
    toggleUps(replyId) {
      if (!this.checkLogin()) {
        return;
      }

      api.ups(replyId, this.token)
        .then(({ data }) => {
          if (data.success) {
            console.log(data.action);
            if (data.action === 'up') {
              console.log('asdasd');
            }
          } else {
            console.log('点赞失败');
          }
        });
    },
    checkLogin() {
      const isLogin = this.isLogin;
      if (!isLogin) {
        this.$confirm('该操作需要登录账户，是否现在登录?', () => {
          this.$router.push('/login');
        });
      }
      return isLogin;
    },
    listenScroll() {
      const node = this.$refs.topicDetailContainer;
      const vm = this;
      let scrollTop = node.scrollTop;

      function handleScroll() {
        const newScrollTop = node.scrollTop;
        if (newScrollTop === scrollTop) {
          return;
        }
        if (newScrollTop > scrollTop) {
          vm.showReplyButton = false;
        } else {
          vm.showReplyButton = true;
        }
        scrollTop = newScrollTop;
      }

      node.addEventListener('scroll', handleScroll);
    },
    handleLoadingChange(payload) {
      this.showContent = payload.isLoaded;
    },
    handleReplyReplies(reply) {
      if (!this.checkLogin()) {
        return;
      }
      this.replyType = 1;
      this.replyTarget = reply.author.loginname;
      this.replyContent = `@${reply.author.loginname}`;
      this.reply_id = reply.id;
      this.showReplyInput = true;
    },
    handleReplyTopic() {
      if (!this.checkLogin()) {
        return;
      }
      this.replyType = 0;
      this.replyTarget = `话题：${this.content.title}`;
      this.replyContent = '';
      this.showReplyInput = true;
    },
    handleSubmit() {
      this.showReplyInput = false;
      const submitData = {
        accesstoken: this.token,
        content: this.replyContent,
      };
      if (this.replyType === 1) {
        submitData.reply_id = this.reply_id;
      } else {
        submitData.reply_id = '';
      }
      api.reply(this.content.id, submitData);
    },
  },
  created() {
    const id = this.$route.params.id;
    this.initData(id);
  },
  mounted() {
    this.$watch('showContent', (newVal) => {
      if (newVal) {
        this.interceptMDLink();
      }
    }, { immediate: true });

    this.listenScroll();
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
  position: absolute;
  top: $headerHeight;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
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

      &.active{
        color: $mainColor;
      }
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

.reply-input{
  textarea{
    width: 100%;
    height: 100px;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
}
.dialog-button{
  margin: 0 10px;
  font-size: 12px;
  color: $mainColor;
}
.confirm-button{
  color: $mainColor;
}
.cancel-button{
  color: #777;
}
</style>
