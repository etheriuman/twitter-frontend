<template>
  <div class="main">
    <div class="column-left column">
      <Navbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead :static-title="`上線使用者(${onlineUsers.length})`" />
          <p class="loading" v-if="isLoading">努力加載中...</p>
          <OnlineUser v-for="onlineUser in onlineUsers" :key="onlineUser.id" :online-user="onlineUser"/>
        </ul>
      </div>
    </div>
    <div class="column-right column">
      <PageHead :static-title="'公開聊天室'" />
      <ChatRoom :new-online-user="newOnlineUser" :new-offline-user="newOfflineUser" />
    </div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PageHead from './../components/PageHead'
import ChatRoom from './../components/ChatRoom'
import OnlineUser from './../components/OnlineUser'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'


export default {
  data() {
    return {
      isLoading: false,
      newOnlineUser: {},
      newOfflineUser: {},
      onlineUsers: []
    }
  },
  components: {
    Navbar,
    PageHead,
    ChatRoom,
    OnlineUser
  },
  computed: {
    ...mapState(['currentUser'])
  },
  sockets: {
    // 接收線上使用者資料回傳
    receiveUsers(data) {
      console.log('receiveUsers: ', data)
      this.onlineUsers = data
    },
    // 接收上線事件
    receiveOnline(data) {
      console.log('receiveOnline: ', data)
      const { id, name, avatar, account } = data
      const user = {
        id,
        name,
        avatar,
        account
      }
      if (this.onlineUsers.every(user => user.id !== id)) {
        // 若onlineUsers裡面都沒有這個使用者就push進去
        this.onlineUsers.push(user)
        this.newOnlineUser = user
      }
    },
    // 接收下線事件
    receiveOffline(data) {
      console.log('receiveOffline: ', data)
      const { id } = data
      if (this.currentUser.id === id) {
        // 如果發現下線的人是自己就把在聊天室的線上使用者踢出去
        this.$store.commit('revokeAuthentication')
        this.$router.push('/signin')
        Toast.fire({
          icon: 'warning',
          title: '此帳號已經被登出，請確定沒有重複登入並重新登入'
        })
      }
      this.onlineUsers = this.onlineUsers.filter(user => user.id !== id)
      this.newOfflineUser = {
        ...this.newOfflineUser,
        ...data
      }
    }
  },
  mounted() {
    // mounted 取得線上使用者
    this.$socket.emit('getUsers')
  }
}
</script>

<style scoped>
.main {
  grid-template-columns: 220px 320px 1fr;
  grid-template-areas: "left main right";
}
.column-main {
  padding: 0px;
}
.column-right {
  flex-flow: column;
}


/* pad 尺寸 */
@media screen and (max-width: 992px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 320px 1fr;
    grid-template-areas:
      "main right"
      "left left";
  }
  .navbar {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
}

/* mobile 尺寸 */
@media screen and (max-width: 576px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "right right"
      "left left";
  }
  .column-left {
    outline-width: 1px;
  }
  .column-main {
    display: none;
  }
}
</style>