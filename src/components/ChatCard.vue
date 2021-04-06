<template>
  <router-link :to="{name: 'chat-private', params: {id: chat.User.id}}" class="list-group-item">
    <div class="card-body">
      <div class="card-body-side">
        <!-- user avatar -->
        <router-link :to="{name: 'user-tweets', params: {id:chat.User.id}}">
          <img class="avatar" :src="chat.User.avatar | emptyImage" alt="">
        </router-link>
      </div>
      <div class="card-body-content">
        <!-- replyCard header -->
        <div class="content-header">
          <span class="user-name">{{chat.User.name}}</span>
          <span class="text-muted">{{chat.User.account}}</span>
        </div>
        <div class="content-body text-muted text-sm">
          {{chat.lastMessage}}
        </div>
        <div class="content-body text-muted text-sm">
          {{chat.createdAt | fromNow}}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { emptyImageFilter, fromNowFilter } from './../utils/mixins'

export default {
  props: {
    chat: {
      type: Object,
      required: true
    }
  },
  mixins: [emptyImageFilter, fromNowFilter]
}
</script>

<style scoped>

.card-body {
  position: relative;
  display: flex;
  padding: 15px 10px;
}

.card-body-side {
  width: 60px;
  height: 100%;
  text-align: center;
}

.card-body-content {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  padding-left: 10px;
}

.user-name {
  margin-right: 10px;
}

.content-body {
  max-width: 220px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>