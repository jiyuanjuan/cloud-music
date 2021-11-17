import request from "../../service/request"
const app = getApp()
Page({
    data: {
        day: '',
        month: '',
        list: []
    },

    onLoad: async function () {  
        app.globalData.songDayList = []
        let result = await request('/recommend/songs')
        result.recommend.slice(0, 20).map(item=>{app.globalData.songDayList.push(item.id)})
        this.setData({
            day: new Date().getDate(), 
            month: new Date().getMonth() + 1,
            list: result.recommend.slice(0, 20)
        })
    },
    toSongDetail(event) {
        wx.navigateTo({
          url: `/pages/song/song?musicId=${event.currentTarget.dataset.ids}&musicIdx=${event.currentTarget.dataset.idxsong}`,
        })
    }
})