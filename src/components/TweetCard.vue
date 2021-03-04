// 推文卡片
<template>
  <div class="list-group-item">
    <form class="card-body">
      <div class="card-body-side">
        <!-- user avatar -->
        <router-link :to="{name: 'user-tweets', params: {id:tweet.User.id}}">
          <img class="avatar" :src="tweet.User.avatar" alt="">
        </router-link>
      </div>
      <div class="card-body-content">
        <!-- tweetCard header -->
        <div class="content-header">
          <span class="user-name">{{tweet.User.name}}</span>
          <span class="text-muted">{{tweet.User.account}}</span>
          <span class="text-muted"> &#8231; </span>
          <span class="text-muted">{{tweet.createdAt | fromNow}}</span>
        </div>
        <!-- tweet description -->
        <div class="content-body">
          <p>{{tweet.description}}</p>
        </div>
        <div class="content-footer">
          <!-- reply button -->
          <div class="reply">
            <font-awesome-icon class="icon" icon="comment" />
            <span>{{tweet.repliesNumber}}</span>
          </div>
          <!-- 如果有like就顯示 -->
          <div class="liked" v-if="tweet.isLiked">
            <font-awesome-icon class="icon" icon="heart" @click.prevent.stop="toggleIsLiked" />
            <span>{{tweet.likesNumber}}</span>
          </div>
          <!-- 如果沒like就顯示 -->
          <div class="like" v-else>
            <font-awesome-icon class="icon" icon="heart" @click.prevent.stop="toggleIsLiked" />
            <span>{{tweet.likesNumber}}</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'

export default {
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tweet: this.initialTweet
    }
  },
  methods: {
    toggleIsLiked() {
      // api POST request
      this.tweet = {
        ...this.tweet,
        isLiked: !this.tweet.isLiked
      }
    }
  },
  mixins: [fromNowFilter]
}
</script>

<style scoped>

.list-group-item {
  padding: 0;
}

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
}

.user-name {
  margin-right: 10px;
}

.content-footer {
  display: flex;
}

.icon {
  margin-right: 15px;
  cursor: pointer;
}

.liked {
  color: #e0345e
}

.reply {
  margin-right: 50px;
}

/* 統一屬性 */
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}


</style>