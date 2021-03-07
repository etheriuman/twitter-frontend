// 使用者編輯自己資料用的 modal
<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <form @submit.prevent.stop="handleSubmit" class="modal-content">
        <div class="modal-header d-flex align-items-center p-0">
          <button
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
        <div class="modal-body p-0">
          <div class="user-profile">
            <div class="card" style="width: 100%">
              <img
                class="card-img-top"
                :src="currentUser.cover"
                alt="Card image cap"
                style="height: 200px"
              />
              <div class="form-group">
                <label for="cover">
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
                <img :src="currentUser.avatar" class="avatar mb-5" alt="" />
                <div class="form-group">
                  <label for="avatar">
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
                    <label for="name">名稱</label>
                    <input
                      v-model="nameCache"
                      id="name"
                      name="name"
                      type="text"
                      class="form-control h-25 p-0"
                      :placeholder="currentUser.name"
                      autocomplete="username"
                      required
                      autofocus
                    />
                  </div>
                  <p class="textLimit">
                    {{ nameCache.length | handleTextLimit }}/50
                  </p>
                  <div class="form-label-group text-muted">
                    <label for="introduction">自我介紹</label>
                    <textarea
                      v-model="introductionCache"
                      id="introduction"
                      name="introduction"
                      class="form-control h-25 p-0"
                      :placeholder="currentUser.introduction"
                      rows="3"
                      autocomplete="userIntroduction"
                      autofocus
                    ></textarea>
                  </div>
                  <p class="textLimit">
                    {{ introductionCache.length | handleTextLimit }}/50
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
      introductionCache: "",
    };
  },
  methods: {
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
  filters: {
    handleTextLimit(textLength) {
      if (textLength > 50) {
        console.log("已超出50個字,無法再輸入");
      }
      return textLength;
    },
  },
};
</script>

<style scoped>
label {
  cursor: text;
}
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
  opacity: 0.6;
  object-fit: cover;
}
.avatar {
  position: absolute;
  top: -35%;
  width: 120px;
  height: 120px;
  border: 3px solid white;
  border-radius: 50%;
}
.profile {
  position: relative;
  height: 300px;
  opacity: 0.8;
}
.profile-info {
  position: relative;
}
.form-label-group {
  border-radius: 2%;
  background: #f5f8fa;
}
input,
textarea {
  background: #f5f8fa;
}
.textLimit {
  position: relative;
  right: 0;
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
.card-body-camera {
  position: absolute;
  top: -15%;
  left: 15%;
  cursor: pointer;
}
.form-control-file {
  display: none;
}
</style>