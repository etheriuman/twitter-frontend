// 新增回覆用的 modal
<template>
  <!-- Modal -->
    <div class="modal fade" ref="replying" :id="replyingId" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- 推主資訊 -->
          <div class="card-body">
            <div class="card-body-side">
              <!-- user avatar -->
              <router-link :to="{name: 'user-tweets', params: {id:replyingTweet.User.id}}">
                <img class="avatar" :src="replyingTweet.User.avatar | emptyImage" alt="">
              </router-link>
              <span class="line"></span>
            </div>
            <div class="card-body-content">
              <!-- replyingTweetCard header -->
              <div class="content-header">
                <span class="user-name">{{replyingTweet.User.name}}</span>
                <span class="text-muted">{{replyingTweet.User.account}}</span>
                <span class="text-muted"> &#8231; </span>
                <span class="text-muted">{{replyingTweet.createdAt | fromNow}}</span>
              </div>
              <!-- replyingTweet description -->
              <div class="content-body">
                <p>{{replyingTweet.description}}</p>
              </div>
              <div class="content-footer">
                <p>
                  <span class="text-muted">回覆給 </span>
                  <span class="text-primary">{{replyingTweet.User.account}}</span>
                </p>
              </div>
            </div>
          </div>
          <!-- 回覆區域 -->
          <form class="modal-body" @submit.prevent.stop="handleSubmit(replyingTweet.id)">
            <div class="modal-body-side">
              <!-- dynamic avatar -->
              <img class="avatar" :src="currentUser.avatar | emptyImage" alt="">
            </div>
            <div class="modal-body-content">
              <textarea 
              type="textarea" 
              :id="`${replyingId}-textarea`"
              ref="replyingArea"
              class="replying-area" 
              placeholder="說些什麼吧？"
              v-model="comment"
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
import repliesAPI from './../apis/replies'
import { fromNowFilter, emptyImageFilter } from './../utils/mixins'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  props: {
    replyingTweet: {
      type: Object,
      required: true
    },
    replyingId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comment: '',
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mixins: [fromNowFilter, emptyImageFilter],
  methods: {
    autoFocus() {
      this.$refs.replyingArea.focus()
    },
    cleanUp() {
      this.comment = ''
    },
    async handleSubmit(tweetId) {
      try {
        const length = this.comment.length
        if (!length) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入回覆內容'
          })
          return
        }
        if (length > 140) {
          Toast.fire({
            icon: 'warning',
            title: '回覆字數過長，請小於140字'
          })
          return
        }
        const payLoad = {
          comment: this.comment
        }
        this.isProcessing = true
        const { data } = await repliesAPI.addReply({ tweetId, payLoad })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isProcessing = false
        // 回傳資料給Tweet，讓他把資料塞進去
        this.$parent.$emit('after-reply', tweetId)
        // 清空欄位
        this.cleanUp()
        // 關閉modal
        $(`#${this.replyingId}`).modal('hide')
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法新增回覆，請稍後再試'
        })
        this.isProcessing = false
        console.log(err)
      }
    }
  },
  mounted() {
    // jQuery 掛載 modal shown 事件監聽
    $(this.$refs.replying).on('shown.bs.modal', this.autoFocus)
    // jQuery 掛載 modal hidden 事件監聽
    $(this.$refs.replying).on('hidden.bs.modal', this.cleanUp)
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
  padding: 0 20px 20px 20px;
  height: 300px;
  border-radius: 20px;
}

.card-body {
  position: relative;
  display: flex;
  padding: 5px 20px 10px 20px;
}

.card-body-side {
  display: flex;
  flex-flow: column;
  width: 60px;
  height: 100%;
  text-align: center;
  align-items: center;
}

.line {
  background: #dedede;
  display: block;
  margin-top: 10px;
  width: 2px;
  height: 100px;
}

.card-body-content {
  width: 100%;
  height: 100%;
  padding-left: 10px;
}

.content-header {
  margin-bottom: 10px;
}

.content-body {
  margin-bottom: 20px;
}

.content-footer {
  font-size: 13px;
}

.content-footer:last-child {
  color: #ff6600;
}

.user-name {
  margin-right: 10px;
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

.replying-area {
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