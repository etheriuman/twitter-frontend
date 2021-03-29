<template>
  <div class="main">
    <div class="column-left column">
      <Navbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead :static-title="'訊息'" />
          <p class="loading" v-if="isLoading">努力加載中...</p>
          <ChatCard v-for="chat in chats" :key="chat.id" :chat="chat"/>
        </ul>
      </div>
    </div>
    <div class="column-right column">
      <PageHead :static-title="chattingUser.name" />
      <ChatRoom
      :messages="messages"
      :chatting-room-id="chattingRoomId"
      />
    </div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PageHead from './../components/PageHead'
import ChatRoom from './../components/ChatRoom'
import ChatCard from './../components/ChatCard'
import { mapState } from 'vuex'
import { socket } from './../main'
// import { Toast } from './../utils/helpers'


export default {
  components: {
    Navbar,
    PageHead,
    ChatRoom,
    ChatCard
  },
  data() {
    return {
      isLoading: false,
      chats: [],
      chattingUser: {},
      chattingRoomId: -1,
      messages: []
    }
  },
  methods: {
    // 加入房間
    joinRoom(receiverId) {
      const payLoad = {
        senderId: this.currentUser.id,
        receiverId: parseInt(receiverId)
      }
      socket.emit('joinRoom', payLoad)
      console.log('joinRoom!', payLoad)
    },
    // 拿到單一房間的歷史訊息
    getMessages(roomId) {
      socket.emit('privateMessages', roomId)
    },
    // 拿到所有聊天房間的簡單資訊
    getChatRooms() {
      console.log('getChatRooms!')
      const payLoad = {
        userId: this.currentUser.id
      }
      socket.emit('getChatRooms', payLoad)
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    // 拿到所有 chatRooms
    this.getChatRooms()
    // 如果路由沒有對象就直接return掉
    const { id } = this.$route.params
    console.log('targetUser id: ', id)
    if (id === 'all') {
      return
    }
    // 加入房間
    this.joinRoom(id)
  },
  beforeRouteUpdate(to, from, next) {
    // 如果路由沒有對象就直接return掉
    const { id } = to.params
    console.log('targetUser id: ', id)
    if (id === 'all') {
      return
    }
    // 加入房間
    this.joinRoom(id)
    next()
  },
  created() {
    // 清空監聽器，避免重複掛載
    socket.removeAllListeners()
    // 接收房間清單
    socket.on('receiveChatRooms', (data) => {
      console.log('receiveChatRooms: ', data)
      this.chats = [...data]
    })
    // 接收加入房間回傳資料
    socket.on('receiveJoinRoom', (data) => {
      console.log('receiveJoinRoom: ', data)
      // 如果chats中沒有該名使用者就推進去
      if (this.chats.every(chat => chat.roomId !== data.roomId)) {
        console.log('push chat init')
        this.chats.push(data)
      }
      // 切換正在聊天的對象
      this.chattingUser = {
        ...this.chattingUser,
        ...data.User
      }
      this.chattingRoomId = data.roomId
      this.getMessages(data.roomId)
    })
    // 接收私人歷史訊息
    socket.on('getPrivateMessages', (data) => {
      console.log('getPrivateMessages: ', data)
      this.messages = [...data]
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
    // 接收到私人訊息
    socket.on('receivePrivate', (data) => {
      console.log('receivePrivate: ',data)
      const { userId, userName, userAvatar, text, createdAt } = data
      let type = ''
      if (userId === this.currentUser.id) {
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
      // 如果接到的私訊是當前聊天對象傳來的就推進聊天室
      if (userId === this.chattingUser.id || userId === this.currentUser.id) {
        this.messages.push(message)
      }
      // 更新chatCard的最新訊息
      this.chats.forEach(chat => {
        if (chat.User.id === this.chattingUser.id) {
          chat.lastMessage = text
        }
      })
    })
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