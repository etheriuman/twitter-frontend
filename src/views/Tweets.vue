<template>
  <div class="main">
    <div class="column-left column">
      <Navbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
            <PageHead />
            <NewTweet />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
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
import NewTweet from './../components/NewTweet'
import TweetCard from './../components/TweetCard'
import Recommendation from './../components/Recommendation'

export default {
  components: {
    Navbar,
    PageHead,
    NewTweet,
    TweetCard,
    Recommendation
  }
}
</script>

<style scoped>

* {
  outline: 1px solid pink;
}

.main {
  max-height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-areas: "left main right" ;
}

.main-content {
  width: 90%;
  max-height: 100vh;
  overflow: auto;
  /* hide from firefox */
  scrollbar-width: none;
}

.main-content::-webkit-scrollbar {
  /* hide from chrome */
  display: none;
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
  grid-template-areas:
    "main main"
    "left left";
}

}
</style>