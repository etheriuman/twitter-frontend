<template>
  <div class="container">
    <div class="message-area">
      <TextBlock v-for="(message,index) in messages" :key="index" :message="message"/>
      <div ref="ninja"></div>
    </div>
    <form class="type-area" @submit.prevent.stop="handleSubmit">
      <div class="text" >
        <input type="text" v-model="text" required />
      </div>
      <button type="submit" class="submit">
        <font-awesome-icon class="icon" icon="play" />
      </button>
    </form>
  </div>
</template>

<script>
import TextBlock from './../components/TextBlock'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'

export default {
  components: {
    TextBlock
  },
  props: {
    newOnlineUser: {
      type: Object,
      default: undefined
    },
    newOfflineUser: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      text: '',
      messages: [],
      toUserId: undefined
    }
  },
  sockets: {
    // 取得歷史聊天訊息
    getAllMessages(data) {
      console.log('all mesages: ', data)
      this.messages = data.map(message => {
        if (!message.text) {
          return {
            ...message,
            type: 'system'
          }
        } else if (message.userId === this.currentUser.id) {
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
    },
    // 接收公開聊天訊息
    receivePublic(data) {
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
    },
  },
  methods: {
    // scroll 到底部
    scrollBottom() {
      this.$refs.ninja.scrollIntoView()
    },
    // 送出訊息到公開群組
    handleSubmit() {
      // 禁止空白輸出
      if (!this.text.trim()) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入訊息內容再發送'
        })
        this.text = ''
        return
      }
      // 判斷有沒有傳入訊息目標
      if (this.toUserId) {
        const payLoad = {
          sendUserId: this.currentUser.id,
          recieveUserId: this.toUserId,
          text: this.text
        }
        console.log('private message sent: ',payLoad)
        this.$socket.emit('sendPrivate', payLoad)
        this.text = ''
        return
      }
      // 沒有傳訊目標就發送到公開聊天室
      const payLoad = {
        userId: this.currentUser.id,
        text: this.text
      }
      console.log('public message sent: ',payLoad)
      this.$socket.emit('sendPublic', payLoad)
      this.text = ''
    },
    // 接收到私人訊息
    receivePrivate(data) {
      const { sendUser, text } = data
      const { userId, userName, userAvatar } = sendUser
      const message = {
        userId,
        userName,
        userAvatar,
        text,
        type: 'other'
      }
      console.log(message)
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    // 監聽新傳入的上線者並在訊息陣列中塞入系統訊息
    newOnlineUser(data) {
      const { name } = data
      const systemMessage = {
        text: `${name} 上線`,
        type: 'system'
      }
      this.messages.push(systemMessage)
    },
    // 監聽新傳入的下線者並在訊息陣列中塞入系統訊息
    newOfflineUser(data) {
      const { name } = data
      const systemMessage = {
        text: `${name} 離線`,
        type: 'system'
      }
      this.messages.push(systemMessage)
    }
  },
  mounted() {
    this.$socket.emit('messages')
    this.scrollBottom()
  }  
}
</script>

<style scoped>
  * {
    /* outline: 1px solid pink; */
  }

  .container {
    height: calc(100% - 50px);
    padding: 0;
  }
  .message-area {
    height: 85vh;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 15px;
    overflow: scroll;
    scrollbar-width: none;
  }
  .message-area::-webkit-scrollbar {
    /* hide from chrome */
    display: none;
  }
  .type-area {
    display: flex;
    height: 50px;
    border-top: 1px solid #dededede;
  }
  .text {
    display: flex;
    align-items: center;
    width: 90%;
    padding: 0 20px;
  }
  .text input,
  .text input:focus {
    display: block;
    border-radius: 25px;
    border: none;
    outline: none;
    background: #eeeeee;
    height: 25px;
    width: 100%;
    padding: 0 15px;
    box-shadow: none;
  }
  .submit {
    width: 10%;
    height: 100%;
    border: #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    text-align: center;
    color: #ff6600;
  }

/* pad 尺寸以下 */
@media screen and (max-width: 992px) {
  .message-area {
    height: calc(85vh - 50px);
  }
}
</style>