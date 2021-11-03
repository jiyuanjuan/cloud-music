import config from "./config"

export default (url, data = '', method = 'GET') => {
    return new Promise((resolve, rejects) => {
        wx.request({
            url: config.host + url,
            method,
            data,
            success(res) {
                resolve(res.data ? res.data : res)
            },
            fail() {
                rejects('失败')
            }
        })
    })
}