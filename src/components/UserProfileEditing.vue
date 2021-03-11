// 使用者編輯自己資料用的 modal
<template>
  <!-- Modal -->
  <div
    class="modal fade"
    ref="userEditing"
    id="userEditing"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <form @submit.prevent.stop="handleSubmit" class="modal-content">
        <div class="modal-header d-flex align-items-center p-0">
          <button
            @click="handleClose"
            type="button"
            class="close pr-0"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <p class="modal-title" id="exampleModalLabel">編輯個人資料</p>
          <button :disabled="isProcessing" type="submit" class="btn btn-primary mr-3">儲存</button>
        </div>
        <!-- 推主資訊 -->
        <div class="modal-body p-0">
          <div class="user-profile">
            <div class="card" style="width: 100%">
              <!-- cover -->
              <img
                class="card-img-top"
                :src="cover | emptyImage"
                alt="Card image cap"
                style="height: 200px"
              />
              <div class="form-group">
                <label for="cover">
                  <!-- 上傳 cover 檔案 -->
                  <font-awesome-icon icon="camera" class="card-top-camera" />
                </label>
                <input
                  @change="handleCoverChange"
                  id="cover"
                  type="file"
                  name="cover"
                  accept="image/*"
                  class="form-control-file"
                />
              </div>
              <label @click.prevent.stop="handleCoverCancelChange" for="times">
                <font-awesome-icon icon="times" class="card-top-times" />
              </label>
              <div class="profile card-body pt-0">
                <!-- avatar -->
                <img :src="avatar | emptyImage" class="avatar mb-5" alt="" />
                <div class="form-group">
                  <label for="avatar">
                    <!-- 上傳 avatar 檔案 -->
                    <font-awesome-icon icon="camera" class="card-body-camera" />
                  </label>
                  <input
                    @change="handleAvatarChange"
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    class="form-control-file"
                  />
                </div>
                <div class="profile-info">
                  <div class="form-label-group text-muted">
                    <!-- name -->
                    <label class="text-sm" for="name">名稱</label>
                    <input
                      v-model="name"
                      id="name"
                      name="name"
                      type="text"
                      class="form-control h-25 p-0"
                      autocomplete="username"
                      required
                      autofocus
                    />
                  </div>
                  <!-- name 長度限制超過50個字顯示紅字-->
                  <p v-if="name && name.length <= 50" class="textLimit">
                    {{ name && name.length }}/50
                  </p>
                  <p v-else class="textLimit" style="color: red">
                    {{ name && name.length }}/50
                  </p>
                  <div class="form-label-group text-muted mt-3">
                    <!-- introduction -->
                    <label class="text-sm" for="introduction">自我介紹</label>
                    <textarea
                      v-model="introduction"
                      id="introduction"
                      name="introduction"
                      class="form-control h-25 p-0"
                      rows="3"
                      autocomplete="userIntroduction"
                      autofocus
                    ></textarea>
                  </div>
                  <!-- introduction長度限制超過50個字顯示紅字-->
                  <p v-if="introduction && introduction.length <= 50" class="textLimit">
                    {{ introduction && introduction.length }}/50
                  </p>
                  <p v-else class="textLimit" style="color: red">
                    {{introduction && introduction.length }}/50
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import usersApi from "./../apis/users"
import { Toast } from "./../utils/helpers"
import { mapState } from 'vuex'
import { emptyImageFilter } from "./../utils/mixins"

export default {
  name: "UserProfileEditing",
  mixins: [emptyImageFilter],
  data() {
    return {
      name: '',
      avatar: '',
      cover: '',
      introduction: '',
      isProcessing: false
    }
  },
  methods: {
    resetStatus(){
      this.name = this.currentUser.name,
      this.avatar = this.currentUser.avatar,
      this.cover = this.currentUser.cover,
      this.introduction = this.currentUser.introduction
    },
    handleClose() {
      this.resetStatus()
    },
    handleCoverChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        return
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.cover = imageURL
      }
    },
    handleCoverCancelChange() {
      this.cover = this.currentUser.cover
    },
    handleAvatarChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        return
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.avatar = imageURL
      }
    },
    async handleSubmit(e) {
      try {
        const form = e.target
        const formData = new FormData(form)
        this.isProcessing = true
        const {data} = await usersApi.set({ userId:this.currentUser.id, payLoad: formData })
        this.isProcessing = false
        if (data.status != 'success') {
          throw new Error(data.message)
        }
        this.$parent.$emit('afterSubmit')
        $('#userEditing').modal('hide')
      } catch(error) {
        console.log (error)
        Toast.fire ({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
        this.isProcessing = false
      }
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser() {
      this.resetStatus()
    }
  },
  created() {
    this.resetStatus()
  },
  mounted() {
    $(this.$refs.userEditing).on('hidden.bs.modal', this.resetStatus)
  }
}
</script>

<style scoped>
.close {
  margin: 0;
}
.close span {
  font-size: 2rem;
  font-weight: 200;
  color: #ff6600;
  opacity: 1;
  line-height: 100%;
}
.modal-title {
  font-weight: 700;
}
.modal-content {
  border-radius: 15px;
}
.card-img-top {
  background-size: cover;
  opacity: 0.9;
  object-fit: cover;
}
.card-top-camera {
  position: absolute;
  top: 15%;
  left: 45%;
  cursor: pointer;
}
.card-top-times {
  position: absolute;
  top: 15%;
  left: 55%;
  cursor: pointer;
}
.avatar {
  position: absolute;
  top: -35%;
  width: 120px;
  height: 120px;
  border: 3px solid white;
  border-radius: 50%;
  filter: brightness(0.9);
}
.card-body-camera {
  position: absolute;
  top: -15%;
  left: 15%;
  cursor: pointer;
}
.form-control-file {
  display: none;
}
.profile {
  position: relative;
  height: 300px;
}
.profile-info {
  position: relative;
}
.form-label-group {
  border-radius: 2%;
}
.form-label-group label {
  width: 100%;
  cursor: text;
}
input,
textarea {
  color: black;
  background-color: #f5f8fa;
}
.textLimit {
  position: absolute;
  right: 0;
  color: #657786;
}
</style>