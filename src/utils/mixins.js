import moment from 'moment'

// moment 時距計算filter
export const fromNowFilter = {
  filters: {
    fromNow(dateTime) {
      return dateTime? moment(dateTime).fromNow() : '-'
    }
  }
}

// 空圖片filter
export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      // 目前圖片大小為 350X220 ，可再從網址中更動
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}