// 新增推文用的 modal
<template>
  <!-- Modal -->
    <div class="modal fade" id="tweeting" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              <img class="avatar" src="https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg" alt="">
            </div>
            <div class="modal-body-content">
              <textarea 
              type="textarea" 
              class="tweeting-area" 
              placeholder="說些什麼吧？"
              v-model="description"
              required
              />
              <button type="submit" class="tweeting-submit btn btn-primary">
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

export default {
  data() {
    return {
      description: '',
      isHidden: false
    }
  },
  methods: {
    handleSubmit() {
      const payLoad = {
        userId: 1, // currentUser.id
        description: this.description
      }
      // 檢查description.length是否 > 0 , < 140
      console.log(payLoad)
      // API POST request...

      // 回傳資料給Tweets，讓他把資料塞進去
      this.$parent.$emit('after-submit')
      
      // 清空欄位
      this.description = ''

      // 關閉modal
      $('#tweeting').modal('hide')
    }
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

/* 統一屬性 */
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
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