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
            :currentUserId= "currentUserId"
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
import Navbar from "./../components/Navbar"
import PageHead from "./../components/PageHead"
import UserFollowsNavTabs from "./../components/UserFollowsNavTabs.vue"
import UserCard from "./../components/UserCard"
import Recommendation from "./../components/Recommendation"
import usersApi from "./../apis/users.js"
import followApi from "./../apis/follow.js"
import { Toast } from "./../utils/helpers.js"

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
      currentUserId: -1,
      user: {
        id: -1,
        name: "",
        tweetsNumber: 0,
      },
      followers: [],
    }
  },
  methods: {
    async fetchCurrentUser() {
      try {
        const {data} = await usersApi.getCurrentUser()
        this.currentUserId = data.id
      } catch(error) {
        console.log(error)
      }
    },
    async fetchUser(userId) {
      try {
        this.isLoading = true
        const { data } = await usersApi.get({userId})
        const { id, name, tweetsNumber } = data
        this.user.id = id
        this.user.name = name
        this.user.tweetsNumber = tweetsNumber
        this.isLoading = false
      } catch(error) {
        this.isLoading = false
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
    async fetchFollowers(userId) {
      try {
        const {data} = await usersApi.getFollowers({userId})
        this.followers = data.map(follower => ({
          ...follower,
          followId: follower.followerId
        }))
      } catch(error) {
        this.isLoading = false
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法取得使用者追蹤清單，請稍後再試'
        })
      }
    },
    async handleAfterAddFollow(payLoad) {
      //串接後端api POST /followships/:followingId
      try {
        const {data} = await followApi.addFollow({payLoad})
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.followers = this.followers.map((follower) => {
          if (follower.id === payLoad) {
            return {
              ...follower,
              isFollowed: true,
            }
          }
          return follower
        })
      } catch (error) {
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法將使用者加入追蹤，請稍後再試'
        })
      }
    },
    async handleAfterDeleteFollow(followId) {
      //串接後端api DELETE /followships/:followingId
      try {
        const {data} = await followApi.removeFollow({followId})
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.followers = this.followers.map((follower) => {
          if (follower.id === followId) {
            return {
              ...follower,
              isFollowed: false,
            }
          }
          return follower
        })
      } catch (error) {
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法將使用者移除追蹤，請稍後再試'
        })
      }       
    },
  },
  beforeRouteUpdate(to,from,next) {
    const {id : userId} = to.params
    this.fetchFollowers(userId)
    next()
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchCurrentUser()
    this.fetchUser(userId)
    this.fetchFollowers(userId)
  },
}
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