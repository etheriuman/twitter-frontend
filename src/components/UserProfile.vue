// 使用者頁面上方的資訊卡片
<template>
  <div class="user-profile">
    <div class="card" style="width: 100%">
      <img
        class="card-img-top"
        :src="user.cover"
        alt="Card image cap"
        style="height: 200px"
      />
      <div class="profile card-body">
        <img :src="initialUser.avatar" class="avatar mb-5" alt="avatar" />
        <div class="button-group" v-if="currentUser.id !== initialUser.id">
          <button type="button" class="user-mail btn btn-outline-primary">
            <font-awesome-icon icon="envelope" />
          </button>
          <button
            type="button"
            class="user-subscription btn btn-outline-primary"
          >
            <font-awesome-icon icon="bell" />
          </button>
          <button
            v-if="!user.isFollowed"
            @click.prevent.stop="addFollowed"
            type="button"
            class="user-follow btn btn-outline-primary"
          >
            追蹤
          </button>
          <button
            v-else
            @click.prevent.stop="cancelFollowed"
            type="button"
            class="user-follow btn btn-outline-primary"
          >
            正在追蹤
          </button>
        </div>
        <button
          v-if="currentUser.id === initialUser.id"
          type="button"
          class="newTweet btn btn-outline-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          編輯個人資料
        </button>
        <div class="profile-description">
          <p class="user-name">{{ user.name }}</p>
          <p class="user-account mb-2">{{ user.account }}</p>
          <p class="user-intro mb-2">
            {{ user.introduction }}
          </p>
          <div class="follow">
            <router-link to="/users/:id/followings">
              <span>{{ user.followingsNumber }}個</span>跟隨中
            </router-link>
            <router-link to="/users/:id/followers">
              <span>{{ user.followersNumber }}位</span>跟隨者
            </router-link>
          </div>
        </div>
      </div>
      <UserProfileNavTabs />
    </div>
    <UserProfileEdiiting
      :initial-current-user="currentUser"
      @afterSubmit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import UserProfileNavTabs from "./UserProfileNavTabs.vue";
import UserProfileEdiiting from "./UserProfileEditing";

const dummyCurrentUser = {
  //設定currentUser，判斷如果是使用者的話則可以編輯個人資料
  id: 1,
  name: "John Doe",
  account: "@heyjohn",
  email: "helloworld@gmail.com", // 當前使用者email
  tweetsNumber: "12", // 當前使用者推文數
  avatar: "https://randomuser.me/portraits/women/17.jpg", // 當前使用者照片
  cover:
    "http://5b0988e595225.cdn.sohucs.com/images/20180914/9d15e25d6b1946f28b196f597e3002ba.jpeg", // 當前使用者封面照片
  introduction:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, ", // 當前使用者簡介
  followingsNumber: "26", // 當前使用者追蹤數
  followersNumber: 44, // 當前使用者跟隨數
};

export default {
  name: "UserProfile",
  components: {
    UserProfileNavTabs,
    UserProfileEdiiting,
  },
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentUser: "",
      user: this.initialUser,
    };
  },
  methods: {
    fetchCurrentUser() {
      this.currentUser = dummyCurrentUser;
    },
    addFollowed() {
      this.user.isFollowed = true;
      this.$emit("afterAddFollowed");
    },
    cancelFollowed() {
      this.user.isFollowed = false;
      this.$emit("afterCancelFollowed");
    },
    handleAfterSubmit(formData) {
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
  },
  created() {
    this.fetchCurrentUser();
  },
};
</script>



<style scoped>
a {
  color: #657786;
}
p {
  margin: 0;
}
.user-name {
  font-size: 18px;
  font-weight: 700;
}
.profile-twittersCount {
  font-size: 13px;
  color: #657786;
}
.card-img-top {
  object-fit: cover;
}
.avatar {
  position: absolute;
  top: -70px;
  width: 120px;
  height: 120px;
  border: 2px solid white;
  border-radius: 50%;
  object-fit: cover;
}
.btn-outline-primary {
  color: #ff6600;
  border-color: #ff6600;
  border-radius: 90px;
}
.btn-outline-primary:hover,
.btn-outline-primary:focus,
.btn-outline-primary:active:hover {
  color: #fff;
  background-color: #ff6600;
  border-color: #ff6600;
  border-radius: 90px;
}
.newTweet {
  position: absolute;
  right: 5%;
}
.button-group {
  position: absolute;
  right: 5%;
}
.user-account {
  font-size: 15px;
  color: #657786;
}
.user-intro {
  font-size: 14px;
}
.follow {
  font-size: 14px;
  color: #657786;
}
.follow span {
  color: #000000;
  font-weight: 500;
}
.profile {
  position: relative;
  height: 200px;
}
.profile-description {
  position: relative;
  top: 2rem;
}
</style>