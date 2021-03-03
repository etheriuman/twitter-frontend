// 新增推文用的 modal
<template>
  <!-- Modal -->
    <div class="modal fade" id="tweeting" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form class="modal-body">
            <textarea 
            type="textarea" 
            class="tweeting-area" 
            placeholder="說些什麼吧"
            autofocus
            />
            <img class="avatar" src="https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg" alt="">
            <button type="button" class="tweeting-submit btn btn-primary">
              推文
            </button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>

/* 統一屬性 */
.modal-dialog {
  width: 50vw;
}
/* 統一屬性 */
.modal-content {
  border-radius: 15px;
}
/* 統一屬性 */
.modal-header button {
  margin: 0;
  padding: 0;
}

.modal-body {
  position: relative;
  padding: 20px;
  height: 300px;
  border-radius: 20px;
}
/* 統一屬性 */
.avatar {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 10px;
  border-radius: 50%;
}

.tweeting-area {
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);
  padding: 35px 20px 0px 70px;
  top: 0;
  left: 0;
  border: none;
  resize: none;
  outline: none;
}

.tweeting-submit {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

</style>