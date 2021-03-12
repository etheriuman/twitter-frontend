<template>
  <div class="card">
    <img class="card-img-top" :src="user.cover | emptyImage" alt="user cover">
    <div class="card-body">
      <!-- 使用者頭像 -->
      <div class="card-body-avatar">
        <img :src="user.avatar | emptyImage" class="avatar" alt="user avatar">
      </div>
      <!-- 使用者名稱與帳號 -->
      <div class="card-body-top">
        <p class="card-title">{{user.name}}</p>
        <p class="text-muted text-sm">{{user.account}}</p>
      </div>
      <!-- 推文與讚數 -->
      <div class="card-body-mid">
        <div class="tweets">
          <font-awesome-icon 
          class="icon text-muted" 
          icon="comment"
          />
          <span> {{user.tweetsNumber}}</span>
        </div>
        <div class="likes">
          <font-awesome-icon 
          class="icon text-muted" 
          icon="heart"
          />
          <span> {{user.gotLikesNumber}}</span>
        </div>
      </div>
      <!-- 追蹤者數與跟隨者數 -->
      <div class="card-body-bot">
        <span>{{user.followingsNumber}}位<span class="text-muted">追蹤中 </span></span>
        <span>{{user.followersNumber}}位<span class="text-muted">跟隨者</span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  mixins: [emptyImageFilter]
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.card:hover {
  transition: all .1s ease-in-out;
  transform: scale(1.05, 1.05);
}

.card-body {
  position: relative;
  display: flex;
  flex-flow: column;
  padding: 20px 10px 30px 10px;
}

.card-img-top {
  height: 45%;
  object-fit: cover;
}

.card-body-avatar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -70%);
}

.card-body-top {
  text-align: center;
  margin-bottom: 10px;
}

.card-body-top p {
  margin: 0;
}

.card-body-mid {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.tweets {
  margin-right: 15px;
}

.card-body-bot {
  text-align: center;
}

.avatar {
  width: 75px;
  height: 75px;
  border: 2px solid #eeeeee;
}

</style>