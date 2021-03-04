// 首頁上方的新增推文區塊
<template>
  <div class="list-group-item">
    <form class="card-body" @>
      <div class="card-body-side">
        <!-- dynamic avatar -->
        <img class="avatar" src="https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg" alt="">
      </div>
      <div class="card-body-content">
        <textarea 
        type="textarea" 
        class="tweeting-area" 
        placeholder="說些什麼吧？"
        v-model="description"
        />
        <!-- dynamic avatar -->
        <button type="submit" class="tweeting-submit btn btn-primary">
          推文
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: ''
    }
  },
  methods: {

  }
}
</script>

<style scoped>

.list-group-item {
  padding: 0;
}

.card-body {
  position: relative;
  display: flex;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 10px #ededed;
}

.card-body-side {
  width: 60px;
  height: 100%;
  text-align: center;
}

.card-body-content {
  width: 100%;
  height: 100%;
  text-align: end;
}

/* 統一屬性 */
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.tweeting-area {
  width: 100%;
  min-height: calc(100% - 50px);
  top: 0;
  left: 0;
  padding: 10px 0 0 10px;
  border: none;
  resize: none;
  outline: none;
}

</style>