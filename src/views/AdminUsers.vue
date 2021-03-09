// 管理者總使用者頁
<template>
  <div class="main">
    <div class="column-left column">
      <AdminNavbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead />
          <li class="list-group-item user-card-group">
            <AdminUserCard v-for="user in users" :key="user.id" :user="user" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import PageHead from "./../components/PageHead";
import AdminUserCard from "./../components/AdminUserCard";

const dummyData = {
  users: [
    {
      name: "Ricardo Milos", // 使用者名稱
      id: 66, // 使用者id
      account: "@recardomilos", // 使用者帳號
      avatar:
        "https://steamuserimages-a.akamaihd.net/ugc/964230781514955171/5E51E3F97ACB5D0419C65329BA942434BF81DA6E/", // 使用者照片
      cover: "https://assets.thespinoff.co.nz/1/2021/03/nyan-cat.jpg", // 使用者封面照片
      tweetsNumber: 50, // 使用者被回覆數
      gotLikesNumber: 121, // 使用者被like數
      followingsNumber: 8, // 使用者追蹤數
      followersNumber: 6, // 使用者跟隨數
    },
    {
      name: "Ricardo Milos", // 使用者名稱
      id: 67, // 使用者id
      account: "@recardomilos", // 使用者帳號
      avatar:
        "https://steamuserimages-a.akamaihd.net/ugc/964230781514955171/5E51E3F97ACB5D0419C65329BA942434BF81DA6E/", // 使用者照片
      cover: "https://assets.thespinoff.co.nz/1/2021/03/nyan-cat.jpg", // 使用者封面照片
      tweetsNumber: 50, // 使用者被回覆數
      gotLikesNumber: 121, // 使用者被like數
      followingsNumber: 8, // 使用者追蹤數
      followersNumber: 6, // 使用者跟隨數
    },
    {
      name: "Ricardo Milos", // 使用者名稱
      id: 68, // 使用者id
      account: "@recardomilos", // 使用者帳號
      avatar:
        "https://steamuserimages-a.akamaihd.net/ugc/964230781514955171/5E51E3F97ACB5D0419C65329BA942434BF81DA6E/", // 使用者照片
      cover: "https://assets.thespinoff.co.nz/1/2021/03/nyan-cat.jpg", // 使用者封面照片
      tweetsNumber: 50, // 使用者被回覆數
      gotLikesNumber: 121, // 使用者被like數
      followingsNumber: 8, // 使用者追蹤數
      followersNumber: 6, // 使用者跟隨數
    },
    {
      name: "Ricardo Milos", // 使用者名稱
      id: 69, // 使用者id
      account: "@recardomilos", // 使用者帳號
      avatar:
        "https://steamuserimages-a.akamaihd.net/ugc/964230781514955171/5E51E3F97ACB5D0419C65329BA942434BF81DA6E/", // 使用者照片
      cover: "https://assets.thespinoff.co.nz/1/2021/03/nyan-cat.jpg", // 使用者封面照片
      tweetsNumber: 50, // 使用者被回覆數
      gotLikesNumber: 121, // 使用者被like數
      followingsNumber: 8, // 使用者追蹤數
      followersNumber: 6, // 使用者跟隨數
    },
    {
      name: "Ricardo Milos", // 使用者名稱
      id: 70, // 使用者id
      account: "@recardomilos", // 使用者帳號
      avatar:
        "https://steamuserimages-a.akamaihd.net/ugc/964230781514955171/5E51E3F97ACB5D0419C65329BA942434BF81DA6E/", // 使用者照片
      cover: "https://assets.thespinoff.co.nz/1/2021/03/nyan-cat.jpg", // 使用者封面照片
      tweetsNumber: 50, // 使用者被回覆數
      gotLikesNumber: 121, // 使用者被like數
      followingsNumber: 8, // 使用者追蹤數
      followersNumber: 6, // 使用者跟隨數
    },
    {
      name: "Ricardo Milos", // 使用者名稱
      id: 71, // 使用者id
      account: "@recardomilos", // 使用者帳號
      avatar:
        "https://steamuserimages-a.akamaihd.net/ugc/964230781514955171/5E51E3F97ACB5D0419C65329BA942434BF81DA6E/", // 使用者照片
      cover: "https://assets.thespinoff.co.nz/1/2021/03/nyan-cat.jpg", // 使用者封面照片
      tweetsNumber: 50, // 使用者被回覆數
      gotLikesNumber: 121, // 使用者被like數
      followingsNumber: 8, // 使用者追蹤數
      followersNumber: 6, // 使用者跟隨數
    },
    {
      name: "Ricardo Milos", // 使用者名稱
      id: 72, // 使用者id
      account: "@recardomilos", // 使用者帳號
      avatar:
        "https://steamuserimages-a.akamaihd.net/ugc/964230781514955171/5E51E3F97ACB5D0419C65329BA942434BF81DA6E/", // 使用者照片
      cover: "https://assets.thespinoff.co.nz/1/2021/03/nyan-cat.jpg", // 使用者封面照片
      tweetsNumber: 50, // 使用者被回覆數
      gotLikesNumber: 121, // 使用者被like數
      followingsNumber: 8, // 使用者追蹤數
      followersNumber: 6, // 使用者跟隨數
    },
    {
      name: "Ricardo Milos", // 使用者名稱
      id: 73, // 使用者id
      account: "@recardomilos", // 使用者帳號
      avatar:
        "https://steamuserimages-a.akamaihd.net/ugc/964230781514955171/5E51E3F97ACB5D0419C65329BA942434BF81DA6E/", // 使用者照片
      cover: "https://assets.thespinoff.co.nz/1/2021/03/nyan-cat.jpg", // 使用者封面照片
      tweetsNumber: 50, // 使用者被回覆數
      gotLikesNumber: 121, // 使用者被like數
      followingsNumber: 8, // 使用者追蹤數
      followersNumber: 6, // 使用者跟隨數
    },
    {
      name: "Ricardo Milos", // 使用者名稱
      id: 74, // 使用者id
      account: "@recardomilos", // 使用者帳號
      avatar:
        "https://steamuserimages-a.akamaihd.net/ugc/964230781514955171/5E51E3F97ACB5D0419C65329BA942434BF81DA6E/", // 使用者照片
      cover: "https://assets.thespinoff.co.nz/1/2021/03/nyan-cat.jpg", // 使用者封面照片
      tweetsNumber: 50, // 使用者被回覆數
      gotLikesNumber: 121, // 使用者被like數
      followingsNumber: 8, // 使用者追蹤數
      followersNumber: 6, // 使用者跟隨數
    },
    {
      name: "Ricardo Milos", // 使用者名稱
      id: 75, // 使用者id
      account: "@recardomilos", // 使用者帳號
      avatar:
        "https://steamuserimages-a.akamaihd.net/ugc/964230781514955171/5E51E3F97ACB5D0419C65329BA942434BF81DA6E/", // 使用者照片
      cover: "https://assets.thespinoff.co.nz/1/2021/03/nyan-cat.jpg", // 使用者封面照片
      tweetsNumber: 50, // 使用者被回覆數
      gotLikesNumber: 121, // 使用者被like數
      followingsNumber: 8, // 使用者追蹤數
      followersNumber: 6, // 使用者跟隨數
    },
  ],
};

export default {
  components: {
    AdminNavbar,
    PageHead,
    AdminUserCard,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users;
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.main {
  grid-template-columns: 220px 1fr;
  grid-template-areas: "left main";
}

.user-card-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  padding: 20px;
  grid-gap: 10px;
}

/* pad 尺寸 */
@media screen and (max-width: 992px) {
  .column-left {
    outline-width: 0;
  }
}

/* mobile 尺寸 */
@media screen and (max-width: 768px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "main main"
      "left left";
  }
  .column-left {
    outline-width: 1px;
  }
  .column-right {
    display: none;
  }
}
</style>