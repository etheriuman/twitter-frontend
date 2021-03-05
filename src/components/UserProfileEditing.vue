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
          <button type="button" class="btn btn-primary">儲存</button>
        </div>
        <div class="modal-body p-0">
          <div class="user-profile">
            <div class="card" style="width: 100%">
              <div
                class="card-img-top"
                src=""
                alt="Card image cap"
                style="height: 200px"
              ></div>
              <div class="profile card-body">
                <img
                  src="https://randomuser.me/portraits/women/17.jpg"
                  class="avatar mb-5"
                  alt=""
                />
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
  background-image: url("http://5b0988e595225.cdn.sohucs.com/images/20180914/9d15e25d6b1946f28b196f597e3002ba.jpeg");
  background-size: cover;
}
.avatar {
  width: 120px;
  height: 120px;
  border: 3px solid white;
  border-radius: 50%;
}
</style>