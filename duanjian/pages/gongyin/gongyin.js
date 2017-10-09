// pages/more/more.js
var data = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_page: 1,   //当前页数
    secondArray:[],//用于存放获取的二级分类
    catid:'',
    arrchildid:'',
    keyword:'',
   item:{
      cateTitle:'全部分类',
      areaTitle:'所在地区',
      firstArray:[],//一级分类
      secondArray:[],//二级分类
      show:false,//控制遮罩层显示
      city:[],//市
      provence:[],
      tab2:'',//控制导航栏2颜色
      tab3: ''//控制导航栏3颜色
   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.init();
  },
  //数据初始化
  init:function(){
     //获取资讯
     var page = 1;
     this.setData({
        current_page:page
     })
     this.getSell(page, this.data.catid, this.data.arrchildid, this.data.keyword);

     //获取一级分类
     var that = this;
     data.getFirstCategory(function (data) {
        that.setData({
           item:{
              cateTitle: '全部分类',
              areaTitle: '所在地区',
              firstArray: data,//一级分类
              secondArray: [{ catname: "全部", catid: '' }],//二级分类
              activeid:'',
              show:false,
              city: [],//市
              provence: [],
              tab2: '',//控制导航栏2颜色
              tab3: ''//控制导航栏3颜色
           }
        })
     }, 5)
  },
//分类导航显示
   cateShow:function(ev){
    var activeId=ev.currentTarget.dataset.id;
    this.setItem(this.data.item.cateTitle,
       this.data.item.areaTitle
            , this.data.item.firstArray
            , this.data.item.secondArray
            ,activeId
            ,true
             , this.data.item.provence
             ,this.data.item.city
       , this.data.item.tab1
       ,this.data.item.tab2
            )
   },
//获取二级分类
   getSecondCate:function(ev){
      var that=this;
      var first = this.data.item.firstArray;
      var index=ev.target.dataset.index;
         var arrayId = this.data.item.firstArray[index].arrchildid;
         this.setData({
            id: index
         })
         if (typeof (this.data.secondArray[index]) == 'undefined') {
            var array = that.data.secondArray;
         data.getSecondCategory(function(data){
            array[index]=data;
            that.setData({
               secondArray: array 
            })
            that.setItem(that.data.item.cateTitle,
               that.data.item.areaTitle
               , first
               , that.data.secondArray[index]
               ,1
               ,true
               , that.data.item.provence
               , that.data.item.city
               , that.data.item.tab1
               , that.data.item.tab2
                , that.data.cid,
               that.data.id
         
          ) }, arrayId) }else {
            that.setItem('全部分类'
               , '全部地区'
               , that.data.item.firstArray
               , that.data.secondArray[index],
               1
               , this.data.item.provence
               , this.data.item.city
               ,true
               , that.data.item.tab1
               , that.data.item.tab2
               , that.data.cid,
               that.data.id)
}
   },
   //改变分类 
   changeCate:function(ev){
      console.log(ev.currentTarget.dataset.id);
      this.setItem(
         this.data.item.secondArray[ev.currentTarget.dataset.id].catname
         , this.data.item.areaTitle
         , this.data.item.firstArray
         , this.data.secondArray[this.data.id]
         ,''
         ,false
         ,this.data.item.provence
         ,this.data.item.city
         , this.data.item.tab1
         , this.data.item.tab2
         )
      this.setData({
         catid: ev.currentTarget.dataset.cid
      })
      var page = 1;
      this.setData({
         current_page: page
      })
      this.getSell(page, this.data.catid, this.data.arrchildid, this.data.keyword);
   },
   //全国
   countryAll:function(){
      var that = this;
      that.setData({
         pid: -1
      })
      that.setItem(
         that.data.item.cateTitle
         , this.data.item.areaTitle,
         that.data.item.firstArray,
         that.data.item.secondArray,
         2,
         true,
         app.globalData.provence,
         [{ areaname: "全国", arrchildid: '' }],
         that.data.item.tab1,
         that.data.item.tab2,
         that.data.pid,
         that.data.gid
      )
   },
   //全部分类
   allCate:function(){
    var that=this;
    that.setData({
       id:-1
    })
      that.setItem(
         '全部分类',
         that.data.item.areaTitle
         , that.data.item.firstArray
         , [{ catname: "全部",catid:''}]
         , 1
         , true
         , that.data.item.provence
         , that.data.item.city
         , that.data.item.tab1
         , that.data.item.tab2
         , that.data.cid,
         that.data.id

      )
   },
   //设置template中data值
   setItem: function (cateTitle, areaTitle, firstArray, secondArray, activeId, show, provence,city,tab1,tab2,cid,gid){
   this.setData({
      item: {
         cateTitle: cateTitle,
         areaTitle: areaTitle,
         firstArray: firstArray,//一级分类
         secondArray: secondArray,//二级分类
         activeId: activeId,
         show:show,
         provence: provence,
         city:city,
         tab1:tab1,
         tab2:tab2,
         cid:cid,
         gid:gid
      }
   })
},
//获取省
getProvence:function(){
   app.getAddress(0);
   var that=this;
   setTimeout(function(){
      that.setItem(
         that.data.item.cateTitle,
         that.data.item.areaTitle,
         that.data.item.firstArray,
         that.data.item.secondArray,
         2,
         true,
         app.globalData.provence,
         [{ areaname: "全国", arrchildid: '' }],
          that.data.item.tab1,
         that.data.item.tab2,
         that.data.cid,
         that.data.gid
      )
   },200)
},

//获取市
   getCity:function(ev){
      app.getCity(ev.target.dataset.id + 1, app.globalData.provence[ev.target.dataset.id].arrchildid);
      this.setData({ pid: ev.target.dataset.id})
      var that=this;
      setTimeout(function () {
         that.setItem(
            that.data.item.cateTitle,
            that.data.item.areaTitle,
            that.data.item.firstArray,
            that.data.item.secondArray,
            2,
            true,
            app.globalData.provence,
            app.globalData.city,
            that.data.item.tab1,
            that.data.item.tab2,
            that.data.pid,
            that.data.gid
         )
      }, 200)
   },
   //查找市的资讯
   selectCity:function(ev){
      var that = this;
         var areaTitle = this.data.item.city[ev.target.dataset.id].areaname

      this.setData({
         arrchildid: this.data.item.city[ev.target.dataset.id].arrchildid
      })
      var page = 1;
      this.setData({
         current_page: page
      })
      this.getSell(page, this.data.catid, this.data.arrchildid, this.data.keyword);
      that.setItem(
         that.data.item.cateTitle,
         areaTitle,
         that.data.item.firstArray,
         that.data.item.secondArray,
         0,
         false,
         app.globalData.provence,
         app.globalData.city,
         2,
         that.data.item.tab2,
         that.data.cid,
         that.data.gid
      )
   },
   //排序显示
   getOrder:function(){
      var that=this;
      that.setItem(
         that.data.item.cateTitle,
         that.data.item.areaTitle,
         that.data.item.firstArray,
         that.data.item.secondArray,
         3,
         true,
         app.globalData.provence,
         app.globalData.city,
         that.data.item.tab1,
         3,
         that.data.cid,
         that.data.gid
      )
   },
   //选则排序方式
   selectOrder:function(){
      var that = this;
      that.setItem(
         that.data.item.cateTitle,
         that.data.item.areaTitle,
         that.data.item.firstArray,
         that.data.item.secondArray,
         0,
         false,
         app.globalData.provence,
         app.globalData.city,
         this.data.item.tab1,
         0,
           that.data.cid,
         that.data.gid
      )
   },
  //获取资讯
   getSell: function (page, catid, areaid,keyword){
    var that=this;
    data.getSell(function(data){
       var arr=[];
       for(var i=0;i<data.data.length;i++){
          arr.push({ title: data.data[i].title, areaname: data.data[i].areaname, company: data.data[i].company, edittime: new Date(data.data[i].edittime * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')})
       }
       console.log(arr);
        that.setData({
           zixun: arr,
          last_page:data.last_page
        })
    }, page, catid, areaid,keyword)
  },
  //隐藏
  hidden:function(){
      this.setData({
         item:{
            show:false,
            cateTitle: this.data.item.cateTitle,
            areaTitle: this.data.item.areaTitle,
             firstArray:this.data.item.firstArray,
             secondArray: this.data.item.secondArray,
              tab1: this.data.item.tab1,
              tab2: 0,
              cid:this.data.cid,
              gid:this.data.gid
         }
      })
  },
  //上一页
  prevPage:function(){
    var page = this.data.current_page;
    if(page==1){
      page=1;
    }else{
      page--;
      }
   this.setData({
     current_page:page
   })
   this.getSell(page, this.data.catid, this.data.arrchildid, this.data.keyword);
  },
  //下一页

  nextPage: function () {
    var page = this.data.current_page;
    console.log(page);
    if (page == this.data.last_page) {
      page = this.data.last_page
    }else{
      page++;
    }
    this.setData({
      current_page: page
    })
    this.getSell(page, this.data.catid, this.data.arrchildid, this.data.keyword);
  },

  //首页
  firstPage:function(){
    var page=1;
    this.setData({
      current_page: page
    })
    this.getSell(page, this.data.catid, this.data.arrchildid, this.data.keyword);
  },

  //尾页
  lastPage:function(){
    var page = this.data.last_page;
    this.setData({
      current_page: page
    })
    this.getSell(page, this.data.catid, this.data.arrchildid,this.data.keyword);
  },
  //查询关键字获取
  keyword:function(e){
     this.setData({
        keyword: e.detail.value
     })
  },
  //查询事件
  search:function(){
     var page = 1;
     this.setData({
        current_page: page
     })
     this.getSell(page, this.data.catid, this.data.arrchildid, this.data.keyword);
  },
  //取消查询
  quxiao:function(){
     this.setData({
        keyword:''
     })
  }
})