Page({
  data:{
    showTips: '',
    hiddenTips: 1,
    userName:'',
    pwd:'',
    userPhone:'',
    code:'',
    trapX:0,
    showWelcome:'拖动完成验证',
    move:true
  },
  onLoad: function (options) {
   var that=this;
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
    var x = ev.touches[0].clientX - ev.target.offsetLeft;//移动框原点位 
    var eeWidth = this.data.eleWidth - ev.target.offsetLeft-80;

    
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