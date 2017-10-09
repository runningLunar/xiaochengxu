//index.js
//获取应用实例
const app = getApp();
var data = require("../../utils/util.js");
Page({
  data: {
    showSide:true
   }, 
  onLoad: function (options) {
     var keyword=app.globalData.keyword;
     //获取登录和注册用户的数据
     var that=this;
      data.getMember(function(data){
         that.setData({
            member:data
         })
      }, keyword)
  },
  move:function(){
    let showSide = this.data.showSide;
    this.setData({
      showSide:!showSide
    })
  },
  toMessage_02:function(){
    wx.navigateTo({
      url: 'message_02/message'
    })
  },
  toChat_02:function(){
    wx.navigateTo({
      url: 'chat_02/chat',
    })
  },
  toAccount_02:function(){
    wx.navigateTo({
      url: 'account_02/account',
    })
  },
  toInfoManage_02:function(){
    wx.navigateTo({
      url: 'info-manage_02/info',
    })
  },
  toBusiness_02:function(){
    wx.navigateTo({
      url: 'business_02/business',
    })
  },
  toSet_02:function(){
    wx.navigateTo({
      url: 'set_02/set',
    })
  },
  toData_02:function(){
    wx.navigateTo({
      url: 'data_02/data',
    })
  },
  loginOut:function(){
    wx.navigateTo({
      url: 'login_01/login',
    })
  }
})
