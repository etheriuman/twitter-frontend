<template>
  <div class="main">
    <div class="column-left column">
      <Navbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead />
          <p class="loading" v-if="isLoading">努力加載中...</p>
          <NotificationCard v-for="(notification, index) in notifications" :key="index" :notification="notification" />
        </ul>
      </div>
    </div>
    <div class="column-right column">
      <Recommendation />
    </div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PageHead from './../components/PageHead'
import NotificationCard from './../components/NotificationCard'
import Recommendation from './../components/Recommendation'
import { mapState } from 'vuex'
import { socket } from './../main'


export default {
  components: {
    Navbar,
    PageHead,
    NotificationCard,
    Recommendation
  },
  data() {
    return {
      isLoading: false,
      notifications: [
        {
          type: 'tweet',
          createdAt: '',
          User: {
            id: 2,
            name: 'Yu Wen',
            avatar: ''
          },
          Tweet: {
            id: 5,
            description: '爽啊，次啊'
          }
        },
        {
          type: 'tweet',
          createdAt: '',
          User: {
            id: 3,
            name: 'Allen',
            avatar: ''
          },
          Tweet: {
            id: 6,
            description: '爽啊，次啊'
          }
        },
        {
          type: 'like',
          createdAt: '',
          User: {
            id: 3,
            name: 'Allen',
            avatar: ''
          },
          Tweet: {
            id: 6,
            description: '爽啊，次啊'
          }
        },
        {
          type: 'follow',
          createdAt: '',
          User: {
            id: 3,
            name: 'Allen',
            avatar: ''
          }
        },
        {
          type: 'reply',
          createdAt: '',
          User: {
            id: 3,
            name: 'Allen',
            avatar: ''
          },
          Tweet: {
            id: 6,
            description: '爽啊，次啊'
          },
          Reply: {
            comment: '我覺得可以'
          }
        }
      ]
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    // 請求取得歷史通知
    const payLoad = {
      userId: this.currentUser.id
    }
    socket.emit('getAllNotification', payLoad)
  },
  created() {
    socket.on('receiveAllNotification', (data) => {
      console.log('receiveAllnotification: ', data)
      this.notifications = [...data]
    })
    socket.on('receiveNotification', (data) => {
      console.log('receiveNotification: ', data)
      this.notifications.unshift(data)
    })
  },
  beforeDestroy() {
    // 跳出頁面前清空監聽器，避免重複掛載
    socket.removeAllListeners()
  }
}
</script>

<style scoped>
.main {
  grid-template-columns: 220px 1fr 300px;
  grid-template-areas: "left main right";
}

/* pad 尺寸 */
@media screen and (max-width: 992px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "main right"
      "left left";
  }
}

/* mobile 尺寸 */
@media screen and (max-width: 768px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "main main"
      "left left";
  }
  .column-right {
    display: none;
  }
}
</style>