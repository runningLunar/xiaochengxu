// pages/more/more.js
var data = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{
      show: false,
      city:'',
      provence: '',
      areaTitle: '所在地区',
      cateTitle: '全部分类',
    },
    current_page: 1,   //当前页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取资讯
    var page=1;
    this.getZixun(page);
  },
  
  //获取资讯
  getZixun:function(page){
    var that=this;
    data.getZixun(function(data){
        that.setData({
          zixun:data.data,
          last_page:data.last_page
        })
    }, page)
  },
  //上一页
  prevPage:function(){
    var page = this.data.current_page;
    if(page==1){
      page=1;
    }else{
      page--;
      }
   this.setData({
     current_page:page
   })
   this.getZixun(page);
  },
  //下一页

  nextPage: function () {
    var page = this.data.current_page;
    console.log(page);
    if (page == this.data.last_page) {
      page = this.data.last_page
    }else{
      page++;
    }
    this.setData({
      current_page: page
    })
    this.getZixun(page);
  },

  //首页
  firstPage:function(){
    var page=1;
    this.setData({
      current_page: page
    })
    this.getZixun(page);
  },
  //隐藏
  hiddden: function () {
    app.hiddden();
    if(!app.globalData.cateTitle){
      app.globalData.cateTitle='全部分类';
    }
    if (this.data.item.show) {
      this.setData({
        item: {
          show: app.globalData.show,
          background: app.globalData.background,
          areaTitle: '所在地区',
          cateTitle: app.globalData.cateTitle ,
        },
      })
    }
  },

  orderTap:function(ev){
    var activeId = ev.currentTarget.dataset.id;//控制显示哪个选项卡
    app.show(activeId);
    this.getItem();
  },
  //排序方式()
  orderContent: function () {
    this.hiddden();
  },
  //显示
  show: function (ev) {
    var activeId= ev.currentTarget.dataset.id;//控制显示哪个选项卡
    app.show(activeId);
   this. getItem();
  },
  //或得城市
  getCity:function(ev){
    var parentid = ev.currentTarget.dataset.id
    app.getCity(parentid);
    this.getItem();
  },
  changeCate:function(ev){
    var id = ev.currentTarget.dataset.index;
    this.setData({
      item: {
        show: app.globalData.show,
        activeId: 1,
        cate: app.globalData.cate,
        areaTitle: app.globalData.areaTitle,
        background: app.globalData.background,
        cateContent: app.globalData.cateContent[id],
        cateId:id,
        cateTitle: '全部分类',
      }
    });
  },
  cateTitle:function(){
    var cateTitle = app.globalData.cate[this.data.item.cateId];
      this.setData({
        item: {
          show: app.globalData.show,
          activeId: 1,
          cate: app.globalData.cate,
          areaTitle: app.globalData.areaTitle,
          background: app.globalData.background,
          cateTitle: cateTitle
        }
      })
      app.cateTitle(cateTitle);  
      this.hiddden();
  },
  //改变地区
  changArea:function(){
    app.changArea();
    this.getItem();
  },
  cateShow:function(){
    app.cateShow();
    this.setData({
      item:{
        show: app.globalData.show,
        activeId:1,
        cate: app.globalData.cate,
        areaTitle: app.globalData.areaTitle,
        background: app.globalData.background,
        cateContent: app.globalData.cateContent[0],
        cateTitle: '全部分类',
      }
    })
  },
   getItem:function(){
     this.setData({
       item: {
         show: app.globalData.show,
         background: app.globalData.background,
         city: app.globalData.city,
         provence: app.globalData.provence,
         aid: app.globalData.aid - 1,
         areaTitle: app.globalData.areaTitle,
         active:app.globalData.active,
         areaShow:app.globalData.areaShow,
         activeId: app.globalData.activeId,
         cateTitle: '全部分类',
       },
     })
  },
  //尾页
  lastPage:function(){
    var page = this.data.last_page;
    this.setData({
      current_page: page
    })
    this.getZixun(page);
  }
})