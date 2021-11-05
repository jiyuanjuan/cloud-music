import request from "../../service/request"

Page({
    data: {
        phone: '',
        pwd: ''
    },
    onLoad: function (options) {

    },
    handleLogin(event) {
        let type = event.target.id
        this.setData({
            [type]: event.detail.value
        })
    },
    async loginButton() {
        if (!this.data.phone || !this.data.pwd) {
            wx.showToast({
                title: '手机号/密码不能为空',
                icon: 'none'
            })
            return
        } else {
            let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (!phoneReg.test(this.data.phone)) {
                wx.showToast({
                    title: '手机号格式不正确',
                    icon: 'none'
                })
                return
            }
            let result = await request('/login/cellphone', {
                phone: this.data.phone,
                password: this.data.pwd
            })
            if (result.token) {
                wx.setStorageSync('token', result)
                wx.showToast({
                    title: '登录成功',
                })
                wx.reLaunch({
                    url: '/pages/profile/profile',
                })
            }else{
                wx.showToast({
                  title: '密码不正确',
                  icon:'none'
                })
                return
            }
        }

    },
})