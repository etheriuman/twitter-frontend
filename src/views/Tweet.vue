<template>
  <div class="main">
    <div class="column-left column">
      <Navbar @after-submit="handleAfterSubmit" />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
            <PageHead />
            <TweetExtend :initial-tweet="tweet"
            @after-add-like="handleAfterAddLike"
            @after-delete-like="handleAfterDeleteLike"
            />
            <!-- <ReplyCard /> -->
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
import Recommendation from './../components/Recommendation'
import TweetExtend from './../components/TweetExtend'
// import ReplyCard from './../components/ReplyCard'

const dummyData = {
  tweet: {
    id: 2, // 推文id
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit voluptatem repellat autem in molestiae saepe.333', // 推文內容
    likesNumber: 23, // 推文like數
    repliesNumber: 3, // 推文回覆數
    createdAt: '2011-04-20T09:30:51.01', // 推文發布時間
    isLiked: true, // 是否按過like
    User: { // 推主資料
      id: 1, // 連結用user.id
      name: 'Pizza Hut', // 推主名稱
      account: '@pizzahut', // 推主帳號
      avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg', // 推主照片
    },
    Replies: [ //推文回覆串
      {
        id: 5, // 回覆id
        comment: 'Yeah! I think so', // 回覆內容
        createdAt: '', // 回覆發布時間
        User: { // 回覆者資料
          id: 4, // 連結用user.id
          name: 'Ricardo Milos', // 回覆者名稱
          account: '@ricardomilos', // 回覆者帳號
          avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 回覆者照片
        }
      },
      {
        id: 3, // 回覆id
        comment: 'No! I dont think so', // 回覆內容
        createdAt: '', // 回覆發布時間
        User: { // 回覆者資料
          id: 5, // 連結用user.id
          name: 'Joe Biden', // 回覆者名稱
          account: '@joebiden', // 回覆者帳號
          avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 回覆者照片
        }
      },
      {
        id: 2, // 回覆id
        comment: 'Well! I dont know', // 回覆內容
        createdAt: '', // 回覆發布時間
        User: { // 回覆者資料
          id: 6, // 連結用user.id
          name: 'Donald Trump', // 回覆者名稱
          account: '@donaldtrump', // 回覆者帳號
          avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 回覆者照片
        }
      }
    ]
  } 
}

export default {
  components: {
    Navbar,
    PageHead,
    Recommendation,
    TweetExtend,
    // ReplyCard
  },
  data() {
    return {
      tweet: []
    }
  },
  methods: {
    handleAfterSubmit() {
      console.log('new tweet uploaded')
    },
    fetchTweet() {
      this.tweet = dummyData.tweet
    },
    handleAfterAddLike() {
      console.log('add like')
      this.tweet = {
        ...this.tweet,
        isLiked: true,
        likesNumber: this.tweet.likesNumber + 1
      }
    },
    handleAfterDeleteLike() {
      console.log('delete like')
      this.tweet = {
        ...this.tweet,
        isLiked: false,
        likesNumber: this.tweet.likesNumber - 1
      }
    },
    handleAfterReply(replyData) {
      console.log('replied')
      console.log(replyData)
      const { tweetId } = replyData
      this.tweets = this.tweets.map(tweet => {
        if (tweet.id === tweetId) {
          console.log('this tweet is', tweet)
          return {
            ...tweet,
            repliesNumber: tweet.repliesNumber + 1
          }
        }
        return tweet
      })
    }
  },
  created() {
    this.fetchTweet()
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
  grid-template-columns: 220px 1fr 300px;
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

.column {
  display: flex;
}

.column-left {
  grid-area: left;
  justify-content: flex-end;
}

.column-main {
  grid-area: main;
  justify-content: center;
}

.column-right {
  grid-area: right;
  justify-content: flex-start;
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
  grid-template-rows: calc(100% - 50px) 50px;
  grid-template-columns: 1fr 300px;
  grid-template-areas:
    "main main"
    "left left";
}

.column-right {
  display: none;
}


}
</style>