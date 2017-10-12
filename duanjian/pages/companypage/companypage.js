const app = getApp();
var WxParse = require('../wxParse/wxParse.js');
Page({
   data: {

   },
   onLoad: function (options) {
      this.init();

   },
   init:function(){
      var that=this;
      var content = app.globalData.content_data.content;
      WxParse.wxParse('content', 'html', content, that, 5)
      this.setData({
         data:app.globalData.content_data 
      })
   }
})