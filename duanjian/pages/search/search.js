// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  show:false,//隐藏框是否显示
  active:false,//隐藏框text样式
  djCate:["锻件供应","锻件采购","锻件展会","锻件知识","锻件资讯","消息"]  ,
  cate:"锻件供应"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
//改变隐藏框显示状态
  cateShow:function(){
    this.setData({
      show:true
    })
  },
  //改变隐藏框text样式
  changeCate:function(ev){
    var id = ev.target.dataset.id
    this.setData({
      cate: this.data.djCate[ev.target.dataset.id],
      show: false,
    })
    
  },
  changeStyle:function(ev){
    this.setData({
      cateId: ev.target.dataset.id,
    })
  }
})