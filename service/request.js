import config from "./config"

export default (url, data = '', method = 'GET', isLogin) => {
    return new Promise((resolve, rejects) => {
        wx.request({
            url: config.host + url,
            method,
            data,
            header: {
                cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''
            },
            success(res) {
                isLogin && wx.setStorageSync('cookies', res.cookies)
                resolve(res.data ? res.data : res)
            },
            fail() {
                rejects('失败')
            }
        })
    })
}