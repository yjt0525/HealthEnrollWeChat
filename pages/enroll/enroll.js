// pages/enroll/enroll.js
import date from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ShowEnrollForm:true,    //true
    MyPhone:"",
    MyName:"",
    MySex:"",
    SexList:["男","女"]
  },
  Modal:function(title,content){
    wx.showModal({
      title: title,
      content: content,
      showCancel: false
    })
  },
  ChangeName:function(e){
    this.setData({
      MyName:e.detail.value
    })
  },
  ChangePhone:function(e){
    this.setData({
      MyPhone:e.detail.value
    })
  },
  ChangeSex:function(e){
    this.setData({
      MySex:this.data.SexList[e.detail.value]
    })
  },
  SubmitEnroll:function(e){
    var me = this;
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    if(!this.data.MyName){
      this.Modal("报名失败","请输入姓名");
    }else if(!this.data.MyPhone){
      this.Modal("报名失败", "请输入联系方式");
    }else if(!reg.test(this.data.MyPhone)){
      this.Modal("报名失败", "联系方式不合法，请重新输入");
    }else if(!this.data.MySex){
      this.Modal("报名失败", "请选择性别");
    }else{
      wx.showLoading({
        title: '数据提交中...',
        mask:true
      })
      wx.request({
        url: "https://www.sadad.xyz/User/AddUser",
        method:"POST",
        data:{
          openid:this.data.MyOpenId,
          name:this.data.MyName,
          phone:this.data.MyPhone,
          sex:this.data.MySex,
          enrolltime: date.formatTime(new Date())
        },
        success:function(res){
          if(res.data.success){
            wx.hideLoading();
            wx.showToast({
              title: '报名成功',
              icon:"success",
              mask:true,
              duration:2000
            });
            me.setData({
              ShowEnrollForm:false
            });
          }
        }
      })
    }
  },
  ResetForm:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    wx.showLoading({
      title: '',
      mask: true
    });
    wx.login({
      success:function(e){
        wx.getUserInfo({
          success: function (res) {
            me.setData({
              UserInfo: res.userInfo
            });
          }
        });  
        wx.request({
          url: "https://www.sadad.xyz/User/GetUserOpenId",
          method:"GET",
          data:{
            code:e.code
          },
          success:function(res){
            me.setData({
              MyOpenId:res.data.data.openid
            });
            wx.request({
              url: "https://www.sadad.xyz/User/HasEnrolled",
              method:"GET",
              data:{
                openid: me.data.MyOpenId
              },
              success:function(a){
                if(a.data.enrolled){
                  me.setData({
                    ShowEnrollForm:false
                  });
                }
                wx.hideLoading();
              }
            })
          }
        })
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