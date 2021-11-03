import request from "../../service/request"

Page({
  data: {
    bannerData: [],
    personalizedData: [],
    topListData: [],
    recommendData: {
      '每日推荐': 'icon-tuijian',
      '音乐': 'icon-yinle',
      '排行榜': 'icon-paixingbang',
      '电台': 'icon-diantai',
      '直播': 'icon-zhibo'
    }
  },
  onLoad: async function () {
    let index = 0
    let banner = await request('/banner')
    let personalized = await request('/personalized', {
      limit: 20
    })
    this.setData({
      bannerData: banner.banners,
      personalizedData: personalized.result,
    })
    while(index < 6){
      let toplist = await request(`/top/list?idx=${index}`)
      this.setData({
        topListData: toplist.playlist.name
      })
      index++
    }
    console.log(this.data.topListData)
  }

})