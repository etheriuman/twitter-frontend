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
      <ChatRoom :messages="messages" :chatting-room-id="chattingRoomId" />
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
      chats: [
        {
          User: {
            id: 2,
            name: 'Belinda',
            account: '@belinda',
            avatar: ''
          },
          lastMessage: 'yoyoyo~yoyoyo~yoyoyo~yoyoyo~yoyoyo~yoyoyo~',
          roomId: '9527'
        }
      ],
      chattingUser: {},
      chattingRoomId: -1,
      messages: []
    }
  },
  methods: {
    joinRoom(receiverId) {
      const payLoad = {
        senderId: this.currentUser.id,
        receiverId: parseInt(receiverId)
      }
      socket.emit('joinRoom', payLoad)
      console.log('joinRoom!', payLoad)
    },
    getMessages(roomId) {
      socket.emit('privateMessages', roomId)
    },
    getChatRooms() {
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
    // 尋找所有 chats 中有沒有該聊天對象
    this.chats.forEach(chat => {
      if (chat.User.id === parseInt(id)) {
        this.getMessages(chat.roomId)
      }
    })
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
    // 尋找所有 chats 中有沒有該聊天對象
    this.chats.forEach(chat => {
      if (chat.User.id === parseInt(id)) {
        this.getMessages(chat.roomId)
      }
    })
    next()
  },
  created() {
    // 接收房間清單
    socket.on('receiveChatRooms', (data) => {
      console.log('receiveChatRooms: ', data)
      this.chats = [...data]
      // 從 chats 中找到傳訊對象資料
      data.forEach(chat => {
        const { id } = this.$route.params
        if (chat.User.id === parseInt(id)) {
          this.chattingUser = {
            ...this.chattingUser,
            ...chat.User
          }
        }
      })
    })
    // 接收私人歷史訊息
    socket.on('getPrivateMessages', (data) => {
      console.log('getPrivateMessages: ', data)
      this.messages = [...data]
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
      this.messages.push(message)
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