// pages/me/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isLogin:false,
     userinfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  onShow(){
   this.loadMemberInfo()
  },
  gotoCustomPage(e) {
    console.log(e)
    const {code} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/gage/index?code=${code}`,
    })
  },
  login(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  loadMemberInfo(){
    if(wx.getStorageSync('user')){
      this.setData({
        isLogin: true,
        userinfo:wx.getStorageSync('user')
      })
    }
  }
})
