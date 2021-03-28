<template>
  <div class="container">
    <div class="message-area" ref="messageArea">
      <TextBlock v-for="(message,index) in messages" :key="index" :message="message"/>
      <div ref="ninja"></div>
    </div>
    <form class="type-area" @submit.prevent.stop="handleSubmit" v-if="chattingRoomId !== -1">
      <div class="text" >
        <input type="text" v-model="text" required />
      </div>
      <button type="submit" class="submit">
        <font-awesome-icon class="icon" icon="play" />
      </button>
    </form>
    <!-- 為選擇聊天對象時 -->
    <p v-else class="text-center text-muted">選擇一個對象來聊天吧！</p>
  </div>
</template>

<script>
import TextBlock from './../components/TextBlock'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
import { socket } from './../main'

export default {
  components: {
    TextBlock
  },
  props: {
    messages: {
      type: Array,
      required: true
    },
    chattingRoomId: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    // scroll 到底部
    scrollBottom() {
      this.$refs.ninja.scrollIntoView()
    },
    // 送出訊息
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
      if (this.chattingRoomId) {
        const payLoad = {
          senderId: this.currentUser.id,
          roomId: this.chattingRoomId,
          text: this.text
        }
        console.log('private message sent: ',payLoad)
        socket.emit('sendPrivate', payLoad)
        this.text = ''
        return
      }
      // 沒有傳訊目標就發送到公開聊天室
      const payLoad = {
        userId: this.currentUser.id,
        text: this.text
      }
      console.log('public message sent: ',payLoad)
      socket.emit('sendPublic', payLoad)
      this.text = ''
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    messages(data) {
      this.messages = data
    }
  },
  updated() {
    this.$refs.messageArea.scrollTop = this.$refs.messageArea.scrollHeight
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
    padding-left: 20px;
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
    border: none;
    background: none;
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