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
    currentTab: 0,
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
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  /**
   * 点击切换tab
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
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
  }
})