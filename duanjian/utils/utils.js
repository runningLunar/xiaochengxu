function getLoginData(callback) {

  wx.request({
    url: 'http://localhost/lesson_7/thinkphp5/public/index/user',
    data: {},
    method: "POST",
    header: {
      "content-type": "json"
    },
    success: function (res) {
      if (res.statusCode == "200") {
        var data = res.data;
        console.log(res)
        callback(res.data);
      }
    }
  })
}
module.exports = {
  getLoginData: getLoginData,

}