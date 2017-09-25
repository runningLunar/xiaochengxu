//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showSide:true
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
