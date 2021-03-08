// 使用者編輯自己資料用的 modal
<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
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
          <h5 class="modal-title" id="exampleModalLabel">編輯個人資料</h5>
          <button type="submit" class="btn btn-primary mr-2">儲存</button>
        </div>
        <!-- 推主資訊 -->
        <div class="modal-body p-0">
          <div class="user-profile">
            <div class="card" style="width: 100%">
              <!-- user cover -->
              <img
                class="card-img-top"
                :src="currentUser.cover"
                alt="Card image cap"
                style="height: 200px"
              />
              <div class="form-group">
                <label for="cover">
                  <!-- 上傳 user cover 檔案 -->
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
                <!-- user avatar -->
                <img :src="currentUser.avatar" class="avatar mb-5" alt="" />
                <div class="form-group">
                  <label for="avatar">
                    <!-- 上傳 user avatar 檔案 -->
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
                    <!-- user name -->
                    <label for="name">名稱</label>
                    <input
                      v-model="nameCache"
                      id="name"
                      name="name"
                      type="text"
                      class="form-control h-25 p-0"
                      autocomplete="username"
                      required
                      autofocus
                    />
                  </div>
                  <!-- user name 暫存檔長度限制超過50個字顯示紅字-->
                  <p v-if="nameCache.length<=50" class="textLimit">
                    {{ nameCache.length }}/50
                  </p>
                  <p v-else class="textLimit" style="color:red">
                    {{ nameCache.length }}/50
                  </p>
                  <div class="form-label-group text-muted">
                    <!-- user introduction 暫存檔 -->
                    <label for="introduction">自我介紹</label>
                    <textarea
                      v-model="introCache"
                      id="introduction"
                      name="introduction"
                      class="form-control h-25 p-0"
                      rows="3"
                      autocomplete="userIntroduction"
                      autofocus
                    ></textarea>
                  </div>
                  <!-- user introduction 暫存檔長度限制超過50個字顯示紅字-->
                  <p v-if="introCache.length<=50" class="textLimit">
                    {{ introCache.length }}/50
                  </p>
                  <p v-else class="textLimit" style="color:red">
                    {{ introCache.length }}/50
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
export default {
  name: "UserProfileEditing",
  props: {
    initialCurrentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentUser: this.initialCurrentUser,
      coverCache: this.initialCurrentUser.cover,
      avatarCache: this.initialCurrentUser.avatar,
      nameCache: "",
      introCache: "",
    };
  },
  methods: {
    fetchNameCache() {
      this.nameCache = this.currentUser.name
    },
    fetchIntroCache() {
      this.introCache = this.currentUser.introduction
    },
    handleClose(){
      this.nameCache = this.currentUser.name
      this.introCache = this.currentUser.introduction
    },
    handleCoverChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        return;
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.currentUser.cover = imageURL;
      }
    },
    handleCoverCancelChange() {
      this.currentUser.cover = this.coverCache;
    },
    handleAvatarChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        return;
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.currentUser.avatar = imageURL;
      }
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("afterSubmit", formData);
    },
  },
  created() {
    this.fetchNameCache(),
    this.fetchIntroCache()
  }
};
</script>

<style scoped>
.close {
  margin: 0;
}
.modal-title {
  font-weight: 700;
}
.btn-primary {
  color: #fff;
  background-color: #ff6600;
  border-color: #ff6600;
  border-radius: 90px;
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active:hover {
  color: #fff;
  background-color: #ff6600;
  border-color: #ff6600;
  border-radius: 90px;
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
  filter:brightness(0.9)
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
  background-color: #f5f8fa;
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
  position: relative;
  right: 0;
}
</style>