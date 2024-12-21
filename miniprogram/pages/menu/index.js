// pages/menu/index.ts
import swiperApi from '../../api/swiper'
import { userBehavior } from '../../behaviors/user-behavior'
Page({
  behaviors: [userBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    headerStyle: '',
    swiperList: [],
    goodsList: [],
    currentCategoryIndex: 0,
    sidebarCurrent: 0,
    goodsDialogShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.makeHeaderStyle()
    this.fetchSwiperList()
  },
  fetchSwiperList() {
    swiperApi.list().then(res=>{
      this.setData({
        swiperList: res.data
        
      })
      console.log(this.data.swiperList)
    })
  },
  switchCurrentStore() {
    this.setCurrentStore(null)
    wx.navigateBack({
      delta: 0,
    })
  },
  makeHeaderStyle() {
    const { top, bottom, height } = wx.getMenuButtonBoundingClientRect()
    const menuButtonCenterPoint = top + height/2
    const headerStyle = 'margin-top: calc(' + menuButtonCenterPoint + 'px - 32rpx);'
    this.setData({
      headerStyle
    })
  },
  switchCurrentStore() {
    this.setCurrentStore(null)
    wx.navigateBack({
      delta: 0,
    })
  }
})