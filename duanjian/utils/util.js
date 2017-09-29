function getProvence(callback,parentid){
  wx.request({
    url:"http://localhost/zdj/xiaochengxu/zgdjw/public/api/area/get",
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
    url: "http://localhost/zgdjw/public/api/zixun/index",
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
//常规登录
function getLoginData(callback, userPwd,key) {

  wx.request({
     url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/login/keylogin",
    data: {
      password: userPwd,
      key:key
    },
    method: "GET",
    header: {
      "content-type": "json"
    },
    success: function (res) {
      if (res.statusCode == "200") {
        var data = res.data;
        callback(res.data);
      }
    }
  })
}
//手机验证登录
function loginPhone(callback,phone) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/login/phoneLogin",
      data: {
        phone:phone
      },
      method: "GET",
      header: {
         "content-type": "json"
      },
      success: function (res) {
         if (res.statusCode == "200") {
            var data = res.data;
            callback(res.data);
         }
      }
   })
}
//获取验证码
function getCode(callback, code, userPhone) {
   console.log(code);
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/reg/getCode",
      data: {
         code:code,
         userPhone, userPhone
      },
      method: "get",
      header: {
         "content-type": "json"
      },
      success: function (res) {
         if (res.statusCode == "200") {
            callback(res.data);
         }
      }
   })
}

//注册信息
function regester(callback, username, password,userPhone) {
   console.log(userPhone)
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/reg/reg",
      data: {
         userPhone, userPhone,
         username: username,
         password: password
      },
      method: "get",
      header: {
         "content-type": "json"
      },
      success: function (res) {
         if (res.statusCode == "200") {
            console.log(res.data);
            callback(res.data);
         }
      }
   })
}
module.exports = {
  getProvence: getProvence,
  getZixun: getZixun,
  getLoginData: getLoginData,
  getCode: getCode,
  regester:regester,
  loginPhone: loginPhone
}
