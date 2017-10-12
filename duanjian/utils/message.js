
function getMessage(callback, username) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/message/getMessage",
      header: {
         'content-type': 'application/json'
      },
      data: {
         username: username
      },
      success: function (res) {
         if (res.statusCode == 200) {  //成功了
            callback(res.data);
         }
      }
   })
}
module.exports = {
   getMessage: getMessage  
}