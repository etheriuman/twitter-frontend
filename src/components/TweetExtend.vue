// 推文卡片
<template>
  <div class="list-group-item" v-if="!isLoading">
    <div class="card-body">
      <div class="card-body-content">
        <!-- tweetCard header -->
        <!-- user avatar -->
        <div class="content-header">
          <router-link :to="{name: 'user-tweets', params: {id:tweet.User.id}}">
            <img class="avatar" :src="tweet.User.avatar | emptyImage" alt="">
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
          <div class="content-footer text-lg">
            <div class="reply">
              <font-awesome-icon 
              class="icon" 
              icon="comment" 
              data-toggle="modal"
              :data-target="`#${replyingId}`" 
              />
            </div>
            <!-- 假like -->
            <div class="like text-muted" v-if="isProcessing">
              <font-awesome-icon class="icon" icon="heart"/>
            </div>
            <template v-else>
              <!-- 如果有like就顯示 -->
              <div class="liked" v-if="tweet.isLiked">
                <font-awesome-icon class="icon" icon="heart" @click.prevent.stop="deleteLike(tweet.id)" />
              </div>
              <!-- 如果沒like就顯示 -->
              <div class="like" v-else>
                <font-awesome-icon class="icon" icon="heart" @click.prevent.stop="addLike(tweet.id)" />
              </div>
            </template>
          </div>
        </div>
    </div>
    <Replying :replying-tweet="tweet" :replying-id="replyingId" />
  </div>
</template>

<script>
import Replying from './../components/Replying'
import { fromNowFilter, momentFilter, emptyImageFilter } from './../utils/mixins'
import likesAPI from './../apis/likes'
import { Toast } from './../utils/helpers'

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
      replyingId: '',
      isLoading: true,
      isProcessing: false
    }
  },
  methods: {
    // 按讚
    async addLike(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await likesAPI.addLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isProcessing = false
        // 回傳事件
        this.$emit('after-add-like', this.tweet.id)
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法按讚，請稍後再試'
        })
        this.isProcessing = false
        console.log(err)
      }
    },
    // 取消讚
    async deleteLike(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await likesAPI.cancelLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isProcessing = false
        // 回傳事件
        this.$emit('after-delete-like', this.tweet.id)
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取消讚，請稍後再試'
        })
        this.isProcessing = false
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
      this.replyingId = `replying${data.id}`
      this.isLoading = false
    }
  },
  mixins: [fromNowFilter, momentFilter, emptyImageFilter]
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