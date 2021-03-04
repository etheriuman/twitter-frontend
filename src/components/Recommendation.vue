// 右側的使用者推薦欄位（區塊內部的使用者可以再分出來做成component）
<template>
  <div class="card">
    <ul class="list-group">
      <li class="list-group-item">
        跟隨誰
      </li>
      <li class="list-group-item">
        <div class="main-content">
          <div class="main-left">
            <img class="avatar" src="https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg" alt="avatar">
          </div>
          <div class="main-right">
            <p>Pizza Hut</p>
            <p class="text-muted">@pizzahut</p>
          </div>
        </div>
        <div class="side-content">
          <button 
          type="button"
          class="btn btn-sm btn-primary follow-button"
          >
            跟隨
          </button>
        </div>
      </li>
      <li class="list-group-item">
        <button class="show-more" type="btn">
            顯示更多
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.card {
  width: 90%;
  margin-top: 20px;
  border: none;
}

.list-group {
  border-radius: 15px!important;
}

.list-group-item {
  padding: 15px;
  display: flex;
  flex: 0 1 auto;
  justify-content: space-between;
}

.list-group-item:first-child,
.list-group-item:last-child {
  padding: 10px 15px;
}

.main-content {
  display: flex;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.main-right {
  padding-left: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.main-right p {
  margin: 0;
}

.side-content {
  display: flex;
  align-items: center;
}

.show-more {
  color: #ff6600;
  background: none;
  border: none;
  padding: none;
}

/* mobile 尺寸不顯示(grid issue) */
@media screen and (max-width: 768px) {
.card {
  display: none;
}
}
</style>