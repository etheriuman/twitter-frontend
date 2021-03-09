// 使用者追隨者頁
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
            v-for="follower in followers"
            :key="follower.id"
            :initial-follow="follower"
            @afterAddFollow="handleAfterAddFollow"
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
}
const dummyData = [
  // 使用者追蹤者串
  {
    id: 1, // 追蹤者id
    name: "Amy Chen", // 追蹤者名稱
    account: "@amy", // 追蹤者帳號
    avatar: "https://randomuser.me/api/portraits/women/60.jpg", // 追蹤者照片
    introduction:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.", // 追蹤者簡介
    isFollowed: true, // 是否已追蹤
  },
  {
    id: 2, // 追蹤者id
    name: "Lisa Lee", // 追蹤者名稱
    account: "@lisa", // 追蹤者帳號
    avatar: "https://randomuser.me/api/portraits/women/6.jpg", // 追蹤者照片
    introduction:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.", // 追蹤者簡介
    isFollowed: false, // 是否已追蹤
  },
  {
    id: 3, // 追蹤者id
    name: "Sammi Lee", // 追蹤者名稱
    account: "@sammi", // 追蹤者帳號
    avatar: "https://randomuser.me/api/portraits/women/3.jpg", // 追蹤者照片
    introduction:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.", // 追蹤者簡介
    isFollowed: true, // 是否已追蹤
  },
]

export default {
  name: "UserFollowers",
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
        tweetsNumber: 0
      },
      followers:[]
    };
  },
  methods: {
    fetchUser(userId) {
     //透過userId取得使用者名稱與追蹤總推文數，將資料帶入PageHead
      const {id, name, tweetsNumber} = dummyUser
      this.user.id = id
      this.user.name = name
      this.user.tweetsNumber = tweetsNumber
      console.log(userId)
    },
    fetchFollowers(userId) {
      //透過userId取得api使用者追蹤者清單
      this.followers = dummyData;
      console.log(userId)
    },
    handleAfterAddFollow(payLoad) {
      //串接後端api POST /followships/:followingId
      this.followers = this.followers.map((follower) => {
        if (follower.id === payLoad) {
          return {
            ...follower,
            isFollowed: true,
          };
        }
        return follower;
      });
    },
    handleAfterDeleteFollow(payLoad) {
      //串接後端api DELETE /followships/:followingId
      this.followers = this.followers.map((follower) => {
        if (follower.id === payLoad) {
          return {
            ...follower,
            isFollowed: false,
          };
        }
        return follower;
      });
    },
  },
  created() {
    const {id: userId} = this.$route.params
    this.fetchUser( userId )
    this.fetchFollowers(userId)
  },
};
</script>

<style scoped>
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
  .column-right {
    display: none;
  }
}
</style>