// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      "custom": true,
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
          {
            "pagePath": "/pages/index/index",
            "iconPath": "/icon/home.png",
            "selectedIconPath": "icon/home-o.png",
            "text": "首页"
          },
          {
            "pagePath": "/pages/neighborCircle/index",
            "iconPath": "icon/circle.png",
            "selectedIconPath": "icon/circle-o.png",
            "text": "邻聚圈"
          },
          {
            "pagePath": "/pages/middle/middle",
            "iconPath": "icon/add.png",
            "isSpecial": true,
            "text": "发布"
          },
          {
            "pagePath": "/pages/CommunityAid/index",
            "iconPath": "icon/aid.png",
            "selectedIconPath": "icon/aid-o.png",
            "text": "邻聚圈"
          },
          {
            "pagePath": "/pages/user/index",
            "iconPath": "icon/my.png",
            "selectedIconPath": "icon/my-o.png",
            "text": "我的"
          }
        ]
      }
    }
  },
  

  /**
   * 组件的初始数据
   */
  data: {
    //isIphoneX: app.globalData.systemInfo.model == "iPhone X" ? true : false,
  },
  methods:{
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      // this.setData({
      //   selected: data.index
      // })
  },
  },
 

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
