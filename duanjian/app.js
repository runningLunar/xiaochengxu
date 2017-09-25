//app.js
var data = require("utils/util.js");
App({
  onLaunch: function() {
    //获取省
    var parentid = 0;
    this.getAddress(parentid);
    this.globalData.area='北京';
    //获取市
    parentid++;
    this.globalData.aid=parentid;
    var that = this;
    data.getProvence(function (data) {
      that.globalData.cityArray.push(data);
      that.globalData.city = that.globalData.cityArray[0];
    }, parentid)
  },
  // onShow:function(){
  //   for (var i = 1; i < 34;i++){
  //     data.getProvence(function (data) {
  //       this.globalData.cityArray[i] = data;
  //     }, i)
  //   }
  // },
  show: function (activeId) {
    this.globalData.background= true,
    this.globalData.show=true,
    this.globalData.areaShow=true;
    this.globalData.activeId = activeId;
  },
  hiddden: function () {
    if (this.globalData.show) {
      this.globalData.background =false;
      this.globalData.show =false;
      this.globalData.areaShow = false;
      this.globalData.activeId = '';
    }
  },
  //获取分类的具体内容
  cateTitle: function (cateTitle){
      this.globalData.show = false;
      this.globalData.activeId = '';
      this.globalData.background = false;
      this.globalData.cateTitle = cateTitle;
    },
   
  //获取市
  getCity: function (parentid) {
    var that = this;
    that.globalData.aid=parentid,
      that.globalData.area = that.globalData.provence[parentid-1].areaname;
    console.log(that.globalData.provence[parentid]);
    if (typeof (this.globalData.cityArray[parentid]) == 'undefined') {
      data.getProvence(function (data) {
        that.globalData.cityArray[parentid] = data;
        that.globalData.city = that.globalData.cityArray[parentid];
      }, parentid)
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

  changArea: function () {
    this.globalData.areaTitle = this.globalData.area;
    this.globalData.background = false;
    this.globalData.show = false;
    this.globalData.active = true;
    this.globalData.activeId='';
  },


  //点击全部分类显示内容
  cateShow:function(){
    this.globalData.background = true;//背景
    this.globalData.show = true;//内容
  },
  globalData: {
    fixed: false,//控制是否固定定位 
    cityArray: [],
    areaTitle: '所在地区',//改变标题title
    area: '',
    provence:'',
    active :'',
    cate:['全部分类','法兰锻件','钢材','锻件设备','行业相关'],
    cateContent: [['全部'],
    ['全部','锻件','法兰'], 
    ['全部','钢材','废钢铁削'], 
    ['全部','锻造设备','二手设备'],
    ['全部','热处理','贸易公司','运输公司']]

  }
})
