// pages/me/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
     nickname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  onShow(){
    const nickname = wx.getStorageSync('nickname')
    this.setData({
      nickname
    })
  },
  login(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  }
})
