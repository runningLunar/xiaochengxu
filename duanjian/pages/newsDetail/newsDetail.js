// newsDetail.js
var util = require('../../utils/util.js');
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsid: 1,
    catid: 3,
    toTopStatus: false,
    title:'T9材质_T9化学成分和机械性能',
    sourse:'锻件网',
    time:'2017-9-19 19:30',
    watched:1034,
    content:``,
    other:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var that = this;
    wx.getSystemInfo({
      success: function (res) {
          that.setData({
             screenWidth: res.screenWidth,
             screenHeight: res.screenHeight
          });
       }
    });
    if(options.newsid){

      that.setData({
        newsid:options.newsid
      })

      that.detailRequest();
    }else{
      that.detailRequest();
    }

    // 时间格式转化函数
    Date.prototype.Format = function(fmt){  
      var o = {  
           "M+": this.getMonth()+1,  
           "d+": this.getDate(),  
           "H+": this.getHours(),  
           "m+": this.getMinutes(),  
           "s+": this.getSeconds(),  
           "S+": this.getMilliseconds()  
      };   

      if(/(y+)/.test(fmt)){  
    
          fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));  
      }  
      for(var k in o){  
          if (new RegExp("(" + k +")").test(fmt)){  
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));  
          }  
      }     
      return fmt;  
    }   

    // 通过util的方法发送请求
    
    console.log(this.data.catid)
    
    wx.setNavigationBarTitle({
      title: '咨询详情'
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onPageScroll: function(ev){
    var st = ev.scrollTop;
    if(st == 0){
      this.setData({
        toTopStatus: false
      })
    }else{
      this.setData({
        toTopStatus: true
      })
    }
  },
  toTop: function(){
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },

  //跳转到其他新闻
  toOther: function(eve){
    var newsid = eve.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: 'newsDetail?newsid='+newsid
    })
  },
  // 封装起请求函数
  detailRequest: function(){
    var that = this;
    util.newsDetail(that.data.newsid,function(data){
      var time = new Date(data[0].addtime*1000);
      console.log(data[0])

      that.setData({
        title: data[0].title,
        content:data[0].content,
        watched:data[0].hits,
        catid:data[0].catid,
        time:time.Format("yyyy-MM-dd HH:mm:ss")
      })
      WxParse.wxParse('content', 'html', that.data.content, that, 20);
      // 通过util获取更多列表
      util.moreNews(that.data.catid,function(data){
        that.setData({
          other: data
        })
      })
    })
  },
  //时间戳转化为时间字符串
  timetrans: function(date){
    var date = new Date(date*1000);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
  }
})