<template>
  <div id="twitter-frontend">
      <router-view/>
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { socket } from './main'

export default {
  name: 'App',
  created() {
    // 連線時
    socket.on('connect', () => {
      console.log('connected!!!')
    })
    // 斷線時
    socket.on('disconnect', (data) => {
      console.log('socket disconnected:', data)
    })
    // 連線異常時
    socket.on ('connect_error', (error) => {
      console.log('connect error: ', error.message)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
