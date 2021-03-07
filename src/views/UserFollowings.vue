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
            v-for="following in user.followings"
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
  user: {
    id: 1,
    name: "John Doe",
    tweetsNumber: "12", // 使用者推文數
    followings: [
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
    ],
  },
};

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
      user: "",
    };
  },
  methods: {
    fetchUser() {
      this.user = dummyUser.user;
    },
    handleAfterDeleteFollow(payLoad) {
      //串接後端api DELETE /followships/:followingId
      this.user.followings = this.user.followings.filter(
        (following) => payLoad !== following.id
      );
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