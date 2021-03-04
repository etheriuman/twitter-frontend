// 推文卡片
<template>
  <div class="list-group-item">
    <form class="card-body">
      <div class="card-body-side">
        <img class="avatar" src="https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg" alt="">
      </div>
      <div class="card-body-content">
        <div class="content-header">
          <span class="user-name">Apple</span>
          <span>@apple</span>
          <span> &#8231; </span>
          <span>3小時</span>
        </div>
        <div class="content-body">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed obcaecati repellat distinctio mollitia ducimus neque repellendus corrupti nulla pariatur harum!</p>
        </div>
        <div class="content-footer">
          <div class="reply">
            <font-awesome-icon class="icon" icon="comment" />
            <span>13</span>
          </div>
          <div class="like">
            <font-awesome-icon class="icon" icon="heart" />
            <span>76</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

.list-group-item {
  padding: 0;
}

.card-body {
  position: relative;
  display: flex;
  padding: 5px 10px 10px 10px;
}

.card-body-side {
  width: 60px;
  height: 100%;
  text-align: center;
}

.card-body-content {
  width: 100%;
  height: 100%;
  padding-left: 10px;
}

.content-header {
  margin-bottom: 10px;
}

.user-name {
  margin-right: 10px;
}

.content-footer {
  display: flex;
}

.icon {
  margin-right: 15px;
}

.reply {
  margin-right: 50px;
}

/* 統一屬性 */
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}


</style>