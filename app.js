//app.js

App({
  globalData:{

  },
  onLaunch: function () {
  
    //云开发环境初始化
    wx.cloud.init({
      env: "你的云环境id"
    })
    //隐藏系统tabbar
    // wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();

  },
  onShow: function () {
    //隐藏系统tabbar
    // wx.hideTabBar();
  },
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  
  globalData: {
    
    systemInfo: null,//客户端设备信息
    tabBar: {
      "custom": true,
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [
        {
          "pagePath": "/miniprogram/pages/index/index",
          "iconPath": "icon/home.png",
          "selectedIconPath": "icon/home-o.png",
          "text": "首页"
        },
        {
          "pagePath": "/miniprogram/pages/neighborCircle/index",
          "iconPath": "icon/circle.png",
          "selectedIconPath": "icon/circle-o.png",
          "text": "邻聚圈"
        },
        
        {
          "pagePath": "/miniprogram/pages/middle/middle",
          "iconPath": "icon/add.png",
          "isSpecial": true,
          "text": "发布"
        },
        {
          "pagePath": "/miniprogram/pages/CommunityAid/index",
          "iconPath": "icon/aid.png",
          "selectedIconPath": "icon/aid-o.png",
          "text": "社区互助"
        },
        {
          "pagePath": "/miniprogram/pages/mine/mine",
          "iconPath": "icon/my.png",
          "selectedIconPath": "icon/my-o.png",
          "text": "我的"
        }
      ]
    }
  }
})