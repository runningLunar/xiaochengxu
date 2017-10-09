var data = require("../../utils/util.js");
const app = getApp();
Page({
   data: {
      userName: '',
      pwd: '',
      userPhone: '',
      code: '',
      trapX: 0,
      showWelcome: '拖动完成验证',
      move: true,
      btnTitle: "发送",
      click: true
   },
   onLoad: function (options) {
      var that = this;
      wx.getSystemInfo({
         success: function (res) {
            that.setData({
               eleWidth: res.windowWidth
            })
         }
      });
   },
   userNameInput: function (e) {
      this.setData({
         userName: e.detail.value
      })
   },
   userPwdInput: function (e) {
      this.setData({
         pwd: e.detail.value
      })
   },
   userPhoneInput: function (e) {
      this.setData({
         userPhone: e.detail.value
      })
   },
   userCodeInput: function (e) {
      this.setData({
         code: e.detail.value
      })
   },
   doReg: function (e) {
      if (this.data.userName == '') {
         wx.showToast({
            title: '会员名称不能为空',
            image: "../../images/fail.png",
            duration: 1500
         })
      }
      else if (this.data.pwd == '') {
         wx.showToast({
            title: '密码不能为空',
            image: "../../images/fail.png",
            duration: 1500
         })
      }
      else if (this.data.userPhone == '') {
         wx.showToast({
            title: '手机不能为空',
            image: "../../images/fail.png",
            duration: 1500
         })
      }
      else if (this.data.code == '') {
         wx.showToast({
            title: '验证码不能为空',
            image: "../../images/fail.png",
            duration: 1500
         })
      } else if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/).test(this.data.userPhone)) {
         wx.showToast({
            title: '手机号码输入错误',
            image: "../../images/fail.png",
            duration: 1500
         })
      } else if (this.data.pwd.length < 6 && this.data.pwd.length < 20) {
         wx.showToast({
            title: '密码格式错误',
            image: "../../images/fail.png",
            duration: 1500
         })
      } else if (!(/[a-z0-9]{4,20}/).test(this.data.userName)) {
         wx.showToast({
            title: '会员名称格式错误',
            image: "../../images/fail.png",
            duration: 1500
         })
      } else if (this.data.move) {
         wx.showToast({
            title: '请拖动验证码',
            image: "../../images/fail.png",
            duration: 1500
         })
      }else{
         if (this.data.code == this.data.yzcode){
            var that=this;
            data.regester(function(data){
               if(data==2){
                  wx.showToast({
                     title: '该账户已注册',
                     image: "../../images/fail.png",
                     duration: 1500
                  }) 
               }else{
                  app.globalData.keyword = that.data.userPhone;
                  wx.navigateTo({
                     url: '../member_01/index',
                  })
               }
            }, this.data.userName, this.data.pwd, this.data.userPhone)
         }else{
            wx.showToast({
               title: '验证码错误',
               image: "../../images/fail.png",
               duration: 1500
            }) 
         }
      }
   },
   //拖动验证码
   tap: function (ev) {
      var x = ev.touches[0].clientX - ev.target.offsetLeft;//移动框原点位 

      // //bar的宽度
      var eleWidth = this.data.eleWidth - ev.target.offsetLeft * 2;
      //drag的宽度
      var dragWidth = eleWidth * 0.18;
      var eeWidth = eleWidth - dragWidth;


      if (x > eeWidth) {
         x = eeWidth
      } else if (x < 0) {
         x = 0
      }
      if (this.data.move) {
         var barWidth = x;
         this.setData({
            trapX: barWidth,
            barWidth: barWidth,
            width: eleWidth,
            left: x,
         })
      }
   },
   //拖动结束
   touchEnd: function (ev) {
      var that = this;
      // //bar的宽度
      var eleWidth = this.data.eleWidth - ev.target.offsetLeft * 2;

      //drag的宽度
      var dragWidth = eleWidth * 0.18;
      var eeWidth = eleWidth - dragWidth;
      if (this.data.left == eeWidth) {
         that.setData({
            barWidth: eeWidth,
            move: false,
            showWelcome: '完成验证'
         })
      } else {
         ev.target.offsetLeft = 0;
         this.setData({
            trapX: 0,
            left: 0,
            barWidth: 0,
            move: true,
            showWelcome: '拖动完成验证'
         })
      }
   },

   onSendmes: function () {
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
                  btnTitle: time + 's后可以重新发送',
                  click: false
               });
               if (time == 0) {
                  clearInterval(timer);
                  that.setData({
                     btnTitle: '发送',
                     click: true
                  });
               }
            }, 1000)
            var yzcode = Math.floor(Math.random() * 9000) + 1000;
            this.setData({
               yzcode:yzcode
               }
            )
            data.getCode(function (data) {
               
            }, this.data.yzcode,               this.data.userPhone)
         }
      }
   }

    
    // //bar的宽度
    var eleWidth = this.data.eleWidth - ev.target.offsetLeft * 2;
    if (x > eeWidth){
      x = eeWidth
    }else if(x<0){
      x=0
    }
    if(this.data.move){
     var barWidth=x;
     this.setData({
       trapX: barWidth,
       barWidth: barWidth,
       width: eleWidth,
       left:x,
     })
    }
  },
  touchEnd:function(ev){

    var that=this;
    var eeWidth = this.data.eleWidth - ev.target.offsetLeft -80;
    if (this.data.left >= eeWidth){

    console.log(ev);
    var that=this;
    console.log("rdd");
    var eeWidth = this.data.eleWidth - ev.target.offsetLeft -80;
    if (this.data.left == eeWidth){

      that.setData({
        barWidth: eeWidth,
        move:false,
        showWelcome: '完成验证'
      })

      setTimeout(function () {
        this.setData({
          showWelcome: '中国锻件网欢迎你'
        })
      }.bind(this), 1000)

    }else{
      ev.target.offsetLeft=0;
      this.setData({
        trapX: 0,
        left:0,
        barWidth: 0,
        move: true,
        showWelcome: '拖动完成验证'
      })
    }
  },


  startTap:function(ev){
      console.log(ev);
  }


})