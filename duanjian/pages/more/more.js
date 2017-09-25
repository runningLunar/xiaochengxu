// pages/more/more.js
var data = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixed:false,//控制是否固定定位 
    background:false//控制背景显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取省
    var parentid = 0;
    this.getAddress(parentid);

    //获取市
    parentid++;
    this.setData({ aid: parentid });
    var that = this;
    data.getProvence(function (data) {
      that.setData({
        city: data.result,
      })
    }, parentid)
    
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

  onPageScroll:function(ev){
    if (ev.scrollTop>0){
   this.setData({
     fixed:true
   })
    }else{
      this.setData({
        fixed: false
      })
    }
  },
  show:function(){
    this.setData({
      background: true,
      show:true
    })
  },
  hiddden:function(){
    console.log(this.data.show);
    if(this.data.show){
      this.setData({
        background: false,
        show: false
      })
    }
  },

//获取市
getCity:function(ev){
  var parentid=ev.currentTarget.dataset.id
  this.aid = ev.currentTarget.dataset.id;
  this.setData({ aid: parentid});
  var that = this;
  data.getProvence(function (data) {
    that.setData({
      city: data.result,
    })
  }, parentid)
},
  //获取省
  getAddress: function (parentid){
    var that = this;
    data.getProvence(function (data) {
      that.setData({
        provence: data.result
      })
    }, parentid)
  }
})