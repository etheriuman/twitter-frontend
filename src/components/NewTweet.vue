// 首頁上方的新增推文區塊
<template>
  <div class="list-group-item">
    <form class="card-body" @submit.prevent.stop="handleSubmit">
      <div class="card-body-side">
        <!-- dynamic avatar -->
        <img class="avatar" :src="currentUser.avatar" alt="">
      </div>
      <div class="card-body-content">
        <textarea 
        type="textarea" 
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
</template>

<script>
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

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
  methods: {
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
        this.$emit('after-submit')
        // 清空欄位
        this.description = ''
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法新增推文，請稍後再試'
        })
        this.isProcessing = false
        console.log(err)
      }
      
    }
  }
}
</script>

<style scoped>

.card-body {
  position: relative;
  display: flex;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 10px #ededed;
}

.card-body-side {
  width: 60px;
  height: 100%;
  text-align: center;
}

.card-body-content {
  width: 100%;
  height: 100%;
  text-align: end;
}

.tweeting-area {
  width: 100%;
  min-height: calc(100% - 50px);
  top: 0;
  left: 0;
  padding: 10px 0 0 10px;
  border: none;
  resize: none;
  outline: none;
}

</style>