// app.ts
// import userApi from './api/user'
import {userBehavior} from './behaviors/user-behavior'
App({
  behaviors:[],
  globalData: {
  },
  // getNikeName(){
  //  return wx.getStorageSync('nickname')
  // },
  // getAvatarUrl(){
  //  return wx.getStorageSync('avatarUel')
  // },
  onLaunch() {
    wx.cloud.init();
    this.getLocationByIP()
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
  getLocationByIP() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://ipapi.co/json/', // 使用 IP 定位服务的 API
        method: 'GET',
        success: (response) => {
          if (response.statusCode === 200) {
            const { latitude, longitude } = response.data;
            const location = { latitude, longitude };
            wx.setStorageSync('location', location); // 将 location 存储到本地存储中
            // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            resolve(location);
          } else {
            console.error('Failed to get location by IP');
            reject(new Error('Failed to get location by IP'));
          }
        },
        fail: (error) => {
          console.error('Request failed', error);
          reject(error);
        }
      });
    });
  }
  // isLogin() {
  //   return Boolean(wx.getStorageSync('user'))
  // },
  // checkUser () {
  //   wx.showLoading({
  //     title: '正在检查登录',
  //   })
  //   userApi.me().then(res=>{
  //       if(res.data.length) {
  //         wx.setStorageSync('user', res.data[0])
  //         wx.reLaunch({
  //           url: '/pages/index/index',
  //         })
  //       }
  //       wx.hideLoading()
  //   })
  // }
})