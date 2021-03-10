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
        <div class="button-group" v-if="currentUser.id.toString() !== initialUser.id">
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
            class="user-follow btn btn-outline-primary"
          >
            正在追蹤
          </button>
        </div>
        <button
          v-if="currentUser.id.toString() === initialUser.id"
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
            <router-link :to="{name:'user-followings', params:{id:user.id}}">
              <span>{{ user.followingsNumber }}個</span>跟隨中
            </router-link>
            <router-link :to="{name:'user-followers', params:{id:user.id}}">
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
import UserProfileNavTabs from "./UserProfileNavTabs.vue"
import UserProfileEdiiting from "./UserProfileEditing"
import usersApi from "./../apis/users.js"
import { Toast } from "./../utils/helpers.js"

export default {
  name: "UserProfile",
  components: {
    UserProfileNavTabs,
    UserProfileEdiiting,
  },
  props: {
    initialUser: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      currentUser: "",
      user: ""
    }
  },
  methods: {
    async fetchCurrentUser() {
      try {
        const {data} =  await usersApi.getCurrentUser ()
        this.currentUser = data
      } catch (error) {
        this.isLoading = false
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法取得當前使用者資料，請稍後再試'
        }) 
      }  
    },
    fetchUser() {
      this.user = this.initialUser
    },
    addFollowed(userId) {
      const payLoad = {id : userId}
      this.$emit("afterAddFollowed", payLoad)
    },
    cancelFollowed(userId) {
      this.$emit("afterCancelFollowed",userId)
    },
    async handleAfterSubmit(formData) {
      try {
        const {data} = await usersApi.set({ userId:this.currentUser.id, formData })
        if (data.status != 'success') {
          throw new Error(data.message)
        }
      } catch(error) {
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
      }
    },
  },
  watch: {
    initialUser() {
      console.log(this.initialUser)
      this.fetchUser()
    }
  },
  created() {
    this.fetchCurrentUser()
  },
}
</script>



<style scoped>
a {
  color: #657786;
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