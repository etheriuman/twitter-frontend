// 使用者追隨追蹤頁會用到的使用者卡片
<template>
  <div class="list-group-item">
    <div class="main-content">
      <div class="main-left">
        <router-link :to="{ name: 'user-tweets', params: { id: follow.id } }">
          <img class="avatar" :src="follow.avatar | emptyImage" alt="avatar" />
        </router-link>
      </div>
      <div class="main-right">
        <p class="follow-name">{{ follow.name }}</p>
        <p class="text-muted">{{ follow.account }}</p>
        <p>{{ follow.introduction }}</p>
      </div>
    </div>
    <div class="side-content">
      <button
        v-if="follow.isFollowed && (currentUserId !== follow.followId)"
        @click.prevent.stop="deleteFollow(follow.followId)"
        type="button"
        class="btn btn-primary follow-button"
      >
        正在跟隨
      </button>
      <button
        v-if="(!follow.isFollowed) && (currentUserId !== follow.followId)"
        @click.prevent.stop="addFollow(follow.followId)"
        type="button"
        class="btn btn-outline-primary follow-button"
      >
        跟隨
      </button>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'

export default {
  name: "UserCard",
  mixins: [emptyImageFilter],
  props: {
    initialFollow: {
      type: Object,
      required: true,
    },
    currentUserId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      follow: this.initialFollow
    }
  },
  methods: {
    addFollow(followId) {
      this.follow.isFollowed = true
      const payLoad = {id: followId}
      this.$emit("afterAddFollow", payLoad)
    },
    deleteFollow(followId) {      
      this.$emit("afterDeleteFollow", followId)
    },
  },
  watch: {
    initialFollow() {
      this.follow = this.initialFollow
    },
  }
}
</script>

<style scoped>
.card {
  width: 90%;
  margin-top: 20px;
  border: none;
}

.list-group {
  border-radius: 15px !important;
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
  position: relative;
  display: flex;
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
  position: absolute;
  right: 5%;
  display: flex;
  align-items: center;
}
</style>