// 使用者追蹤者頁
<template>
  <div class="main">
    <div class="column-left column">
      <Navbar @after-submit="handleAfterSubmit" />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead :user="user" />
          <UserFollowsNavTabs />
        </ul>
      </div>
    </div>
    <div class="column-right column">
      <Recommendation :user-id="user.id" />
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import PageHead from "./../components/PageHead";
import UserFollowsNavTabs from "./../components/UserFollowsNavTabs.vue";
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

export default {
  name: "UserTweets",
  components: {
    Navbar,
    PageHead,
    UserFollowsNavTabs,
    Recommendation,
  },
  data() {
    return {
      user: "",
    };
  },
  methods: {
    fetchUser() {
      this.user = dummyUser;
    },
    handleAfterSubmit() {
      // 因為需要取得正確createdAt所以選擇重新fetch一次
      console.log("refetch");
      this.fetchTweets();
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>

<style scoped>
* {
  outline: 1px solid pink;
}

.main {
  max-height: 100vh;
  display: grid;
  grid-template-columns: 220px 1fr 300px;
  grid-template-areas: "left main right";
}

.main-content {
  width: 90%;
  max-height: 100vh;
  overflow: auto;
  /* hide from firefox */
  scrollbar-width: none;
}

.main-content::-webkit-scrollbar {
  /* hide from chrome */
  display: none;
}

.column {
  display: flex;
}

.column-left {
  grid-area: left;
  justify-content: flex-end;
}

.column-main {
  grid-area: main;
  justify-content: center;
}

.column-right {
  grid-area: right;
  justify-content: flex-start;
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
}
</style>