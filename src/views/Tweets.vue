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
            <TweetCard 
            v-for="tweet in tweets" 
            :key="tweet.id" 
            :initial-tweet="tweet"
            />
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

const dummyData = {
  tweets: [
      {
			id: 1, // 推文id
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?', // 推文內容
			likesNumber: 22, // 推文like數
			repliesNumber: 7, // 推文回復數
			createdAt: '', // 推文發布時間
			isLiked: true, // 是否按過like
			User: { 
				id: 1, // 連結用user.id
				name: 'Pizza Hut', // 推主名稱
				account: '@pizzahut', // 推主帳號
				avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 推主照片
			}
		},
    {
			id: 2, // 推文id
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?', // 推文內容
			likesNumber: 22, // 推文like數
			repliesNumber: 7, // 推文回復數
			createdAt: '', // 推文發布時間
			isLiked: false, // 是否按過like
			User: { 
				id: 2, // 連結用user.id
				name: 'Woof Woof', // 推主名稱
				account: '@pizzahut', // 推主帳號
				avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 推主照片
			}
		},
    {
			id: 3, // 推文id
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?', // 推文內容
			likesNumber: 22, // 推文like數
			repliesNumber: 7, // 推文回復數
			createdAt: '', // 推文發布時間
			isLiked: false, // 是否按過like
			User: { 
				id: 3, // 連結用user.id
				name: 'Pizza Hut', // 推主名稱
				account: '@pizzahut', // 推主帳號
				avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 推主照片
			}
		},
    {
			id: 4, // 推文id
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?', // 推文內容
			likesNumber: 22, // 推文like數
			repliesNumber: 7, // 推文回復數
			createdAt: '', // 推文發布時間
			isLiked: false, // 是否按過like
			User: { 
				id: 4, // 連結用user.id
				name: 'Pizza Hut', // 推主名稱
				account: '@pizzahut', // 推主帳號
				avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 推主照片
			}
		},
    {
			id: 5, // 推文id
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?', // 推文內容
			likesNumber: 22, // 推文like數
			repliesNumber: 7, // 推文回復數
			createdAt: '', // 推文發布時間
			isLiked: false, // 是否按過like
			User: { 
				id: 5, // 連結用user.id
				name: 'Pizza Hut', // 推主名稱
				account: '@pizzahut', // 推主帳號
				avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 推主照片
			}
		},
    {
			id: 6, // 推文id
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?', // 推文內容
			likesNumber: 22, // 推文like數
			repliesNumber: 7, // 推文回復數
			createdAt: '', // 推文發布時間
			isLiked: true, // 是否按過like
			User: { 
				id: 6, // 連結用user.id
				name: 'Pizza Hut', // 推主名稱
				account: '@pizzahut', // 推主帳號
				avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 推主照片
			}
		},
    {
			id: 7, // 推文id
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?', // 推文內容
			likesNumber: 22, // 推文like數
			repliesNumber: 7, // 推文回復數
			createdAt: '', // 推文發布時間
			isLiked: true, // 是否按過like
			User: { 
				id: 7, // 連結用user.id
				name: 'Pizza Hut', // 推主名稱
				account: '@pizzahut', // 推主帳號
				avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 推主照片
			}
		},
    {
			id: 8, // 推文id
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?', // 推文內容
			likesNumber: 22, // 推文like數
			repliesNumber: 7, // 推文回復數
			createdAt: '', // 推文發布時間
			isLiked: true, // 是否按過like
			User: { 
				id: 8, // 連結用user.id
				name: 'Pizza Hut', // 推主名稱
				account: '@pizzahut', // 推主帳號
				avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 推主照片
			}
		},
    {
			id: 9, // 推文id
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?', // 推文內容
			likesNumber: 22, // 推文like數
			repliesNumber: 7, // 推文回復數
			createdAt: '', // 推文發布時間
			isLiked: false, // 是否按過like
			User: { 
				id: 9, // 連結用user.id
				name: 'Pizza Hut', // 推主名稱
				account: '@pizzahut', // 推主帳號
				avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 推主照片
			}
		},
    {
			id: 10, // 推文id
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ipsa a molestias. Ratione, doloremque culpa?', // 推文內容
			likesNumber: 22, // 推文like數
			repliesNumber: 7, // 推文回復數
			createdAt: '', // 推文發布時間
			isLiked: true, // 是否按過like
			User: { 
				id: 10, // 連結用user.id
				name: 'Pizza Hut', // 推主名稱
				account: '@pizzahut', // 推主帳號
				avatar: 'https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' // 推主照片
			}
		}

  ]

}

export default {
  components: {
    Navbar,
    PageHead,
    NewTweet,
    TweetCard,
    Recommendation
  },
  data() {
    return {
      tweets: []
    }
  },
  methods: {
    fetchTweets() {
      this.tweets = {
        ...dummyData.tweets
      }
    }
  },
  created() {
    this.fetchTweets()
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

}
</style>