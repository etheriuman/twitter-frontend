<template>
  <div class="text-block">
    <div v-if="type === 'self'" class="bubble bubble-self">
      <p class="message message-self">{{ message }}</p>
      <p class="text-muted text-sm">{{ createdAt | time }}</p>
    </div>
    <div v-if="type === 'other'" class="bubble bubble-other">
      <div class="bubble-other-left">
          <img :src="userAvatar | emptyImage" alt="user-avatar">
      </div>
      <div class="bubble-other-right">
        <p class="message message-other">{{ message }}</p>
        <p class="text-muted text-sm">{{ createdAt | time }}</p>
      </div>
    </div>
    <div v-if="type === 'system'" class="bubble bubble-system">
      <p class=" message message-system">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { momentFilter, emptyImageFilter } from './../utils/mixins'

export default {
  data() {
    return {
      type: 'other', // or 'other' or 'system'
      message: '12312312112341234',
      createdAt: '',
      userName: '',
      userAvatar: ''
    }
  },
  mixins: [momentFilter, emptyImageFilter]
}
</script>

<style scoped>
  * {
    outline: 1px solid pink;
  }

  .text-block {
    display: flex;
    width: 100%;
    min-height: 30px;
    padding: 10px 20px;
    margin-top: 25px;
  }
  .bubble {
    width: 100%;
    display: flex;
    padding-bottom: 15px;
  }
  .bubble-self {
    justify-content: flex-end;
    position: relative;
  }
  .bubble-self .text-sm {
    position: absolute;
    right: 0;
    bottom: -5px;
  }
  .message {
    max-width: 60%;
    word-break: break-all;
    padding: 5px 10px;
  }
  .message-self {
    background: #ff6600;
    border-radius: 15px 15px 0 15px;
    color: white;
  }
  .bubble-other {
    justify-content: flex-start;
    align-items: flex-end;
    max-width: 70%;
  }
  .bubble-other-left {
    padding-bottom: 15px;
    margin-right: 10px;
  }
  .bubble-other-left img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .bubble-other-right {
    position: relative;
    padding-bottom: 15px;
    max-width: calc(100% - 50px);
  }
  .message-other {
    max-width: 100%;
    background: #dedede;
    border-radius: 15px 15px 15px 0;
    color: #222222;
  }
  .bubble-other-right .text-sm {
    position: absolute;
    left: 0;
    bottom: -5px;
  }
  .bubble-system {
    justify-content: center;
    align-items: center;
  }
  .message-system {
    background: #eeeeee;
    color: #555555;
    border-radius: 15px;
  }
</style>