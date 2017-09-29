var app = getApp()
Page({
  data: {
    imgUrls: [
      '../../images/index_swiper.jpg',
      '../../images/index_swiper.jpg',
      '../../images/index_swiper.jpg'
    ],
    showView: true,
    scrollTop: 0,
    currentTab1: 0,//控制1f
    currentTab2: 0,//控制2f
    currentTab3: 0,//控制3f
  
  },

  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
  },

  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  /**
   * 滑动切换tab
   */
  bindChange: function (e) {
    var id = e.target.dataset.id;
    if(id==1){
      this.setData({ currentTab1: e.detail.current });
    } else if (id == 2){
      this.setData({ currentTab2: e.detail.current });
    }else{
      this.setData({ currentTab3: e.detail.current });
    }
  },

  /**
   * 点击切换tab
   */
  swichNav: function (e) {
    var id= e.target.dataset.id;
    console.log(id);
   if(id==1){
     if (this.data.currentTab1 === e.target.dataset.current) {
       return false;
     } else {
       this.setData({
         currentTab1: e.target.dataset.current
       })
     }
   }else if(id==2){
     if (this.data.currentTab2 === e.target.dataset.current) {
       return false;
     } else {
       this.setData({
         currentTab2: e.target.dataset.current
       })
     }
   }else{
     if (this.data.currentTab3 === e.target.dataset.current) {
       return false;
     } else {
       this.setData({
         currentTab3: e.target.dataset.current
       })
     }
   }

  },

  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  scroll: function (e, res) {
    if (e.detail.scrollTop > 200) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },


    // 跳转
  tosorb: function () {
    wx.navigateTo({
      url: '../sellorbuy/sellorbuy'
    })
  },
  tomy: function () {
    wx.navigateTo({
      url: '../member_01/login_01/login'
    })
  },
  tochannel: function () {
    wx.navigateTo({
      url: '../channel/channel'
    })
  }


})