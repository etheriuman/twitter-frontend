// 使用者正在追隨者頁
<template>
  <div class="main">
    <div class="column-left column">
      <Navbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead :user="user" />
          <UserFollowsNavTabs />
          <UserCard
            v-for="following in followings"
            :key="following.id"
            :initial-follow="following"
            @afterDeleteFollow="handleAfterDeleteFollow"
          />
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
import UserCard from "./../components/UserCard";
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
const dummyData = [
  // 使用者追蹤者串
  {
    id: 1, // 追蹤者id
    name: "Sunny Chen", // 追蹤者名稱
    account: "@sunny", // 追蹤者帳號
    avatar: "https://randomuser.me/api/portraits/women/26.jpg", // 追蹤者照片
    introduction:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.", // 追蹤者簡介
    isFollowed: true, // 是否已追蹤
  },
  {
    id: 2, // 追蹤者id
    name: "Stacy Lee", // 追蹤者名稱
    account: "@stacy", // 追蹤者帳號
    avatar: "https://randomuser.me/api/portraits/women/13.jpg", // 追蹤者照片
    introduction:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.", // 追蹤者簡介
    isFollowed: true, // 是否已追蹤
  },
  {
    id: 3, // 追蹤者id
    name: "Doris Lee", // 追蹤者名稱
    account: "@doris", // 追蹤者帳號
    avatar: "https://randomuser.me/api/portraits/women/28.jpg", // 追蹤者照片
    introduction:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.", // 追蹤者簡介
    isFollowed: true, // 是否已追蹤
  },
  {
    id: 4, // 追蹤者id
    name: "Carey Lee", // 追蹤者名稱
    account: "@carey", // 追蹤者帳號
    avatar: "https://randomuser.me/api/portraits/women/16.jpg", // 追蹤者照片
    introduction:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.", // 追蹤者簡介
    isFollowed: true, // 是否已追蹤
  },
  {
    id: 5, // 追蹤者id
    name: "Yan Lee", // 追蹤者名稱
    account: "@yan", // 追蹤者帳號
    avatar: "https://randomuser.me/api/portraits/women/40.jpg", // 追蹤者照片
    introduction:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.", // 追蹤者簡介
    isFollowed: true, // 是否已追蹤
  },
];

export default {
  name: "UserFollowings",
  components: {
    Navbar,
    PageHead,
    UserFollowsNavTabs,
    UserCard,
    Recommendation,
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        tweetsNumber: 0,
      },
      followings: [],
    };
  },
  methods: {
    fetchUser(userId) {
      //透過userId取得使用者名稱與追蹤總推文數，將資料帶入PageHead
      const { id, name, tweetsNumber } = dummyUser;
      this.user.id = id;
      this.user.name = name;
      this.user.tweetsNumber = tweetsNumber;
      console.log(userId);
    },
    fetchFollowings(userId) {
      //透過userId取得使用者正在追蹤的清單
      this.followings = dummyData;
      console.log(userId);
    },
    handleAfterDeleteFollow(payLoad) {
      //串接後端api DELETE /followships/:followingId
      this.followings = this.followings.filter(
        (following) => payLoad !== following.id
      );
    },
  },
  created() {
    const { user: userId } = this.$route.params;
    this.fetchUser(userId);
    this.fetchFollowings(userId);
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