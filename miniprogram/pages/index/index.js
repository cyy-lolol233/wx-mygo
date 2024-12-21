const swiper = require('../../api/swiper');
import { userBehavior } from "../../behaviors/user-behavior";
const storeApi = require('../../api/store');

// pages/index/index.ts
Page({
  behaviors: [ userBehavior ],
  /**
   * 页面的初始数据
   */
  data: {
     swiperList:[], 
      current:0,
      nearbyStore:null
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
   this.fetchStoreList()
   swiper.list().then(res=>{
     this.setData({
       swiperList:res.data
     })
   })
  },
  onMenuCardClick() {
    wx.switchTab({
      url: '/pages/store/index',
    })
  },
  onArticleClick() {
    wx.navigateTo({
      url: '/pages/web-view/index?url=https://baidu.com',
    })
  },
  fetchStoreList(){
    storeApi.list().then(res=>{
      const storeList =this.makeStoreList(res.data)
      console.log(storeList)
      this.setData({
        nearbyStore:storeList[0]
      })

    })
  },
  makeStoreList(data) {
    const { latitude, longitude } = this.data.user.location;
    const R = 6371; // 地球半径，单位为公里
    function haversine(lat1, lon1, lat2, lon2) {
      const toRad = (x) => x * Math.PI / 180;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    if (!Array.isArray(data)) {
      console.error('Invalid data format: data is not an array');
      return [];
    }

    let storeList = data.map(store => {
      console.log(store)
      const { latitude: storeLat, longitude: storeLon } = store;
      const distance = haversine(latitude, longitude, storeLat, storeLon).toFixed(1);
      return {
        ...store,
        distance
      };
    });

    storeList.sort((a, b) => a.distance - b.distance);

    return storeList;
  },


onShow(){
},
  
})