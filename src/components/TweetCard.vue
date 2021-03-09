// 推文卡片
<template>
  <div class="list-group-item">
    <div class="card-body">
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
          <!-- 如果是admin才顯示 -->
          <button 
          type="button" 
          class="close" 
          v-if="currentUser.role === 'admin'"
          @click.prevent.stop="deleteTweet"
          >
            <span>&times;</span>
          </button>
        </div>
        <!-- tweet description -->
        <div class="content-body">
          <!-- 是使用者才能取得連結 -->
          <router-link v-if="currentUser.role === 'user'" :to="{name: 'tweet', params: {id: tweet.id}}">
            <p>{{tweet.description}}</p>
          </router-link>
          <!-- 管理者不行 -->
          <template v-else>
            <p>{{tweet.description}}</p>
          </template>
        </div>
        <!-- 如果不是admin才顯示 -->
        <div class="content-footer" v-if="currentUser.role !== 'admin'">
          <!-- reply button -->
          <!-- dynamic data-target -->
          <div class="reply">
            <font-awesome-icon 
            class="icon" 
            icon="comment" 
            data-toggle="modal"
            :data-target="`#${replyingId}`" 
            />
            <span>{{tweet.repliesNumber}}</span>
          </div>
          <!-- 如果有like就顯示 -->
          <div class="liked" v-if="tweet.isLiked">
            <font-awesome-icon class="icon" icon="heart" @click.prevent.stop="deleteLike" />
            <span>{{tweet.likesNumber}}</span>
          </div>
          <!-- 如果沒like就顯示 -->
          <div class="like" v-else>
            <font-awesome-icon class="icon" icon="heart" @click.prevent.stop="addLike" />
            <span>{{tweet.likesNumber}}</span>
          </div>
        </div>
      </div>
    </div>
    <Replying 
    :replying-tweet="tweet" :replying-id="replyingId" />
  </div>
</template>

<script>
import Replying from './../components/Replying'
import { fromNowFilter } from './../utils/mixins'

// 當前使用者為管理者
const dummyCurrentUser = {
  currentUser: {
    id: 11, // 當前使用者id
    name: 'Allen', // 當前使用者名稱
    account: '@allen', // 當前使用者帳號
    avatar: 'https://cdn.voicetube.com/assets/thumbnails/aEvItEpMly8.jpg', // 當前使用者照片
    role: window.location.href.includes('admin')? 'admin' : 'user' // 透過當前路由先判斷當前使用者角色
  }
}

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
      replyingId: `replying${this.initialTweet.id}`,
      currentUser: dummyCurrentUser.currentUser
    }
  },
  methods: {
    addLike() {
      // api POST request ...
      this.$emit('after-add-like', this.tweet.id)
    },
    deleteLike() {
      // api POST request ...
      this.$emit('after-delete-like', this.tweet.id)
    },
    deleteTweet() {
      // api DELETE request ...
      this.$emit('after-delete-tweet', this.tweet.id)
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
  mixins: [fromNowFilter]
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
}

.user-name {
  margin-right: 10px;
}

.content-body {
  margin-bottom: 20px;
}

.content-footer {
  display: flex;
}

.icon {
  margin-right: 15px;
  cursor: pointer;
}

.reply {
  margin-right: 50px;
}


</style>