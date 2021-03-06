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
      <div class="modal-content">
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
          <button type="button" class="btn btn-primary mr-2">儲存</button>
        </div>
        <div class="modal-body p-0">
          <div class="user-profile">
            <div class="card" style="width: 100%">
              <img
                class="card-img-top"
                src="http://5b0988e595225.cdn.sohucs.com/images/20180914/9d15e25d6b1946f28b196f597e3002ba.jpeg"
                alt="Card image cap"
                style="height: 200px"
              />
              <font-awesome-icon icon="camera" class="card-top-camera" />
              <div class="profile card-body">
                <img
                  src="https://randomuser.me/portraits/women/17.jpg"
                  class="avatar mb-5"
                  alt=""
                />
                <font-awesome-icon icon="camera" class="card-body-camera" />
                <div class="profile-info">
                  <div class="form-label-group text-muted">
                    <label for="name">名稱</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      class="form-control h-25 p-0"
                      autocomplete="username"
                      required
                      autofocus
                    />
                  </div>
                  <p class="textLimit">8/50</p>
                  <div class="form-label-group text-muted">
                    <label for="introduction">自我介紹</label>
                    <textarea
                      id="introduction"
                      name="introduction"
                      class="form-control h-25 p-0"
                      rows="3"
                      autocomplete="userIntroduction"
                      autofocus
                    ></textarea>
                  </div>
                  <p class="textLimit">8/50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  opacity: 0.6;
  object-fit: cover;
}
.avatar {
  position: absolute;
  top: -20%;
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
  top: 3rem;
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
  left: 40%;
  cursor: pointer;
}
.card-body-camera {
  position: absolute;
  top: -10px;
  left: 15%;
  cursor: pointer;
}
</style>z