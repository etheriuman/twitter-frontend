// 推文卡片
<template>
  <div class="list-group-item">
    <div class="card-body">
      <div class="card-body-content">
        <!-- tweetCard header -->
        <!-- user avatar -->
        <div class="content-header">
          <router-link :to="{name: 'user-tweets', params: {id:tweet.User.id}}">
            <img class="avatar" :src="tweet.User.avatar" alt="">
          </router-link>
          <div class="content-header-description">
            <p><span class="user-name">{{tweet.User.name}}</span></p>
            <p><span class="text-muted">{{tweet.User.account}}</span></p>
          </div>
        </div>
        <!-- tweet description -->
        <div class="content-body">
          <p class="description text-exlg">{{tweet.description}}</p>
          <p>
            <span class="text-muted">{{tweet.createdAt | time}}</span>
            <span class="text-muted"> &#8231; </span>
            <span class="text-muted">{{tweet.createdAt | date}}</span>
          </p>
        </div>
        <div class="content-belly">
          <!-- reply button -->
          <!-- dynamic data-target -->
            <span class="text-lg">{{tweet.repliesNumber}} <span class="text-muted">回覆</span></span>
            <span class="text-lg">{{tweet.likesNumber}} <span class="text-muted">喜歡次數</span></span>
          </div>
          <!-- 如果有like就顯示 -->
          <div class="content-footer text-lg">
            <div class="reply">
              <font-awesome-icon 
              class="icon" 
              icon="comment" 
              data-toggle="modal"
              :data-target="`#${replyingId}`" 
              />
            </div>
            <div class="liked" v-if="tweet.isLiked">
              <font-awesome-icon class="icon" icon="heart" @click.prevent.stop="deleteLike" />
            </div>
            <!-- 如果沒like就顯示 -->
            <div class="like" v-else>
              <font-awesome-icon class="icon" icon="heart" @click.prevent.stop="addLike" />
            </div>
          </div>
        </div>
    </div>
    <Replying :replying-tweet="tweet" :replying-id="replyingId" />
  </div>
</template>

<script>
import Replying from './../components/Replying'
import { fromNowFilter, momentFilter } from './../utils/mixins'

export default {
  components: {
    Replying
  },
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tweet: this.initialTweet,
      replyingId: `replying${this.initialTweet.id}`
    }
  },
  methods: {
    addLike() {
      this.$emit('after-add-like', this.tweet.id)
    },
    deleteLike() {
      this.$emit('after-delete-like', this.tweet.id)
    }
  },
  watch: {
    initialTweet(data) {
      this.tweet = {
        ...this.tweet,
        ...data
      }
    }
  },
  mixins: [fromNowFilter, momentFilter]
}
</script>

<style scoped>

.card-body {
  position: relative;
  display: flex;
  padding: 5px 10px 10px 10px;
}

.card-body-side {
  width: 60px;
  height: 100%;
  text-align: center;
}

.card-body-content {
  width: 100%;
  height: 100%;
  padding-left: 10px;
}

.content-header {
  margin-bottom: 10px;
  display: flex;
}

.content-header p {
  padding-left: 10px;
}

.user-name {
  margin-right: 10px;
}

.content-body p {
  margin-bottom: 20px;
}

.content-belly {
  padding: 15px 0 15px 0;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}

.content-belly span span {
  margin-right: 20px;
}

.content-footer {
  display: flex;
  padding-top: 10px;
}

.icon {
  margin-right: 15px;
  cursor: pointer;
}

.reply {
  margin-right: 90px;
}


</style>