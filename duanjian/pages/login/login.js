var data = require("../../utils/util.js");
var maxTime = 5
var currentTime = maxTime //倒计时的事件（单位：s）  
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
    time: currentTime,
    lock: 'disable'
  },
  onLoad: function () {
    
    var that = this;
    data.getLoginData(function (data) {
      that.setData({
        user_name: data.user_name
      })
    })
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
      currentTab:index,
      
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
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPwdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },

  onSubmit: function (e) {
    var that = this;
    that.setData({
      showTips:'',
    })
    data.getLoginData(function (data) {
      for (var i = 0; i < data.length; i++) {
        if (that.data.userName != '' && that.data.userPwd != '') {
          if (data[i].user_name == that.data.userName && data[i].user_pwd == that.data.userPwd) {
            that.setData({
              hiddenTips: 1
            })
            wx.navigateTo({
              url: '../index/index'
            })
          }
          else if (data[i].user_name !== that.data.userName || data[i].user_pwd !== that.data.userPwd) {
            that.setData({
              showTips: '账号或者密码错误'
            })
            
          }

        }
      }
    })

    if (this.data.userName == '' || this.data.userPwd == '') {
      this.setData({
        showTips: '账号或者密码不能为空'
      })
     
    }


    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })

    this.setData({
      animationData: animation.export(),
      hiddenTips: 0
    })
    setTimeout(function () {
      this.animation = animation
      animation.scale(1, 1).step()
      this.setData({
        animationData: animation.export(),
        hiddenTips: 1
      })
    }.bind(this), 2000)
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
  onSendmes: function (e) {
    var that = this;
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime
      })

      if (currentTime <= 0) {
        clearInterval(interval)
        currentTime = -1
        that.setData({
          send: '重新已发送'

        })
      }
      console.log(that.data.time)
    }, 1000)
  },

  onShowTips2: function (e) {
    if (this.data.userPhone == '') {
      this.setData({
        showTips: '请输入登陆手机号',
      })
    }
    else if (this.data.code == '') {
      this.setData({
        showTips: '请输入手机验证码'
      })
    }

    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })

    this.setData({
      animationData: animation.export(),
      hiddenTips: 0
    })
    setTimeout(function () {
      this.animation = animation
      animation.scale(1, 1).step()
      this.setData({
        animationData: animation.export(),
        hiddenTips: 1
      })
    }.bind(this), 2000)
  },

  onSendmes: function (e) {
    console.log(22)
  },
  doReg:function(){
    wx.navigateTo({
      url: '../register/register'
    })
  }
})