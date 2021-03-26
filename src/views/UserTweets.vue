<template>
  <div class="main">
    <div class="column-left column">
      <Navbar @after-submit="handleAfterSubmit" />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead :user="user" />
          <UserProfile
            v-show="!userIsLoading&&!tweetsIsLoading"
            :initial-user="user"
            @afterSubmit="afterHandleSubmit"
          />
          <TweetCard
            v-for="tweet in tweets"
            :key="tweet.id"
            :initial-tweet="tweet"
            @after-add-like="handleAfterAddLike"
            @after-delete-like="handleAfterDeleteLike"
          />
        </ul>
      </div>
    </div>
    <div class="column-right column">
      <Recommendation />
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar"
import PageHead from "./../components/PageHead"
import UserProfile from "./../components/UserProfile"
import TweetCard from "./../components/TweetCard"
import Recommendation from "./../components/Recommendation"
import usersAPI from "./../apis/users.js"
import { Toast } from "./../utils/helpers.js"

export default {
  name: "UserTweets",
  components: {
    Navbar,
    PageHead,
    UserProfile,
    TweetCard,
    Recommendation,
  },
  data() {
    return {
      user: {},
      tweets: [],
      userIsLoading: true,
      tweetsIsLoading: true,
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        const {data} = await usersAPI.get({userId})
        this.user = data
        this.userIsLoading = false
      } catch (error) {
        this.userIsLoading = false
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }  
    },
    async fetchTweets(userId) {
      try {
        const {data} = await usersAPI.getTweets({userId})
        this.tweets = data
        this.tweetsIsLoading = false
      } catch (error) {
        this.tweetsIsLoading = false
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法取得使用者推文資料，請稍後再試'
        })
      }
    },
    handleAfterSubmit() {
      // 因為需要取得正確createdAt所以選擇重新fetch一次
      console.log("refetch")
      this.fetchTweets()
    },
    handleAfterAddLike(tweetId) {
      console.log("add like")
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            isLiked: true,
            likesNumber: tweet.likesNumber + 1,
          }
        }
        return tweet
      })
    },
    handleAfterDeleteLike(tweetId) {
      console.log("delete like")
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            isLiked: false,
            likesNumber: tweet.likesNumber - 1,
          }
        }
        return tweet
      })
    },
    handleAfterReply(replyData) {
      console.log("replied")
      console.log(replyData)
      const { tweetId } = replyData
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          console.log("this tweet is", tweet)
          return {
            ...tweet,
            repliesNumber: tweet.repliesNumber + 1,
          }
        }
        return tweet
      })
    },
    afterHandleSubmit() {
      const { id: userId } = this.$route.params
      this.fetchUser(userId)
    }
  },
  //監聽切換頁面的事件
  beforeRouteUpdate(to,from,next) {
    const {id : userId} = to.params
    this.fetchUser(userId)
    next()
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
    this.fetchTweets(userId)
  },
}
</script>

<style scoped>
.main {
  grid-template-columns: 220px 1fr 300px;
  grid-template-areas: "left main right";
}

/* pad 尺寸 */
@media screen and (max-width: 992px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "main right"
      "left left";
  }
}

/* mobile 尺寸 */
@media screen and (max-width: 768px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "main main"
      "left left";
  }
  .column-right {
    display: none;
  }
}
</style>