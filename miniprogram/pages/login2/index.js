// pages/login2/index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const { create,me} = require('../../api/user')
import { userBehavior } from "../../behaviors/user-behavior";




Page({
  behaviors:[userBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,
    nickname:null
  },
 
  onChooseAvatar(e) {
    console.log(e)
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
    wx.setStorageSync('avatarUrl',avatarUrl )
  },
  getName(e){
    console.log(e)
    const nickname = e.detail.value
    console.log(nickname)
   this.setData({
     nickname:nickname,
   })
  // 将 nickname 存储到本地存储中
  },

  formSubmit(e) {
     console.log(e)
    const { nickname } = this.data;
    if (nickname) {
      try {
         create({ nickname }).then(response=>{
            me().then(results=>{
             wx.setStorageSync('user', results.data[results.data.length-1])
              this.updateNickName(nickname)
              this.updateLocation(wx.getStorageSync('location'))
            wx.reLaunch({
              url: '/pages/index/index',
            })
         
           })
         });
      
      } catch (error) {
        console.error('Failed to create user:', error);
        wx.showToast({
          title: '提交失败，请重试',
          icon: 'none'
        });
      }
    } else {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none'
      });
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})