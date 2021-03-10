<template>
  <div class="main">
    <div class="column-left column">
      <AdminNavbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead />
          <TweetCard
            v-for="tweet in tweets"
            :key="tweet.id"
            :initial-tweet="tweet"
            @after-delete-tweet="handleAfterDeleteTweet"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import PageHead from "./../components/PageHead";
import TweetCard from "./../components/TweetCard";
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'


export default {
  components: {
    AdminNavbar,
    PageHead,
    TweetCard,
  },
  data() {
    return {
      tweets: [],
    };
  },
  methods: {
    async fetchTweets() {
      try{
        const response = await adminAPI.getTweets()
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        this.tweets = response.data
        console.log(response.data)
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文串，請稍後再試'
        })
      }
    },
    handleAfterDeleteTweet(tweetId) {
      this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
    },
  },
  created() {
    this.fetchTweets();
  },
};
</script>

<style scoped>
.main {
  grid-template-columns: 220px 1fr;
  grid-template-areas: "left main";
}

/* pad 尺寸 */
@media screen and (max-width: 992px) {
  .column-left {
    outline-width: 0;
  }
}

/* mobile 尺寸 */
@media screen and (max-width: 768px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "main main"
      "left left";
  }
  .column-left {
    outline-width: 1px;
  }
  .column-right {
    display: none;
  }
}
</style>