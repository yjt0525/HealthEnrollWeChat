// pages/Test/Test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  GetOpenId:function(){
    var me = this;
    wx.login({
      success:function(res){
        var code = res.code;
        wx.request({
          url: "https://www.sadad.xyz/User/GetUserOpenId",
          method:"GET",
          data:{
            code:code
          },
          success:function(opt){
            me.setData({
              OPENID:opt.data.data.openid
            })
          }
        })
      }
    })
  },

  UserEnroll:function(){
    console.log(this.data);
    var me = this;
    wx.request({
      url: "https://www.sadad.xyz/User/AddUser",
      method:"POST",
      data:{
        openid:me.data.OPENID,
        name:"应佳涛",
        phone:"15061950110",
        enrolltime:"2017-10-20"
      },
      success:function(res){
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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