<template>
  <div class="text-block">
    <div v-if="type === 'self'" class="bubble bubble-self">
      <p class="message message-self">{{ message }}</p>
      <p class="text-muted text-sm">{{ createdAt | time }}</p>
    </div>
    <div v-if="type === 'other'" class="bubble bubble-other">
      <p class="message message-other">{{ message }}</p>
      <p class="text-muted text-sm">{{ createdAt | time }}</p>
    </div>
    <div v-if="type === 'system'" class="bubble bubble-system">
      <p class=" message message-system">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { momentFilter } from './../utils/mixins'

export default {
  data() {
    return {
      type: 'self', // or 'other' or 'system'
      message: '123123123',
      createdAt: '',
      userName: ''
    }
  },
  mixins: [momentFilter]
}
</script>

<style scoped>
  * {
    /* outline: 1px solid pink; */
  }

  .text-block {
    width: 100%;
    min-height: 30px;
    padding: 10px 20px;
    margin-top: 25px;
  }
  .bubble {
    max-width: 100%;
    display: flex;
    flex-flow: column;
  }
  .bubble-self {
    align-items: flex-end;
  }
  .bubble-other {
    align-items: flex-start;
  }
  .bubble-system {
    align-items: center;
  }
  .message {
    max-width: 60%;
    word-break: break-all;
    padding: 5px 10px;
  }
  .message-self {
    background: #ff6600;
    color: white;
    border-radius: 15px 15px 0 15px;
  }
  .message-other {
    background: #eeeeee;
    color: #222222;
    border-radius: 15px 15px 15px 0;
  }
  .message-system {
    background: #eeeeee;
    color: #555555;
    border-radius: 15px;
  }
</style>