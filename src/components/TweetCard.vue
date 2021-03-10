// 推文卡片
<template>
  <div class="list-group-item">
    <div class="card-body">
      <div class="card-body-side">
        <!-- user avatar -->
        <router-link v-if="currentUser.role !== 'admin'" :to="{name: 'user-tweets', params: {id:tweet.User.id}}">
          <img class="avatar" :src="tweet.User.avatar" alt="">
        </router-link>
        <template v-else>
          <img class="avatar" :src="tweet.User.avatar" alt="">
        </template>
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
          @click.prevent.stop="deleteTweet(tweet.id)"
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
            <font-awesome-icon class="icon" icon="heart" @click.prevent.stop="deleteLike(tweet.id)" />
            <span>{{tweet.likesNumber}}</span>
          </div>
          <!-- 如果沒like就顯示 -->
          <div class="like" v-else>
            <font-awesome-icon class="icon" icon="heart" @click.prevent.stop="addLike(tweet.id)" />
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
import likesAPI from './../apis/likes'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import { fromNowFilter } from './../utils/mixins'


export default {
  components: {
    Replying
  },
  computed: {
    ...mapState(['currentUser'])
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
    }
  },
  methods: {
    // 按讚
    async addLike(tweetId) {
      try {
        const { data } = await likesAPI.addLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 回傳事件
        this.$emit('after-add-like', this.tweet.id)
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法按讚，請稍後再試'
        })
        console.log(err)
      }
    },
    // 取消讚
    async deleteLike(tweetId) {
      try {
        const { data } = await likesAPI.deleteLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 回傳事件
        this.$emit('after-delete-like', this.tweet.id)
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取消讚，請稍後再試'
        })
        console.log(err)
      }
    },
    // 管理員刪除推文
    async deleteTweet(tweetId) {
      try {
        const { data } = await adminAPI.deleteTweets({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 回傳事件
        this.$emit('after-delete-tweet', this.tweet.id)
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除推文，請稍後再試'
        })
        console.log(err)
      }
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