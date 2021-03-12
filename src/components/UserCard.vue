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
        v-if="isProcessing"
        type="button"
        class="btn btn-sm btn-primary follow-button"
        disabled
      >
        處理中
      </button>
      <template v-else>
        <button
          v-if="follow.isFollowed && (currentUserId !== follow.followId)"
          @click.prevent.stop="deleteFollow(follow.followId)"
          type="button"
          class="btn btn-sm btn-primary follow-button"
        >
          正在跟隨
        </button>
        <button
          v-if="(!follow.isFollowed) && (currentUserId !== follow.followId)"
          @click.prevent.stop="addFollow(follow.followId)"
          type="button"
          class="btn btn-sm btn-outline-primary follow-button"
        >
          跟隨
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import followAPI from './../apis/follow'
import { Toast } from './../utils/helpers'
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
      follow: this.initialFollow,
      isProcessing: false
    }
  },
  methods: {
    async addFollow(followId) {
      try {
        const payLoad = {id: followId}
        this.isProcessing = true
        const { data } = await followAPI.addFollow({ payLoad })
        this.isProcessing = false
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.follow.isFollowed = true
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法追蹤使用者，請稍後再試'
        })
        this.isProcessing = false
        console.log(error)
      }
    },
    async deleteFollow(followId) {
      try {
        this.isProcessing = true
        const { data } = await followAPI.removeFollow({ followId })
        this.isProcessing = false
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.follow.isFollowed = false
        this.$emit('after-delete-follow', followId)
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法退追使用者，請稍後再試'
        })
        this.isProcessing = false
        console.log(error)
      }
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

.list-group-item {
  padding: 15px 10px;
  display: flex;
  flex: 0 1 auto;
  justify-content: space-between;
}

.list-group-item:hover {
  transform: scale(1.01, 1.01);
  transition: all .1s ease-out;
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
  right: 15px;
  display: flex;
  align-items: center;
}
</style>