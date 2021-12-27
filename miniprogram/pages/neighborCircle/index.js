// pages/mine/mine.js
const app = getApp();
Page({
  
  data: {
    //tabbar
    tabbar: {},
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
       this.getTabBar().setData({
         selected: 2
       })
    }
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    
  },



  //点击推荐后的处理事件
  handleRecommend(e){
    console.log("推荐");
  },
  //点击选择关注的处理事件
  handleConcern(e){
    console.log("关注");
  },
  //点击加关注后的处理事件
  addConcern(e){
    console.log("关注改用户");
  },
  //点击点赞后的处理事件
  handleLoveClick(e){
    console.log("点赞");
  },
  //点击评论后的处理事件
  handleCommentClick(e){
    console.log("评论");
  },//点击收藏后的处理事件
  handleCollectionClick(e){
    console.log("收藏");
  },//点击有帮助的处理事件
  handleHelpClick(e){
    console.log("有帮助");
  },
  
})