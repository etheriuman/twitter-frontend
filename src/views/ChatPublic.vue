<template>
  <div class="main">
    <div class="column-left column">
      <Navbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead :static-title="`上線使用者(${onlineUsers.length})`" />
          <p class="loading" v-if="isLoading">努力加載中...</p>
          <OnlineUser v-for="onlineUser in onlineUsers" :key="onlineUser.id" :online-user="onlineUser"/>
        </ul>
      </div>
    </div>
    <div class="column-right column">
      <PageHead :static-title="'公開聊天室'" />
      <ChatRoom />
    </div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PageHead from './../components/PageHead'
import ChatRoom from './../components/ChatRoom'
import OnlineUser from './../components/OnlineUser'
// import { Toast } from './../utils/helpers'


export default {
  components: {
    Navbar,
    PageHead,
    ChatRoom,
    OnlineUser
  },
  data() {
    return {
      isLoading: false,
      onlineUsers: [
        {
          id: 1,
          name: 'Ether',
          avatar: '',
          account: '@ether'
        },
        {
          id: 2,
          name: 'Belinda',
          avatar: '',
          account: '@belinda'
        }
      ]
    }
  }
}
</script>

<style scoped>
.main {
  grid-template-columns: 220px 320px 1fr;
  grid-template-areas: "left main right";
}
.column-main {
  padding: 0px;
}
.column-right {
  flex-flow: column;
}


/* pad 尺寸 */
@media screen and (max-width: 992px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 320px 1fr;
    grid-template-areas:
      "main right"
      "left left";
  }
  .navbar {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
}

/* mobile 尺寸 */
@media screen and (max-width: 576px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "right right"
      "left left";
  }
  .column-left {
    outline-width: 1px;
  }
  .column-main {
    display: none;
  }
}
</style>