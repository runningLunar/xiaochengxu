// pages/chat/chat.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.init();
  },

  init:function(){
     console.log(app.globalData.content_data);
     this.setData({
        regip: app.globalData.member.regip,
        title: app.globalData.content_data
     })
  }
})