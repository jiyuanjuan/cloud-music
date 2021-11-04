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
    let banner = await request('/banner')
    let personalized = await request('/personalized', {
      limit: 20
    })
    this.setData({
      bannerData: banner.banners,
      personalizedData: personalized.result,
    })

    let index = 0
    let resultTopData = []
    while (index < 6) {
      let topList = await request('/top/list?',{
        idx:index++
      })
      let topData = {}
      topData.name = topList.playlist.name
      topData.tracks = topList.playlist.tracks.slice(0, 5)
      resultTopData.push(topData)
      this.setData({
        topListData:resultTopData 
      })
    }
    // console.log(this.data.topListData)
  }
})