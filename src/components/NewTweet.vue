// 首頁上方的新增推文區塊
<template>
  <div class="list-group-item">
    <form class="card-body">
      <textarea 
      type="textarea" 
      class="tweeting-area" 
      placeholder="說些什麼吧？"
      autofocus
      />
      <!-- dynamic avatar -->
      <img class="avatar" src="https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg" alt="">
      <button type="button" class="tweeting-submit btn btn-primary">
        推文
      </button>
    </form>
  </div>
</template>

<style scoped>

.list-group-item {
  padding: 0;
}

.card-body {
  position: relative;
  flex: 0 1 auto;
  padding: 10px;
  margin-bottom: 20px;
  height: 120px;
  box-shadow: 0px 10px #ededed;
}
/* 統一屬性 */
.avatar {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 10px;
  border-radius: 50%;
}

.tweeting-area {
  position: absolute;
  width: 100%;
  padding: 20px 70px 0px 70px;
  top: 0;
  left: 0;
  border: none;
  resize: none;
  outline: none;
}

.tweeting-submit {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

</style>