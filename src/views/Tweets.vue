<template>
  <div class="main">
    <div class="column-left column">
      <Navbar />
    </div>
    <div class="column-main column"></div>
    <div class="column-right column"></div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
* {
  outline: 1px solid pink;
}
.main {
  height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-areas: "left main right" ;
}

.column-left {
  grid-area: left;
}

.column-main {
  grid-area: main;
}

.column-right {
  grid-area: right;
}

.column {
  display: flex;
  justify-content: center;
}
</style>