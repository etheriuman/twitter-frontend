<template>
  <div class="user-profile">
    <div class="card" style="width: 100%">
      <img
        class="card-img-top"
        :src="user.cover | emptyImage"
        alt="Card image cap"
        style="height: 200px"
      />
      <div class="profile card-body">
        <img :src="user.avatar | emptyImage" class="avatar mb-5" alt="avatar" />
        <div class="button-group" v-if="currentUser.id != user.id">
          <button type="button" class="user-mail btn btn-outline-primary">
            <router-link :to="{name: 'chat-private', params: {id: user.id}}">
              <font-awesome-icon class="chat-private" icon="envelope" />
            </router-link>
          </button>
          <!-- 訂閱按鈕 -->
          <!-- 假按鈕 -->
          <button
            v-if="subscribeIsProcessing"
            type="button"
            class="user-subscription btn btn-outline-primary"
            disabled
          >
            <font-awesome-icon icon="bell" />
          </button>
          <!-- 真按鈕 -->
          <template v-else>
            <button
              v-if="!user.isSubscribed"
              type="button"
              class="user-subscription btn btn-outline-primary"
              @click.prevent.stop="addSubscribe(user.id)"
            >
              <font-awesome-icon icon="bell" />
            </button>
            <button
              v-else
              type="button"
              class="user-subscription btn btn-primary"
              @click.prevent.stop="cancelSubscribe(user.id)"
            >
              <font-awesome-icon icon="bell" />
            </button>
          </template>
          <!-- 追蹤按鈕 -->
          <!-- 假按鈕 -->
          <button
            v-if="followIsProcessing"
            type="button"
            class="user-follow btn btn-outline-primary"
            disabled
          >
            處理中
          </button>
          <!-- 真按鈕 -->
          <template v-else>
            <button
              v-if="!user.isFollowed"
              @click.prevent.stop="addFollowed(user.id)"
              type="button"
              class="user-follow btn btn-outline-primary"
            >
              追蹤
            </button>
            <button
              v-else
              @click.prevent.stop="cancelFollowed(user.id)"
              type="button"
              class="user-follow btn btn-primary"
            >
              正在追蹤
            </button>
          </template>
        </div>
        <!-- 編輯個人資料 -->
        <button
          v-if="currentUser.id == user.id"
          type="button"
          class="newTweet btn btn-outline-primary"
          data-toggle="modal"
          data-target="#userEditing"
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
            <router-link :to="{name:'user-followers', params:{id:user.id}}">
              <span>{{ user.followersNumber }}位</span>跟隨者
            </router-link>
            <router-link :to="{name:'user-followings', params:{id:user.id}}">
              <span>{{ user.followingsNumber }}個</span>正在跟隨
            </router-link>
          </div>
        </div>
      </div>
      <UserProfileNavTabs v-if="user.id" :user="user"/>
    </div>
    <UserProfileEdiiting />
  </div>
</template>

<script>
import UserProfileNavTabs from "./UserProfileNavTabs.vue"
import UserProfileEdiiting from "./UserProfileEditing"
import { emptyImageFilter } from "./../utils/mixins.js"
import followAPI from "./../apis/follow.js"
import subscribeAPI from './../apis/subscribe.js'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: "UserProfile",
  mixins: [emptyImageFilter],
  components: {
    UserProfileNavTabs,
    UserProfileEdiiting,
  },
  props: {
    initialUser: {
      type: Object,
      default: undefined
    },
  },
  data() {
    return {
      user: {},
      followIsProcessing: false,
      subscribeIsProcessing: false
    }
  },
  methods: {
    fetchUser() {
      this.user = this.initialUser
    },
    // 加入追蹤
    async addFollowed(payLoad) {
      try {
        this.followIsProcessing = true
        const {data} = await followAPI.addFollow({payLoad})
        this.user.followersNumber = this.user.followersNumber + 1
        this.followIsProcessing = false
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.user.isFollowed = true
      } catch (error) {
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法將使用者加入追蹤，請稍後再試'
        })
        this.followIsProcessing = false
      }      
    },
    // 取消追蹤
    async cencelFollowed(userId) {
      try {
        this.followIsProcessing = true
        const {data} = await followAPI.removeFollow({followId:userId})
        this.user.followersNumber = this.user.followersNumber - 1
        this.followIsProcessing = false
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.user.isFollowed = false
      } catch (error) {
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法將使用者移除追蹤，請稍後再試'
        })
        this.followIsProcessing = false
      } 
    },
    // 加入訂閱
    async addSubscribe(payLoad) {
      try {
        this.subscribeIsProcessing = true
        const {data} = await subscribeAPI.addSubscribe({ payLoad })
        this.subscribeIsProcessing = false
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.user.isFollowed = true
      } catch (error) {
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法將使用者加入訂閱，請稍後再試'
        })
        this.subscribeIsProcessing = false
      }      
    },
    // 取消訂閱
    async cencelSubscribe(userId) {
      try {
        this.subscribeIsProcessing = true
        const {data} = await subscribeAPI.removeSubscribe({ followId:userId })
        this.subscribeIsProcessing = false
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.user.isFollowed = false
      } catch (error) {
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法將使用者移除訂閱，請稍後再試'
        })
        this.subscribeIsProcessing = false
      } 
    },
  },
  watch: {
    initialUser() {
      this.fetchUser()
    }
  },computed: {
    ...mapState(['currentUser'])
  }
}
</script>



<style scoped>
a {
  color: #657786;
}
.card {
  border: none;
  border-bottom: 1px solid #dedede;
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
.newTweet {
  position: absolute;
  right: 5%;
}
.button-group {
  position: absolute;
  right: 5%;
}

.button-group button {
  margin-left: 10px;
}

.chat-private {
  color: #ff6600;
}
.chat-private:hover {
  color: #eeeeee;
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
  height: 170px;
}
.profile-description {
  position: relative;
  top: 2rem;
}
</style>