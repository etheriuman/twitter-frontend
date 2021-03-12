<template>
  <div class="main">
    <div class="column-left column">
      <Navbar @after-submit="handleAfterSubmit" />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead />
          <NewTweet @after-submit="handleAfterSubmit" />
          <p class="loading" v-if="isLoading">努力加載中...</p>
          <TweetCard
            v-else
            v-for="tweet in tweets"
            :key="tweet.id"
            :initial-tweet="tweet"
            @after-add-like="handleAfterAddLike"
            @after-delete-like="handleAfterDeleteLike"
            @after-reply="handleAfterReply"
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
import NewTweet from "./../components/NewTweet"
import TweetCard from "./../components/TweetCard"
import Recommendation from "./../components/Recommendation"
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  components: {
    Navbar,
    PageHead,
    NewTweet,
    TweetCard,
    Recommendation,
  },
  data() {
    return {
      tweets: [],
      isLoading: true
    }
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await tweetsAPI.getTweets()
        this.isLoading = false
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        this.tweets = response.data
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文，請稍後再試'
        })
        console.log(err)
      }
    },
    handleAfterSubmit() {
      this.fetchTweets()
    },
    handleAfterAddLike(tweetId) {
      console.log("add like");
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            isLiked: true,
            likesNumber: tweet.likesNumber + 1,
          };
        }
        return tweet;
      });
    },
    handleAfterDeleteLike(tweetId) {
      console.log("delete like");
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            isLiked: false,
            likesNumber: tweet.likesNumber - 1,
          };
        }
        return tweet;
      });
    },
    handleAfterReply(tweetId) {
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
  },
  created() {
    this.fetchTweets();
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