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
          <OnlineUser v-for="user in onlineUsers" :key="user.id" :user="user"/>
        </ul>
      </div>
    </div>
    <div class="column-right column">
      <PageHead :static-title="'公開聊天室'" />
      <ChatRoom :new-online-user="newOnlineUser" :new-offline-user="newOfflineUser" :messages="messages" />
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
import { socket } from './../main'


export default {
  data() {
    return {
      isLoading: false,
      newOnlineUser: {},
      newOfflineUser: {},
      onlineUsers: [],
      messages: []
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
  created() {
    // 接收線上使用者資料回傳
    socket.on('receiveUsers', (data) => {
      console.log('receiveUsers: ', data)
      this.onlineUsers = data
    })
    // 接收上線事件
    socket.on('receiveOnline', (data) => {
      console.log('receiveOnline: ', data)
      const { id, name, avatar, account } = data
      const user = {
        id,
        name,
        avatar,
        account
      }
      // 傳送使用者上線訊息
      const systemMessage = {
        text: `${name} 上線`,
        type: 'system'
      }
      this.messages.push(systemMessage)
      if (this.onlineUsers.every(user => user.id !== id)) {
        // 若onlineUsers裡面都沒有這個使用者就push進去
        this.onlineUsers.push(user)
        this.newOnlineUser = user
      }
    })
    // 接收下線事件
    socket.on('receiveOffline', (data) => {
      console.log('receiveOffline: ', data)
      const { id, name } = data
      if (this.currentUser.id === id) {
        // 如果發現下線的人是自己就把在聊天室的線上使用者踢出去
        this.$store.commit('revokeAuthentication')
        this.$router.push('/signin')
        Toast.fire({
          icon: 'warning',
          title: '此帳號已經被登出，請確定沒有重複登入並重新登入'
        })
        return
      }
      // 傳送使用者下線訊息
      const systemMessage = {
        text: `${name} 離線`,
        type: 'system'
      }
      this.messages.push(systemMessage)
      // 從線上使用者名單移除該用者
      this.onlineUsers = this.onlineUsers.filter(user => user.id !== id)
      this.newOfflineUser = {
        ...this.newOfflineUser,
        ...data
      }
    })
    // 取得歷史聊天訊息
    socket.on('getAllMessages', (data) => {
      console.log('all mesages: ', data)
      this.messages = data.map(message => {
        if (message.userId === this.currentUser.id) {
          return {
            ...message,
            type: 'self'
          }
        } else {
          return {
            ...message,
            type: 'other'
          }
        }
      })
    })
    // 接收公開聊天訊息
    socket.on('receivePublic', (data) => {
      console.log('receive public: ',data)
      const { userId, userName, userAvatar, text, createdAt } = data
      let type = ''
      if (!text) {
        type = 'system'
      } else if (userId === this.currentUser.id) {
        type = 'self'
      } else {
        type = 'other'
      }
      const message = {
        userId,
        type,
        userName,
        userAvatar,
        text,
        createdAt
      }
      this.messages.push(message)
    })
  },
  mounted() {
    console.log('getting users')
    // mounted 取得線上使用者
    socket.emit('getUsers')
    // 取得公開聊天歷史訊息
    socket.emit('messages')
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