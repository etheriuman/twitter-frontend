<template>
  <div class="container">
    <div class="message-area">
      <TextBlock />
    </div>
    <div class="type-area">
      <div class="text" >
        <input type="text" v-model="text" />
      </div>
      <div class="submit">
        <font-awesome-icon class="icon" icon="play" />
      </div>
    </div>
  </div>
</template>

<script>
import TextBlock from './../components/TextBlock'

export default {
  components: {
    TextBlock
  },
  data() {
    return {
      text: '',
      messages: []
    }
  }
}
</script>

<style scoped>
  * {
    /* outline: 1px solid pink; */
  }

  .container {
    height: 100%;
    padding: 0;
  }
  .message-area {
    height: calc(100% - 50px);
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 15px;
  }
  .type-area {
    display: flex;
    height: 50px;
    border-top: 1px solid #dededede;
    overflow: auto;
    scrollbar-width: none;
  }
  .type-area::-webkit-scrollbar {
    /* hide from chrome */
    display: none;
  }
  .text {
    display: flex;
    align-items: center;
    width: 90%;
    padding: 0 20px;
  }
  .text input,
  .text input:focus {
    display: block;
    border-radius: 25px;
    border: none;
    outline: none;
    background: #eeeeee;
    height: 25px;
    width: 100%;
    padding: 0 15px;
    box-shadow: none;
  }
  .submit {
    width: 10%;
    height: 100%;
    min-width: 30px;
    text-align: center;
    color: #ff6600;
  }
  .icon {
    line-height: 100%;
  }
</style>