var WxParse = require('../wxParse/wxParse.js');
var data = require("../../utils/util.js");
const app = getApp();
/**
 * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
 */

Page({
   data: {
      showRtn: true,
      scrollTop: 0,
   },
   onLoad: function () {
      this.init();

   },

   init: function () {

      //获取具体数据
      var keyword = app.globalData.keyword;
      //获取登录和注册用户的数据
      data.getMember(function (data) {
         app.globalData.member = data;
      }, keyword)

      var that = this;
      var edittime = new Date(app.globalData.content_data.addtime)
      var content = app.globalData.content_data.content;
      WxParse.wxParse('content', 'html', content, that, 5)
      this.setData({
         gddata: app.globalData.content_data,
         etime: edittime.toLocaleDateString().replace(/\//g, "-") + " " + edittime.toTimeString().substr(0, 8)
      });

      //获取同类数据
      data.moreBuy(function (data) {
         that.setData({
            category: data
         })
      }, app.globalData.content_data.catid)


      //获取一级分类·
      data.getCategory(function (data) {
         that.setData({
            catname: data
         })
      }, app.globalData.content_data.parentid)
   },
   goTop: function (e) {
      this.setData({
         scrollTop: 0
      })
   },
   scroll: function (e) {
      if (e.detail.scrollTop > 200) {
         this.setData({
            floorstatus: false
         });
      } else {
         this.setData({
            floorstatus: true
         });
      }
   },
   navict_detail: function (ev) {
      var index = ev.currentTarget.dataset.id;
      app.globalData.content_data = this.data.category[index];
      wx.navigateTo({
         url: '../caigoudetail/caigoudetail',
      })
   },
   chat: function () {
      console.log(app.globalData.member);
      if (!app.globalData.member) {
         wx.showModal({
            title: '登录确定',
            content: '您还未登录，是否立即登录',
            success: function (res) {
               if (res.confirm) {
                  wx.navigateTo({
                     url: '../login/login',
                  })
               } else if (res.cancel) {

               }
            }
         })
      } else {
         wx.navigateTo({
            url: '../chat/chat',

         })
      }
   }

})