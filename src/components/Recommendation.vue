<template>
  <div class="card">
    <ul class="list-group">
      <li class="list-group-item">
        跟隨誰
      </li>
      <div class="scroll-bar">
        <li 
        v-for="user in showingUsers" 
        :key="user.id"
        class="list-group-item"
        >
          <div class="main-content">
            <div class="main-left">
              <router-link :to="{ name: 'user-tweets', params: {id: user.id} }">
                <img class="avatar" :src="user.avatar | emptyImage" alt="avatar">
              </router-link>
            </div>
            <div class="main-right">
              <p>{{user.name}}</p>
              <p class="text-muted">{{user.account}}</p>
            </div>
          </div>
          <div class="side-content" v-if="user.id !== currentUser.id">
            <button 
            v-if="user.isFollowed"
            type="button"
            class="btn btn-sm btn-primary follow-button"
            @click.prevent.stop="deleteFollow(user.id)"
            :disabled="user.id === isProcessingId"
            >
              正在跟隨
            </button>
            <button 
            v-else
            type="button"
            class="btn btn-sm btn-outline-primary follow-button"
            @click.prevent.stop="addFollow(user.id)"
            :disabled="user.id === isProcessingId"
            >
              跟隨
            </button>
          </div>
        </li>
      </div>
      <li class="list-group-item">
        <button
        class="show-more"
        type="btn"
        @click.prevent.stop="showMoreUsers(showingUsers.length)"
        v-if="users.length !== showingUsers.length"
        >
          顯示更多
        </button>
        <button
        class="show-more"
        type="btn"
        @click.prevent.stop="showLessUsers(showingUsers.length)"
        v-else
        >
          顯示更少
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import followAPI from './../apis/follow'
import { Toast } from './../utils/helpers'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import { socket } from './../main'

export default {
  data() {
    return {
      users: [],
      showingUsers: [],
      isProcessingId: -1
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await usersAPI.getTopUsers()
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        this.users = response.data.users
        this.showMoreUsers(0)
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推薦名單，請稍後再試'
        })
      }
    },
    // socket 傳送追蹤通知
    socketFollow(followId) {
      const payLoad = {
        type: 'follow',
        userId: this.currentUser.id,
        followId
      }
      socket.emit('sendNotification', payLoad)
    },
    // 追蹤使用者
    async addFollow(userId) {
      try {
        const payLoad = {
          id: userId
        }
        this.isProcessingId = userId
        const { data } = await followAPI.addFollow({ payLoad })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isProcessingId = -1
        this.showingUsers = this.showingUsers.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: true
            }
          }
          return user
        })
        // 傳送通知
        this.socketFollow(userId)
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法追蹤該使用者，請稍後再試'
        })
        this.isProcessingId = -1
        console.log(err)
      }
    },
    // 取消追蹤使用者
    async deleteFollow(userId) {
      try {
        this.isProcessingId = userId
        const { data } = await followAPI.removeFollow({ followId: userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isProcessingId = -1
        this.showingUsers = this.showingUsers.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: false
            }
          }
          return user
        })
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法退追該使用者，請稍後再試'
        })
        this.isProcessingId = -1
        console.log(err)
      }
    },
    // 顯示更多推薦使用者
    showMoreUsers(index) {
      for (let i = index; i < index+6; i++) {
        if (i === this.users.length) {
          return
        }
        this.showingUsers.push(this.users[i])
      }
    },
    // 顯示更少推薦使用者
    showLessUsers() {
      this.showingUsers = this.users.slice(0, 6)
    }
  },
  mixins: [emptyImageFilter],
  watch: {
    showingUsers(data) {
      this.showingUsers = data
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<style scoped>

.card {
  width: 90%;
  margin-top: 20px;
  border: none;
}

.list-group {
  border-radius: 15px!important;
}

.scroll-bar {
  max-height: 500px;
  overflow: auto;
  scrollbar-width: none;
}

.scroll-bar::-webkit-scrollbar {
  /* hide from chrome */
  display: none;
}

.list-group-item {
  padding: 15px;
  display: flex;
  flex: 0 1 auto;
  justify-content: space-between;
}

.list-group-item:first-child,
.list-group-item:last-child {
  padding: 10px 15px;
}

.main-content {
  display: flex;
}

.main-right {
  padding-left: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.main-right p {
  margin: 0;
}

.side-content {
  display: flex;
  align-items: center;
}

.show-more {
  color: #ff6600;
  background: none;
  border: none;
  padding: none;
}
</style>