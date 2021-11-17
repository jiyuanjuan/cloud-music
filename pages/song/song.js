import request from "../../service/request"

let playControl = wx.createInnerAudioContext()
let appSong = getApp()
Page({
    data: {
        isPlay: false,
        songName: '',
        songPic: '',
        songId: '',
        songIdx: ''
    },

    onLoad: async function (options) {
        let ids = options ? options.musicId : ''
        let idx = options ? options.musicIdx : ''
        let result = await request('/song/detail', {
            ids
        })
        let songUrl = await request('/song/url', {
            id: ids
        })
        this.setData({
            songId: ids,
            songIdx: idx,
            songName: result.songs[0].name,
            songPic: result.songs[0].al.picUrl
        })
        playControl.src = songUrl.data[0].url
    },
    play() {
        this.setData({
            isPlay: !this.data.isPlay
        })
        this.data.isPlay ? playControl.play() : playControl.pause()
    },

    // 上一曲和下一曲
    async switchSong(e) {
        let type = e.currentTarget.id
        if (type === 'pre' && this.data.songIdx > 0) {
            let idx = this.data.songIdx - 1
            let preId = appSong.globalData.songDayList[idx]
            let result = await request('/song/detail', {
                ids: preId
            })
            let songUrl = await request('/song/url', {
                id: preId
            })
            if (idx === 0) {
                wx.showToast({
                    title: '已经是第一首歌了',
                })
            }
            this.setData({
                isPlay: false,
                songId: preId,
                songIdx: idx,
                songName: result.songs[0].name,
                songPic: result.songs[0].al.picUrl
            })
            playControl.src = songUrl.data[0].url
        } else {
            let type = e.currentTarget.id
            if (type === 'next' && this.data.songIdx < 20) {
                let idx = this.data.songIdx - 0 + 1
                let nextId = appSong.globalData.songDayList[idx]
                let result = await request('/song/detail', {
                    ids: nextId
                })
                let songUrl = await request('/song/url', {
                    id: nextId
                })
                if (idx === 19) {
                    wx.showToast({
                        title: '已经是最后一首歌了',
                    })
                }
                this.setData({
                    isPlay: false,
                    songId: nextId,
                    songIdx: idx,
                    songName: result.songs[0].name,
                    songPic: result.songs[0].al.picUrl
                })
                playControl.src = songUrl.data[0].url
            } 
        }
    },
    onUnload: function () {
        playControl.stop()
    },
})