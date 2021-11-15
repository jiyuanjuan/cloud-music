import request from "../../service/request"

Page({
    data: {
        defaultSearchKey: '',
        searchValue: '',
        sValue: '',
        hotKeys: [],
        isShowInfo: false,
        timer: ''
    },

    onLoad: async function (options) {
        let result = await request("/search/default")
        let resultDetail = await request("/search/hot/detail")
        this.setData({
            defaultSearchKey: result.data.showKeyword,
            hotKeys: resultDetail.data,
        })
    },
    back() {
        wx.reLaunch({
            url: '/pages/video/video',
        })
    },
    bindinput(event) {
        if (this.data.timer) {
            clearTimeout(this.data.timer)
        }
        this.data.timer = setTimeout(async () => {
            let resultSearch = await request("/search", {
                keywords: event.detail.value,
                limit: 10
            })
            this.setData({
                isShowInfo: true,
                sValue: event.detail.value,
                searchValue: resultSearch.result.songs
            })
        }, 1000)

    },
    bindblur() {
        this.setData({
            isShowInfo: false
        })
    }
})