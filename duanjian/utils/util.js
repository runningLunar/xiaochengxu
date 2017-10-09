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

function getCity(callback,arrchildid){
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/area/getCity",
      header: {
         'content-type': 'application/json',
         "Authorization": 'APPCODE 0f42d91c4d884fe9a4b7e90f14412456'
      },
      data: {
         arrchildid: arrchildid
      },
      success: function (res) {
         if (res.statusCode == 200) {  //成功了
            callback(res.data);
         }
      }
   })
}
//获取资讯
function getZixun(callback, page, catid, arrchildid, keyword) {
  wx.request({
     url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/zixun/get",
    header: {
      'content-type': 'application/json',
    },
    data:{
      'page': page,
      'arrchildid': arrchildid,
      'catid':catid,
      'keyword': keyword
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
      }
    }
  })
}
//获取供应商
function getSell(callback, page, catid, arrchildid, keyword) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/gongyin/get",
      header: {
         'content-type': 'application/json',
      },
      data: {
         'page': page,
         'arrchildid': arrchildid,
         'catid': catid,
         'keyword': keyword
      },
      success: function (res) {
         if (res.statusCode == 200) {  //成功了
            callback(res.data);
         }
      }
   })
}

//获取采购商
function getBuy(callback, page, catid, arrchildid, keyword) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/buy/get",
      header: {
         'content-type': 'application/json',
      },
      data: {
         'page': page,
         'arrchildid': arrchildid,
         'catid': catid,
         'keyword': keyword
      },
      success: function (res) {
         if (res.statusCode == 200) {  //成功了
            callback(res.data);
         }
      }
   })
}

//获取厂家
function getFactory(callback, page, catid, arrchildid, keyword) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/factory/get",
      header: {
         'content-type': 'application/json',
      },
      data: {
         'page': page,
         'arrchildid': arrchildid,
         'catid': catid,
         'keyword': keyword
      },
      success: function (res) {
         if (res.statusCode == 200) {  //成功了
            callback(res.data);
         }
      }
   })
}

//获取展会
function getExhibit(callback, page, catid, arrchildid, keyword) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/exhibit/get",
      header: {
         'content-type': 'application/json',
      },
      data: {
         'page': page,
         'arrchildid': arrchildid,
         'catid': catid,
         'keyword': keyword
      },
      success: function (res) {
         if (res.statusCode == 200) {  //成功了
            callback(res.data);
         }
      }
   })
}

//获取展会
function getKnow(callback, page, catid, arrchildid, keyword) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/know/get",
      header: {
         'content-type': 'application/json',
      },
      data: {
         'page': page,
         'arrchildid': arrchildid,
         'catid': catid,
         'keyword': keyword
      },
      success: function (res) {
         if (res.statusCode == 200) {  //成功了
            callback(res.data);
         }
      }
   })
}
//获取锻件圈
function getClub(callback, page, catid, arrchildid, keyword) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/exhibit/get",
      header: {
         'content-type': 'application/json',
      },
      data: {
         'page': page,
         'arrchildid': arrchildid,
         'catid': catid,
         'keyword': keyword
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

//获取一级分类
function getFirstCategory(callback,moduleid) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/category/getFirst",
      data: {
         moduleid: moduleid
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
//获取二级分类
function getSecondCategory(callback, arrayId) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/category/getSecond",
      data: {
         arrayId: arrayId
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


//获取huiyuan数据
function getMember(callback, keyword) {
   wx.request({
      url: "http://localhost/zdj/xiaochengxu/zgdjw/public/api/member/getMember",
      data: {
         keyword: keyword
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
module.exports = {
  getProvence: getProvence,
  getCity: getCity,
  getZixun: getZixun,
  getLoginData: getLoginData,
  getCode: getCode,
  regester:regester,
  loginPhone: loginPhone,
  getFirstCategory: getFirstCategory,
  getSecondCategory: getSecondCategory,
  getSell: getSell,
  getBuy: getBuy,
  getFactory: getFactory,
  getExhibit: getExhibit,
  getClub: getClub,
  getKnow: getKnow,
  getMember: getMember
}
