// newsDetail.js
var WxParse = require('../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toTopStatus: false,
    title:'T9材质_T9化学成分和机械性能',
    sourse:'中国锻造网',
    time:'2017-9-19 19:40',
    watched:1034,
    content:`T9性能和T8和T8A相似，可用于<a href="http://www.duanzaochina.com">锻件</a>加工，锻件网推荐。T9用于制造硬度较高，有一定韧性但不受剧烈振动冲击的工具，如中心铳、冲模、冲头、木材切削工具及饲料机的刀片、凿岩石用的凿子等工具。<br/>
              <br/>中文名 T9碳素工具钢 <br/>
              牌 &nbsp;号 T9 <br/>
              标 &nbsp;准 GB/T 1298－1986 <br/>
              用 &nbsp;途 制造硬度较高，有一定韧性工具<br/><br/>

              <img src="https://img.ithome.com/newsuploadfiles/2017/5/20170527_143259_644.jpg" />
              <br/>
              <br/>
              材料名称：碳素工具钢<br/>
              牌号：T9<br/>
              标准：GB/T 1298－1986<br/>
              特性及适用范围：T9性能和T8和T8A相似，T9用于制造硬度较高，有一定韧性但不受剧烈振动冲击的工具，如中心铳、冲模、冲头、木材切削工具及饲料机的刀片、凿岩石用的凿子等工具。<br/>
              <br/>
              化学成份<br/>
              碳 C ：0．85～0．94<br/>
              硅 Si：≤0．35<br/>
              锰 Mn：≤0．40<br/>
              硫 S ：≤0．030<br/>
              磷 P ：≤0．035<br/>
              铬 Cr：答应残余含量≤0．25、≤0．10（制造铅浴淬火钢丝时）<br/>
              镍 Ni：答应残余含量≤0．20、≤0．12（制造铅浴淬火钢丝时）<br/>
              铜 Cu：答应残余含量≤0．30、≤0．20（制造铅浴淬火钢丝时）<br/>
              注：答应残余含量Cr Ni Cu≤0．40（制造铅浴淬火钢丝时）<br/>
              <br/>
              力学性能<br/>
              硬度：退火，≤192HB，压痕直径≥4．35mm;淬火，≥62HRC<br/>
              热处理规范：试样淬火760～780℃，水冷。<br/>
              交货状态：钢材以退火状态交货。经双方协议，也可以不退火状态交货。<br/>`,
    other:[
      {
        title:'T8材质-T8化学成分和机械性能',
        link:''
      },
      {
        title: '45#材质_机械性能_化学成分 - 锻件百科',
        link: ''
      },
      {
        title: 'T8材质-T8化学成分和机械性能',
        link: ''
      },
      {
        title: '70Mn锻件-机械性能-化学成分-70Mn锻件百科',
        link: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WxParse.wxParse('content', 'html', this.data.content, this, 20);
    wx.setNavigationBarTitle({
      title: '咨询详情'
    })
  },
  /**
   * 监听页面滚动
   */
  // onPageScroll: function(){
  //   this.toTopStatus = true;
  //   // if(screenTop==0){
  //   //   this.toTopStatus = false;
  //   // }else{
  //   //   this.toTopStatus = true;
  //   // }
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { 
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onPageScroll: function(ev){
    var st = ev.scrollTop;
    if(st == 0){
      this.setData({
        toTopStatus: false
      })
    }else{
      this.setData({
        toTopStatus: true
      })
    }
  },
  toTop: function(){
    wx.pageScrollTo({
      scrollTop: 0,
    });
  }
})