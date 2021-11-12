import request from "../../service/request"

Page({
    data: {
        defaultSearchKey: '',
        searchValue: '',
        hotKeys: [],
        searchKey: [],
        isShowInfo: false,
        timer: 0
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
    async bindinput(event) {
        this.data.timer++;
        setTimeout(() => {
            this.setData({
                timer: 0
            })
        }, 500)
        if (this.data.timer === 0) {
            let resultSearch = await request("/search", {
                keywords: "day",
                limit: 10
            })
            console.log(resultSearch)
            this.setData({
                isShowInfo: true,
                searchKey: resultSearch.result.song,
                searchValue: event.detail.value
            })
        }
    },
    bindblur() {
        this.setData({
            isShowInfo: false
        })
    }
})