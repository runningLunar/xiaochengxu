var util = require("../../utils/util.js");
var app=getApp();
Page({
  data:{
    channelList: ["锻件供应", "锻件采购", "锻造厂家", "锻造圈", "锻件展会", "锻件资讯","锻件知识"],
    state:true,
  },
  openList: function(){
      var state=this.data.state;
      if (state==true){
        this.setData({
          state:false
        })
      }else{
        this.setData({
          state:true
        })
      }
  },
  closeList: function(){
    var state = this.data.state;
    this.setData({
     state:true
    })
  }
})