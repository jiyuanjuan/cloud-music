import request from "../../service/request"

Page({
    data: {
        isPlay: false,
        songName:'',
        songPic:''
    },

    onLoad: async function (options) {
        let ids = options ? options.musicId:''
        let result = await request('/song/detail', {
            ids
        })
        this.setData({
            songName:result.songs[0].name,
            songPic:result.songs[0].al.picUrl
        })
        console.log(result.songs[0])
    },
    play() {
        this.setData({
            isPlay: !this.data.isPlay
        })
    }
})