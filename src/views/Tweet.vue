<template>
  <div class="main">
    <div class="column-left column">
      <Navbar @after-submit="handleAfterSubmit" />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead />
          <TweetExtend
            :initial-tweet="tweet"
            @after-add-like="handleAfterAddLike"
            @after-delete-like="handleAfterDeleteLike"
            @after-reply="handleAfterReply"
          />
          <ReplyCard
            v-for="reply in tweet.Replies"
            :key="reply.id"
            :reply="reply"
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
import Navbar from './../components/Navbar'
import PageHead from './../components/PageHead'
import Recommendation from './../components/Recommendation'
import TweetExtend from './../components/TweetExtend'
import ReplyCard from './../components/ReplyCard'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  components: {
    Navbar,
    PageHead,
    Recommendation,
    TweetExtend,
    ReplyCard,
  },
  data() {
    return {
      tweet: {},
    };
  },
  methods: {
    handleAfterSubmit() {
      console.log("new tweet uploaded");
    },
    async fetchTweet(tweetId) {
      try {
        const response = await tweetsAPI.getTweet({ tweetId })
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        this.tweet = response.data
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資訊，請稍後再試'
        })
        console.log(err)
      }
    },
    handleAfterAddLike() {
      console.log("add like");
      this.tweet = {
        ...this.tweet,
        isLiked: true,
        likesNumber: this.tweet.likesNumber + 1,
      };
    },
    handleAfterDeleteLike() {
      console.log("delete like");
      this.tweet = {
        ...this.tweet,
        isLiked: false,
        likesNumber: this.tweet.likesNumber - 1,
      };
    },
    handleAfterReply(tweetId) {
      // 重新抓取資料
      this.fetchTweet(tweetId)
    },
  },
  created() {
    const { id } = this.$route.params
    this.fetchTweet(id)
  },
};
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