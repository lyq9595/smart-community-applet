// pages/mine/mine.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';//对话框导入

const app = getApp();
const DBform= wx.cloud.database().collection("1form");
Page({
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
       this.getTabBar().setData({
         selected: 0
       })
    }
 },
  data: {
    show:false,
    show1: false,
    //tabbar
    tabbar: {},
     // 轮播图数组
     swiperList:[
        {
            "image_src": "cloud://lingju-2gmbkk11474c4790.6c69-lingju-2gmbkk11474c4790-1305134585/images/index/swpierImg5.png",
            "open_type": "navigate",
            "goods_id": 129,
            "navigator_url": "/pages/goods_detail/index?goods_id=129"
        },
        {
          "image_src": "cloud://lingju-2gmbkk11474c4790.6c69-lingju-2gmbkk11474c4790-1305134585/images/index/swiperImg2.jpg",
          "open_type": "navigate",
          "goods_id": 129,
          "navigator_url": "/pages/goods_detail/index?goods_id=129"
      },
      {
        "image_src": "cloud://lingju-2gmbkk11474c4790.6c69-lingju-2gmbkk11474c4790-1305134585/images/index/swiperImg3.jpg",
        "open_type": "navigate",
        "goods_id": 129,
        "navigator_url": "/pages/goods_detail/index?goods_id=129"
    }
     ],
    
    
  
  },
  
  //对话点击关闭
  onClose() {
    this.setData({ show: false });
  },
  //点击社区商店
  storeClick(){
    this.setData({ show: true });
  },

  findUser(){
    return new Promise((resolve,reject)=>{
     
         
      setTimeout(()=>{
        resolve("upload image to Cloud sucess");
      },3000)
      
      
    })
  },
  //点击每日报送
  formClick(){
    let that=this
    let userOpenId='123'//假定一个值
    DBform.where({
      id:userOpenId
    })
    .get({
      success(res){
        let flag=res.data.length;
        if(flag===0){
          wx.navigateTo({
            url: '/miniprogram/pages/fillDaily/index',
          })
        }else{
          that.setData({ show1: true });
        }
      }
    })
    //
  },
  onLoad: function (options) {
    app.editTabbar();
    // wx.hideTabBar();
  },


})