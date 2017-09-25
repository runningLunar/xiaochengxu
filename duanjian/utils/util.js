function getProvence(callback,parentid){
  wx.request({
    url: "http://localhost/zgdjw/public/area/area/get",
    header: {
      'content-type': 'application/json',
       "Authorization": 'APPCODE 0f42d91c4d884fe9a4b7e90f14412456'
    },
    data:{
        parentid:parentid
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
     callback(res.data);
      }
    }
  })
}
//获取资讯
function getZixun(callback,page) {
  wx.request({
    url: "http://localhost/zgdjw/public/zixun/zixun/index",
    header: {
      'content-type': 'application/json',
    },
    data:{
      'page': page
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
      }
    }
  })
}
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
  getProvence: getProvence,
  getZixun: getZixun,
  getLoginData: getLoginData,
}
