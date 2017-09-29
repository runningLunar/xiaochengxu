var data = require("../../utils/util.js");
var interval = null
Page({
   data: {
      navArr: ["账号登陆", "手机登陆"],
      index: 0,
      currentTab: 0,
      hiddenTips: 1,
      showTips: '',
      animationData: {},
      userName: '',
      userPwd: '',
      userPhone: '',
      code: '',
      send: "发送",
      lock: 'disable',
      click:true
   },
   onLoad: function () {

      var that = this;
      wx.getSystemInfo({
         success: function (res) {
            that.setData({
               screenWidth: res.screenWidth,
               screenHeight: res.screenHeight
            });
         }
      });

   },
   onBindChange: function (ev) {
      var index = ev.detail.current;
      this.setData({
         offLeft: this.data.screenWidth / 2 * index,
         currentTab: index,
      })
   },

   onNavTap: function (ev) {
      var index = ev.currentTarget.dataset.index;
      var offLeft = ev.currentTarget.offsetLeft;
      this.setData({
         currentTab: index,
         offLeft: offLeft,
         color: "#03a9f4",
      })
   },
    //获取输入的用户名
   userNameInput: function (e) {
      this.setData({
         userName: e.detail.value
      })
   },
    //获取输入的手机号
   userPhoneInput: function (e) {
      this.setData({
         userPhone: e.detail.value
      })
   },
    //获取输入的密码
   userPwdInput: function (e) {
      this.setData({
         userPwd: e.detail.value
      })
   },

   //获取输入的验证吗
   userCodeInput: function (e) {
      this.setData({
         code: e.detail.value
      })
   },
   //常规登录
   onSubmit: function (e) {
      if (this.data.userName == '') {
         wx.showToast({
            title: '请输入账户',
            image: "../../images/fail.png",
            duration: 1500
         })
      } else if (this.data.userPwd == '') {
         wx.showToast({
            title: '请输入密码',
            image: "../../images/fail.png",
            duration: 1500
         })
      } else {
         data.getLoginData(function (data) {
            console.log(data);
               if(data==2){
                  wx.showToast({
                     title:'密码或帐号错误',
                     image: "../../images/fail.png",
                     duration: 1500
                  })
               }else{
                  wx.navigateTo({
                     url: '../member_01/index',
                  })
               }
         }, this.data.userPwd, this.data.userName)
      }
   },

   //手机登录
   onShowTips2: function (e) {
      if (this.data.userPhone == '') {
         wx.showToast({
            title: '请输入手机号',
            image: "../../images/fail.png",
            duration: 1500
         })
      }
      else if (this.data.code == '') {
         wx.showToast({
            title: '请输入手机验证码',
            image: "../../images/fail.png",
            duration: 1500
         })
      }else{
         if (this.data.code==this.data.yzcode){
            data.loginPhone(function(data){
               if(data==1){
                  wx.navigateTo({
                     url: '../member_01/index',
                  })
               }
            }, this.data.userPhone)
         }else{
            wx.showToast({
               title: '验证码错误',
               image: "../../images/fail.png",
               duration: 1500
            }) 
         }
      }

   },
//发送验证码
   onSendmedds: function () {
      if (this.data.click == true) {
         if (this.data.userPhone == '') {
            wx.showToast({
               title: '手机不能为空',
               image: "../../images/fail.png",
               duration: 1500
            })
         } else if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/).test(this.data.userPhone)) {
            wx.showToast({
               title: '手机号码输入错误',
               image: "../../images/fail.png",
               duration: 1500
            })
         }
         else {
            var time = 60;
            var that = this;
            var timer = setInterval(function () {
               time--;
               that.setData({
                  send : time + 's后可以重新发送',
                  click: false
               });
               if (time == 0) {
                  clearInterval(timer);
                  that.setData({
                     send: '发送',
                     click: true
                  });
               }
            }, 1000)
            var yzcode = Math.floor(Math.random() * 9000) + 1000;
            this.setData({
               yzcode: yzcode
            }
            )
            data.getCode(function (data) {
            }, this.data.yzcode, this.data.userPhone)
         }
      }},
      //去注册页面
   doReg: function () {
      wx.navigateTo({
         url: '../register/register'
      })
   }
})