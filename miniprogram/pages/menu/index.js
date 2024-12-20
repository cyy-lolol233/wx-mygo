// pages/menu/index.ts
Page({

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

  },
  makeHeaderStyle() {
    const { top, bottom, height } = wx.getMenuButtonBoundingClientRect()
    const menuButtonCenterPoint = top + height/2
    const headerStyle = 'margin-top: calc(' + menuButtonCenterPoint + 'px - 32rpx);'
    this.setData({
      headerStyle
    })
  }
})