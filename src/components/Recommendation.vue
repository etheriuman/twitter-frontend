// 右側的使用者推薦欄位（區塊內部的使用者可以再分出來做成component）
<template>
  <div class="card">
    <ul class="list-group">
      <li class="list-group-item">
        跟隨誰
      </li>
      <li 
      v-for="user in users" 
      :key="user.id"
      class="list-group-item"
      >
        <div class="main-content">
          <div class="main-left">
            <router-link :to="{ name: 'user-tweets', params: {id: user.id} }">
              <img class="avatar" :src="user.avatar" alt="avatar">
            </router-link>
          </div>
          <div class="main-right">
            <p>{{user.name}}</p>
            <p class="text-muted">{{user.account}}</p>
          </div>
        </div>
        <div class="side-content">
          <button 
          v-if="user.isFollowed"
          type="button"
          class="btn btn-sm btn-primary follow-button"
          @click.prevent.stop="deleteFollow(user.id)"
          >
            正在跟隨
          </button>
          <button 
          v-else
          type="button"
          class="btn btn-sm btn-outline-primary follow-button"
          @click.prevent.stop="addFollow(user.id)"
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

<script>
const dummyData = {
  users: [
		{
			id: 1, // 使用者id
			name: 'Pizza Hut', // 使用者名稱
			avatar: 'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg', // 使用者照片
			account: '@pizzahut', // 使用者帳號
			isFollowed: true // 是否追蹤中
		},
		{
			id: 2, // 使用者id
			name: 'Ether Huang', // 使用者名稱
			avatar: 'https://media.nu.nl/m/m1mxngvaigrv_wd1280.jpg/disney-verschuift-release-avatar-2-en-kondigt-nieuwe-star-wars-films-aan.jpg', // 使用者照片
			account: '@etherhuang', // 使用者帳號
			isFollowed: false // 是否追蹤中
		},
    {
			id: 3, // 使用者id
			name: 'Pizza Hut', // 使用者名稱
			avatar: 'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg', // 使用者照片
			account: '@pizzahut', // 使用者帳號
			isFollowed: true // 是否追蹤中
		},
		{
			id: 4, // 使用者id
			name: 'Ether Huang', // 使用者名稱
			avatar: 'https://media.nu.nl/m/m1mxngvaigrv_wd1280.jpg/disney-verschuift-release-avatar-2-en-kondigt-nieuwe-star-wars-films-aan.jpg', // 使用者照片
			account: '@etherhuang', // 使用者帳號
			isFollowed: false // 是否追蹤中
		},
    {
			id: 5, // 使用者id
			name: 'Pizza Hut', // 使用者名稱
			avatar: 'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg', // 使用者照片
			account: '@pizzahut', // 使用者帳號
			isFollowed: true // 是否追蹤中
		},
		{
			id: 6, // 使用者id
			name: 'Ether Huang', // 使用者名稱
			avatar: 'https://media.nu.nl/m/m1mxngvaigrv_wd1280.jpg/disney-verschuift-release-avatar-2-en-kondigt-nieuwe-star-wars-films-aan.jpg', // 使用者照片
			account: '@etherhuang', // 使用者帳號
			isFollowed: false // 是否追蹤中
		},
	]
}

export default {
  data() {
    return {
      users: []
    }
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users
    },
    addFollow(userId) {
      // API POST request ...
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowed: true
          }
        }
        return user
      })
    },
    deleteFollow(userId) {
      // API DELETE request ...
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowed: false
          }
        }
        return user
      })
    }
  },
  created() {
    this.fetchUsers()
    console.log(this.users)
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
  object-fit: cover;
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
</style>