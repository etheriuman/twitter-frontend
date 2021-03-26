<template>
  <div class="list-group-item">
    <!-- 按讚 -->
    <router-link
    :to="{name: 'tweet', params: {id: notification.Tweet.id}}"
    class="card-body"
    v-if="notification.type === 'like'"
    >
      <span class="text-muted noti-time">{{notification.createdAt | fromNow}}</span>
      <div class="card-top">
        <router-link :to="{name: 'tweet', params: {id: notification.User.id}}">
          <img class="user-avatar" :src="notification.User.avatar | emptyImage" alt="user-avatar">
        </router-link>
      </div>
      <div class="card-mid">
        <p>
          {{notification.User.name}} 喜歡你的推文
        </p>
      </div>
    </router-link>
    <!-- 追蹤 -->
    <router-link
    :to="{name: 'user-tweets', params: {id: notification.User.id}}"
    class="card-body"
    v-if="notification.type === 'follow'"
    >
      <span class="text-muted noti-time">{{notification.createdAt | fromNow}}</span>
      <div class="card-top">
        <router-link :to="{name: 'tweet', params: {id: notification.User.id}}">
          <img class="user-avatar" :src="notification.User.avatar | emptyImage" alt="user-avatar">
        </router-link>
      </div>
      <div class="card-mid">
        <p>
          {{notification.User.name}} 開始追蹤你
        </p>
      </div>
    </router-link>
    <!-- 回覆 -->
    <router-link
    :to="{name: 'tweet', params: {id: notification.Tweet.id}}"
    class="card-body"
    v-if="notification.type === 'reply'"
    >
      <span class="text-muted noti-time">{{notification.createdAt | fromNow}}</span>
      <div class="card-top">
        <router-link :to="{name: 'tweet', params: {id: notification.User.id}}">
          <img class="user-avatar" :src="notification.User.avatar | emptyImage" alt="user-avatar">
        </router-link>
      </div>
      <div class="card-mid">
        <p>
          {{notification.User.name}} 回覆了你的推文
        </p>
      </div>
      <div class="card-bot">
        <p class="description text-muted">
          {{notification.Reply.comment}}
        </p>
      </div>
    </router-link>
    <!-- 推文 -->
    <router-link
    :to="{name: 'tweet', params: {id: notification.Tweet.id}}"
    class="card-body"
    v-if="notification.type === 'tweet'"
    >
      <span class="text-muted noti-time">{{notification.createdAt | fromNow}}</span>
      <div class="card-top">
        <router-link :to="{name: 'tweet', params: {id: notification.User.id}}">
          <img class="user-avatar" :src="notification.User.avatar | emptyImage" alt="user-avatar">
        </router-link>
      </div>
      <div class="card-mid">
        <p>
          {{notification.User.name}} 發布了一則新推文
        </p>
      </div>
      <div class="card-bot">
        <p class="description text-muted">
          {{notification.Tweet.description}}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { emptyImageFilter, fromNowFilter } from './../utils/mixins'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  mixins: [emptyImageFilter, fromNowFilter]
}
</script>

<style scoped>
* {
  /* outline: 1px solid pink; */
}
.list-group-item {
  position: relative;
}
.noti-time {
  position: absolute;
  top: 5px;
  right: 20px;
}
.card-body {
  display: flex;
  flex-flow: column;
  padding: 5px 10px;
}
.card-top {
  margin-bottom: 10px;
}
.user-avatar{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.card-mid {
  margin-bottom: 20px;
  font-weight: 450;
}
.card-bot {
  margin-bottom: 15px;
}
</style>