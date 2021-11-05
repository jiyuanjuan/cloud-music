let startY = 0;
let endY = 0;
let moveDistance = 0;

Page({
    data: {
        distance: '',
        userInfo:''
    },
    onLoad: function (options) {
        wx.getStorage({
            key: 'token',
            success: (res) => {
                this.setData({ 
                    userInfo: {
                        id: res.data.account.id,
                        avatar: res.data.profile.avatarUrl
                    }
                })
            }
        })
    },
    handleTouchStart(event) {
        startY = event.touches[0].clientY
    },
    handleTouchMove(event) {
        endY = event.touches[0].clientY
        moveDistance = endY - startY
        if (moveDistance > 0 && moveDistance < 100) {
            this.setData({
                distance: moveDistance + 'rpx'
            })
        }
    },
    handleTouchEnd(event) {
        moveDistance = '0rpx'
        this.setData({
            distance: moveDistance + 'rpx'
        })
    },
    login() {
        if (!this.data.userInfo) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
        }
    },
    signOut() {
        wx.clearStorage({
          success: () => {
              wx.showToast({
                title: '退出成功',
              })
          },
          fail:() =>{
              wx.showToast({
                title: '退出失败，请联系管理员',
              })
          }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})