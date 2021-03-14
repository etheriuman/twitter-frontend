<template>
  <div class="list-group-item">
    <div class="card-body">
      <div class="card-top">
        <router-link :to="{name: 'tweet', params: {id: notification.User.id}}">
          <img class="user-avatar" :src="notification.User.avatar | emptyImage" alt="user-avatar">
        </router-link>
      </div>
      <div class="card-mid">
        <p>
          {{notification.User.name}} 有新的推文通知
        </p>
      </div>
      <div class="card-bot">
        <p class="description text-muted">
          {{notification.Tweet.description}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  mixins: [emptyImageFilter]
}
</script>

<style scoped>
* {
  /* outline: 1px solid pink; */
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