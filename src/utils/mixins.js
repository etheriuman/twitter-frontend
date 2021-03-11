import moment from 'moment'

// moment 時距計算filter
export const fromNowFilter = {
  filters: {
    fromNow(dateTime) {
      return dateTime? moment(dateTime).locale('zh-tw').fromNow() : '-'
    }
  }
}

// moment 輸出中文時間
export const momentFilter = {
  filters: {
    date(dateTime) {
      return dateTime? moment(dateTime).locale('zh-tw').format('ll') : '-'
    },
    time(dateTime) {
      return dateTime? moment(dateTime).locale('zh-tw').format('LT') : '-'
    }
  }
}

// 空圖片filter
export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      // 目前圖片大小為 350X220 ，可再從網址中更動
      return src || 'https://via.placeholder.com/400x200/DFDFDF?text=No+Image'
    }
  }
}