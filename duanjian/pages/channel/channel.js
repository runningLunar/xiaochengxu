var util = require("../../utils/util.js");
var app=getApp();
Page({
  data:{
    channelList: ["锻件供应", "锻件采购", "锻造厂家", "锻造圈", "锻件展会", "锻件资讯","锻件知识"],
  },
  openChannelDetailed:function(ev){
      var id=ev.currentTarget.dataset.id;
      if(id==0){
         wx.navigateTo({
            url: '../gongyin/gongyin',
         })
      }else if(id==1){
         wx.navigateTo({
            url: '../buy/buy',
         })
      }else if(id===2){
         wx.navigateTo({
            url: '../factory/factory',
         })
      }else if(id==3){
         wx.navigateTo({
            url: '../club/club',
         })
      }else if(id==4){
         wx.navigateTo({
            url: '../exhibit/exhibit',
         })
      }else if(id==5){
         wx.navigateTo({
            url: '../zixun/zixun',
         }) 
      }else {
         wx.navigateTo({
            url: '../know/know',
         }) 
      }
  },
  redict:function(){
     wx.navigateTo({
        url: '../search/search',
     }) 
  }
})