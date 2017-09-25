Page({
  data:{
    showTips: '',
    hiddenTips: 1,
    userName:'',
    pwd:'',
    userPhone:'',
    code:'',
    trapX:0,
    showWelcome:'拖动完成验证'
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
  doReg:function(e){
    this.setData({
      showTips: '',
      hiddenTips: 1,
    })
    if (this.data.userName == ''){
      this.setData({
        hiddenTips: 0,
        showTips: '账号不能为空',
      })
    }
    else if (this.data.pwd == '') {
      this.setData({
        hiddenTips: 0,
        showTips: '密码不能为空',
      })

    }
    else if (this.data.userPhone == '') {
      this.setData({
        hiddenTips: 0,
        showTips: '手机号码不能为空',
      })
    }
    else if (this.data.code == '') {
      this.setData({
        hiddenTips: 0,
        showTips: '验证码不能为空',
      })
    }
    setTimeout(function () {
      this.setData({
        hiddenTips: 1,
      })
    }.bind(this), 2000)

  },
  tap:function(ev){
    var x = ev.touches[0].clientX
    this.setData({
      trapX:(x/30-1)
    })
    if (this.data.trapX>=10){
      this.setData({
        trapX: 10,
        showWelcome:'验证完成'
      }) 
      setTimeout(function () {
        this.setData({
          showWelcome: '中国锻件网欢迎你'
        })
      }.bind(this), 1000)
    }

    if(this.data.trapX<=0){
      this.setData({
        trapX: 0,
        showWelcome: '拖动完成验证'
      }) 
    }
  }
})