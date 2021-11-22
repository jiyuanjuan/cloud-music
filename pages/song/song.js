import request from "../../service/request"
import momemt from "moment"

let playControl = wx.createInnerAudioContext()
let appSong = getApp()

Page({
    data: {
        isPlay: false,
        songName: '',
        songPic: '',
        songId: '',
        songIdx: '',
        playTime: '',
        durationTime: '',
        currentW:0
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
        playControl.src = songUrl.data[0].url
        this.setData({
            songId: ids,
            songIdx: idx,
            songName: result.songs[0].name,
            songPic: result.songs[0].al.picUrl,
        })
        playControl.onCanplay(() => {
            this.setData({
                // 不应该用duration，应该直接在返回的数据取出歌曲时长
                playTime: momemt(playControl.currentTime * 1000).format('mm:ss'),
                durationTime: momemt(playControl.duration * 1000).format('mm:ss')
            })
        })
        playControl.onTimeUpdate(() => {
            this.setData({
                playTime: momemt(playControl.currentTime * 1000).format('mm:ss'),
                durationTime: momemt(playControl.duration * 1000).format('mm:ss'),
                currentW:(playControl.currentTime/playControl.duration)*100+'%'
            })
        })
        playControl.onEnded(()=>{
            this.setData({
                isPlay:false
            })
        })
    },
    play() {
        this.setData({
            isPlay: !this.data.isPlay
        })
        this.data.isPlay ? playControl.play() : playControl.pause()
    },
    async switchPreOrNext(num) {
        this.setData({
            playTime: momemt(playControl.currentTime * 1000).format('mm:ss'),
            durationTime: momemt(playControl.duration * 1000).format('mm:ss')
        })
        let idx = this.data.songIdx - num
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
    },
    // 上一曲和下一曲
    switchSong(e) {
        playControl.stop()
        let type = e.currentTarget.id
        if (type === 'pre' && this.data.songIdx > 0) {
            this.switchPreOrNext(1)
        } else {
            let type = e.currentTarget.id
            if (type === 'next' && this.data.songIdx < 20) {
                this.switchPreOrNext(-1)
            }
        }
    },
    onUnload: function () {
        playControl.stop()
    },
})