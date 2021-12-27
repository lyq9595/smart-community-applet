// pages/mine/mine.js
const app = getApp();
Page({
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
       this.getTabBar().setData({
         selected: 5
       })
    }
 },
  /**
   * 页面的初始数据
   */
  data: {
    //tabbar
    tabbar: {},
    userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    // wx.hideTabBar();
  },

  onShow(){
    const userinfo=wx.getStorageSync('userinfo');
    this.setData({userinfo});
  },

})