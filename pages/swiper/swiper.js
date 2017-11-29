// pages/swiper/swiper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgUrls: [
    //   'https://www.sadad.xyz/img/shop/1.jpg',
    //   'https://www.sadad.xyz/img/shop/2.jpg',
    //   'https://www.sadad.xyz/img/shop/3.jpg',
    //   'https://www.sadad.xyz/img/shop/4.jpg',
    //   'https://www.sadad.xyz/img/shop/5.jpg',
    //   'https://www.sadad.xyz/img/shop/qrcode.jpg'
    // ],
    indicatorDots: true,
    autoplay: false  ,
    // interval: 5000,
    // duration: 1000,
    curIndex:0
  },
  ChangeIndex:function(e){
    this.setData({
      curIndex:e.detail.current
    })
  },
  ReturnIndex:function(){
    console.log(123);
    wx.redirectTo({
      url: '../index/index',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    var temp = parseInt(options.index)
    console.log(temp);
    this.setData({
      curIndex:temp
    });
    wx.showLoading({
      title: '',
      mask:true
    })
    wx.request({
      url: "https://www.sadad.xyz/User/GetShopInfo",
      method: "GET",
      success: function (res) {
        me.setData({
          ShopInfo: res.data.info,
          imgUrls: res.data.shopimg
        })
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})