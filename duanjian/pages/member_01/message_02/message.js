// pages/message/message.js
var data = require("../../../utils/message.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shadow: true
  },
  show_shadow:function(){
    let shadow = this.data.shadow;
    this.setData({
      shadow:!shadow
    })
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  detail:function(ev){
     var id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'msg-detail_03/detail?id='+id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getMessage();
  },
   getMessage:function(){
      var username = app.globalData.member.username;
      var that=this;
      data.getMessage(function(data){
      
         var arr = [];
         for (var i = 0; i < data.length; i++) {
            arr.push({ title: data[i].title, fromuser: data[i].fromuser,  addtime: new Date(data[i].addtime * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ') })
            that.setData({
               message: arr
            });
         }
         app.globalData.message=data;
      },'kerris')
   }
})