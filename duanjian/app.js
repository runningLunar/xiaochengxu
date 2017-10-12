//app.js
var data = require("utils/util.js");
App({
  onLaunch: function() {

  },
  //获取市
  getCity: function (parentid,arrchildid) {
    var that = this;
    that.globalData.aid=parentid,
      that.globalData.area = that.globalData.provence[parentid].areaname;
    if (typeof (this.globalData.cityArray[parentid]) == 'undefined') {
      data.getCity(function (data) {
        that.globalData.cityArray[parentid] = data;
        that.globalData.city = that.globalData.cityArray[parentid];
      }, arrchildid)
    } else {
      this.globalData.city = this.globalData.cityArray[parentid];
    
    }
  },
  //获取省
  getAddress: function (parentid) {
    var that = this;
    data.getProvence(function (data) {
      that.globalData.provence= data
    }, parentid)
  },
 
  globalData: {
    cityArray: [],//市区数组
    keyword:'',//登录注册后获取用户数据关键字
    member:'',//保存会员用户数据
    content_data:'',//资讯的详细内容
  }
})
