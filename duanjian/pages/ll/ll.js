Page({
  data: {
    x: 0,
    y: 0
  },
  tap: function (e) {
    this.setData({
      x: 100,
      y: 30
    });
  }
})