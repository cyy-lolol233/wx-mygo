const swiper = require('../../api/swiper');

// pages/index/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
     swiperList:[], 
      current:0,
      isLogin:false
  },

   onSwiperChange(e){
     const{current} = e.detail
     this.setData({
         current
      })
   },

   onSwiperTab(e){
      const {item} = e.currentTarget.dataset
      item.type ==='url'
      ? wx.navigateTo({
        url: `/pages/web-view/index?url=${item.target}`,
      }) : wx.navigateTo({
        url: `/pages/product/detail?id=${item.target}`,
      })
   },
   gotoLogin(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
   swiper.list().then(res=>{
     this.setData({
       swiperList:res.data
     })
   })
  },

onShow(){
  this.loadMemberInfo();
},
  
  loadMemberInfo(){
    if(wx.getStorageSync('nickname')){
      this.setData({
        isLogin: true
      })
    }
  },
})