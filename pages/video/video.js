import request from "../../service/request"

Page({
  data: {
    navList: [],
    currentNavId: '',
    video: [],
    isRefresher: '',
    isShowVideo: true,
    vIndex: '',
    scrollTop:''
  },

  onLoad: async function () {
    let dataList = await request('/video/group/list')
    let videoList = await request('/video/group', {
      id: dataList.data.splice(0, 10)[0].id
    })
    let navData = dataList.data.splice(0, 10)
    let videoDate = videoList.datas
    this.setData({
      navList: navData,
      currentNavId: navData[0].id,
      video: videoDate,
    })

  },
  searchBtn() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  async navActive(event) {
    let videoList = await request('/video/group', {
      id: event.currentTarget.dataset.id
    })
    let videoDate = videoList.datas
    this.setData({
      currentNavId: event.currentTarget.dataset.id,
      video: videoDate,
      vIndex:'',
      scrollTop:'0'
    })
  },
  async bindrefresherrefresh() {
    let videoList = await request('/video/group', {
      id: this.data.currentNavId
    })
    let videoDate = videoList.datas
    this.setData({
      video: videoDate,
      isRefresher: false
    })
  },
  showVideo(event) {
    this.setData({
      vIndex: event.currentTarget.dataset.index
    })
  },
  bindscrolltolower(){
    wx.showToast({
      title: '已经到最底部了！',
      mask:true
    })
  },
  // 转发消息，未完成
  onShareAppMessage: function () {
    return {
      title: '转发此视频',
      path: '',
    }
  }
})