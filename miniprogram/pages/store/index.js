// pages/store/index.js
const storeApi = require('../../api/store');
const computedBehavior = require('miniprogram-computed').behavior
import { userBehavior } from '../../behaviors/user-behavior'

Page({
  behaviors: [userBehavior,computedBehavior],

  computed: {
    markers(data) {
      return data.storeList.map((item, index)=>{
        return {
          id: index + 1,
          key: item._id,
          title: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
          iconPath: '../../assets/images/logo_mark.png',
          width: '60rpx', height: '60rpx'
        }
      })
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    storeList: [],
    dict: {
      'OPENING': '营业中',
      'CLOSED': '已关闭'
    },
    collapse: false,
    storeDetailShow: false
    },

    async getLocationByIP() {
      try {
        const res = await new Promise((resolve, reject) => {
          wx.request({
            url: 'https://ipapi.co/json/', // 使用 IP 定位服务的 API
            method: 'GET',
            success: (response) => resolve(response),
            fail: (error) => reject(error)
          });
        });
  
        if (res.statusCode === 200) {
          const { latitude, longitude } = res.data;
          this.setData({
            latitude,
            longitude
          });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        } else {
          console.error('Failed to get location by IP');
          throw new Error('Failed to get location by IP');
        }
      } catch (err) {
        console.error('Request failed', err);
        throw err;
      }
    },

    call(e) {
      const { phone } = e.currentTarget.dataset
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    },

  colsapse() {
    this.setData({
      collapse: !this.data.collapse
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getLocationByIP()
    this.initMapContext()
    this.fetchStoreList()
  },

  initMapContext(){
    wx.createSelectorQuery().select('#store-map').context((res)=>{
      this.mapContext = res.context // 节点对应的 Context 对象。如：选中的节点是 <video> 组件，那么此处即返回 VideoContext 对象
      }).exec()
  },

  fetchStoreList(){
    storeApi.list().then(res=>{
      const storeList =this.makeStoreList(res.data)
      console.log(res.data)
      wx.setStorageSync('nearbyStore', res.data[0])
      this.setData({
        storeList
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
  goToCurrentLocation(){
    this.mapContext.moveToLocation()
  },
  onMarkerTab(e) {
    const { markerId } = e.detail
    const store = this.data.storeList[markerId-1]
    this.setData({
      storeDetailShow: true,
    })
    this.setCurrentStore(store)
  },
  popupStoreDetail(e) {
    // console.log(e)
    const { store } = e.currentTarget.dataset
    this.setData({
      storeDetailShow: true,
    })
    this.setCurrentStore(store)
  },
  goToMenu() {
    wx.navigateTo({
      url: '/pages/menu/index'
    })
  }

})