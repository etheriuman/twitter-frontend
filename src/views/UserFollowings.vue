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
          <p class="loading" v-if="isLoading">努力加載中...</p>
          <UserCard
            v-else
            v-for="following in followings"
            :key="following.id"
            :initial-follow="following"
            :currentUserId="currentUser.id"
            @after-delete-follow="handleAfterDeleteFollow"
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
import usersApi from "./../apis/users"
import { Toast } from "./../utils/helpers"
import { mapState } from 'vuex'

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
      user: {},
      followings: [],
      isLoading: true
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        const {data} = await usersApi.get({userId})
        this.user = data
      } catch(error) {
        console.log(error)
        Toast.fire ({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
    async fetchFollowings(userId) {
      try {
        const {data} = await usersApi.getFollowings({userId})
        this.isLoading = false
        this.followings = data.map(following => ({
          ...following,
          followId: following.followingId      
        }))
      }catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得正在跟隨者清單，請稍後再試'
        })
      }
    },
    handleAfterDeleteFollow(followId) {
      if (this.user.id == this.currentUser.id) {
        this.followings = this.followings.filter(
          user => user.followId !== followId
        )
      }
    }
  },
  beforeRouteUpdate(to,from,next) {
    const {id : userId} = to.params
    this.fetchFollowings(userId)
    next()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const { id:userId } = this.$route.params
    this.fetchUser(userId)
    this.fetchFollowings(userId)
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