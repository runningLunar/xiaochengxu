const app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  data: {

  },
  onLoad: function (options) {
     console.log(options);
     var id = options.id;
     this.init(id);
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  init:function(id){
     var that=this;
     var content = app.globalData.message[id].content;
     WxParse.wxParse('content', 'html', content, that, 5)
     var time = new Date(app.globalData.message[id].addtime * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ') ;   

     var title = app.globalData.message[id].title;
     this.setData({
        time:time,
        title: title
     })
  }
})

