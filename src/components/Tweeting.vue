<template>
  <!-- Modal -->
    <div class="modal fade" ref="tweeting" id="tweeting" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form class="modal-body" @submit.prevent.stop="handleSubmit">
            <div class="modal-body-side">
              <!-- dynamic avatar -->
              <img class="avatar" :src="currentUser.avatar | emptyImage" alt="">
            </div>
            <div class="modal-body-content">
              <textarea
              type="textarea" 
              id="textarea"
              ref="tweetingArea"
              class="tweeting-area" 
              placeholder="說些什麼吧？"
              v-model="description"
              required
              />
              <button type="submit" :disabled="isProcessing" class="tweeting-submit btn btn-primary">
                推文
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import { socket } from './../main'

export default {
  data() {
    return {
      description: '',
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mixins: [emptyImageFilter],
  methods: {
    autoFocus() {
      this.$refs.tweetingArea.focus()
    },
    cleanUp() {
      // 清空輸入
      this.description = ''
    },
    sendNewTweet() {
      const payLoad = {
        type: 'tweet',
        userId: this.currentUser.id,
        description: this.description
      }
      socket.emit('sendNotification', payLoad)
    },
    async handleSubmit() {
      try {
        const length = this.description.length
        if (!length) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入推文內容'
          })
          return
        }
        if (length > 140) {
          Toast.fire({
            icon: 'warning',
            title: '推文字數過長，請小於140字'
          })
          return
        }
        const payLoad = {
          description: this.description
        }
        this.isProcessing = true
        const { data } = await tweetsAPI.createTweet({ payLoad })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isProcessing = false
        // 回傳資料給Tweets，讓他把資料塞進去
        this.$parent.$emit('after-submit')
        // socket送出發文通知
        this.sendNewTweet()
        // 清空輸入
        this.cleanUp()
        // jQuery 關閉 modal
        $('#tweeting').modal('hide')
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法新增貼文，請稍後再試'
        })
        this.isProcessing = false
        console.log(err)
      }
    }
  },
  mounted(){
    // jQuery 掛載 modal shown 事件監聽
    $(this.$refs.tweeting).on('shown.bs.modal', this.autoFocus)
    // jQuery 掛載 modal hidden 事件監聽
    $(this.$refs.tweeting).on('hidden.bs.modal', this.cleanUp)
  }
}
</script>

<style scoped>

/* 統一屬性 */
.modal-dialog {
  width: 50vw;
  margin: 55px auto;
}
/* 統一屬性 */
.modal-content {
  border-radius: 15px;
}
/* 統一屬性 */
.modal-header button {
  margin: 0;
  padding: 0;
}

.close span {
  font-size: 2rem;
  font-weight: 200;
  color: #ff6600;
  opacity: 1;
}

.modal-body {
  position: relative;
  display: flex;
  padding: 20px;
  height: 300px;
  border-radius: 20px;
}

.modal-body-side {
  width: 60px;
  height: 100%;
  text-align: center;
}

.modal-body-content {
  width: 100%;
  height: 100%;
  text-align: end;
}

.tweeting-area {
  width: 100%;
  height: calc(100% - 50px);
  top: 0;
  left: 0;
  padding: 10px 0 0 10px;
  border: none;
  resize: none;
  outline: none;
}

</style>