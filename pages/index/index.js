//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ContactPhone:"15061950110"
    // ImgList:[
    //   "https://www.sadad.xyz/img/shop/1.jpg",
    //   "https://www.sadad.xyz/img/shop/2.jpg",
    //   "https://www.sadad.xyz/img/shop/3.jpg",
    //   "https://www.sadad.xyz/img/shop/4.jpg",
    //   "https://www.sadad.xyz/img/shop/5.jpg",
    //   "https://www.sadad.xyz/img/shop/qrcode.jpg"      
    // ]
  },
  MakePhoneCall:function(){
    var me = this;
    wx.makePhoneCall({
      phoneNumber: me.data.ShopInfo.shopcontact
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  GetUser:function(){
    wx.getUserInfo({
      success:function(res){
        console.log(res);
      }
    })
  },
  JumpToSwiper:function(e){
    wx.navigateTo({
      url: '../swiper/swiper?index='+e.currentTarget.dataset.index ,
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '',
      mask:true
    })
    var me = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: "https://www.sadad.xyz/User/GetShopInfo",
      method:"GET",
      success:function(res){
        me.setData({
          ShopInfo:res.data.info,
          ImgList:res.data.shopimg
        })
        wx.hideLoading();        
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
