// 使用者likes推文頁面
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
            :initial-user="user"
            @afterAddFollowed="handleAfterAddFollowed"
            @afterCancelFollowed="handleAfterCencelFollowed"
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
import Navbar from "./../components/Navbar";
import PageHead from "./../components/PageHead";
import UserProfile from "./../components/UserProfile";
import TweetCard from "./../components/TweetCard";
import Recommendation from "./../components/Recommendation";

const dummyUser = {
  //點擊的使用者個人資料
  id: 1,
  name: "John Doe",
  account: "@heyjohn",
  email: "helloworld@gmail.com", // 使用者email
  tweetsNumber: "12", // 使用者推文數
  avatar: "https://randomuser.me/portraits/women/17.jpg", // 使用者照片
  cover:
    "http://5b0988e595225.cdn.sohucs.com/images/20180914/9d15e25d6b1946f28b196f597e3002ba.jpeg", // 使用者封面照片
  introduction:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, ", // 使用者簡介
  followingsNumber: "26", // 使用者追蹤數
  followersNumber: 44, // 使用者跟隨數
  isFollowed: false, // 是否追蹤中
};
const dummyData = {
  tweets: [
    {
      id: 1, // 推文id
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?", // 推文內容
      likesNumber: 22, // 推文like數
      repliesNumber: 7, // 推文回覆數
      isLiked: true, // 是否按過like
      createdAt: "", // 推文發布時間
      User: {
        // 推主資料
        id: 20, // 推主連結用user.id
        name: "Nancy haiso", // 推主名稱
        account: "@nancy", // 推主帳號
        avatar: "https://randomuser.me/portraits/women/19.jpg", // 推主照片
      },
    },
    {
      id: 2, // 推文id
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?", // 推文內容
      likesNumber: 10, // 推文like數
      repliesNumber: 6, // 推文回覆數
      isLiked: true, // 是否按過like
      createdAt: "", // 推文發布時間
      User: {
        // 推主資料
        id: 14, // 推主連結用user.id
        name: "Katy haiso", // 推主名稱
        account: "@katy", // 推主帳號
        avatar: "https://randomuser.me/portraits/women/34.jpg", // 推主照片
      },
    },
    {
      id: 3, // 推文id
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?", // 推文內容
      likesNumber: 6, // 推文like數
      repliesNumber: 15, // 推文回覆數
      isLiked: true, // 是否按過like
      createdAt: "", // 推文發布時間
      User: {
        // 推主資料
        id: 21, // 推主連結用user.id
        name: "Rina haiso", // 推主名稱
        account: "@rina", // 推主帳號
        avatar: "https://randomuser.me/portraits/women/80.jpg", // 推主照片
      },
    },
  ],
};

export default {
  name: "UserLikes",
  components: {
    Navbar,
    PageHead,
    UserProfile,
    TweetCard,
    Recommendation,
  },
  data() {
    return {
      user: "",
      tweets: [],
    };
  },
  methods: {
    fetchUser(userId) {
      //透過userId取的api user資料
      this.user = dummyUser;
      console.log(userId);
    },
    fetchTweetsLiked(userId) {
      //透過userId取的api user喜歡的推文資料
      this.tweets = dummyData.tweets.filter((tweet) => (tweet.isLiked = true));
      console.log(userId);
    },
    handleAfterSubmit() {
      // 因為需要取得正確createdAt所以選擇重新fetch一次
      console.log("refetch");
      this.fetchTweetsLiked();
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
    handleAfterReply(replyData) {
      console.log("replied");
      console.log(replyData);
      const { tweetId } = replyData;
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          console.log("this tweet is", tweet);
          return {
            ...tweet,
            repliesNumber: tweet.repliesNumber + 1,
          };
        }
        return tweet;
      });
    },
    handleAfterAddFollowed() {
      this.user.isFollowed = true;
      //串接api，put資料更改user的追蹤狀態
      console.log(this.user);
    },
    handleAfterCencelFollowed() {
      this.user.isFollowed = false;
      //串接api，put資料更改user的追蹤狀態
      console.log(this.user);
    },
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
    this.fetchTweetsLiked(userId);
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