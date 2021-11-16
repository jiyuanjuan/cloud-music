import request from "../../service/request"

Page({
    data: {
        day: '',
        month: '',
        list: []
    },

    onLoad: async function () {
        let result = await request('/recommend/songs')
        // console.log(result.recommend.slice(0, 20))
        this.setData({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            list: result.recommend.slice(0, 20)
        })
    },
    toSongDetail(event) {
        // console.log(event.currentTarget.dataset.ids)
        wx.navigateTo({
          url: `/pages/song/song?musicId=${event.currentTarget.dataset.ids}`,
        })
    }
})