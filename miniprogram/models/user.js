import { observable, action } from "mobx-miniprogram";

const userInStorage = wx.getStorageSync('user')
const locationInStorage = wx.getStorageSync('location')

export const user = observable({
  nickname: userInStorage ? userInStorage.nickname : null,
  location: locationInStorage ? locationInStorage : null,
  // get desensitiveMobile() {
  //   let mobile = this.phoneNumber
  //   if (mobile) {
  //     mobile = mobile.replace(/^(\d{3})\d{6}(\d{2})$/, "$1******$2")
  //   }
  //   return mobile
  // },
  get isLogin() {
    return Boolean(this.nickname)
  },
  updateNickName: action(function (nickname) {
    this.nickname = nickname;
  }),

  updateLocation: action(function (location) {  
      this.location = location
  })
});