// pages/mine/mine.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabbar:{},
    customitem: '全部',
    adUrls: null,
    indicatorDots: true,
    autoplay: true,
    duration: 1000,
    interval: 5000,
    topicList: [{
      "topic_id": "1010000037765",
      "user_id": "1320000292740",
      "content": {
        "txt": "现在有急事要出门，5岁的孩子谁能帮忙看一下？"
      },
      "reply_content": {
        "txt": "",
        "img": []
      },
      "comment_num": "0",
      "simulate_num": "0",
      "like_num": "0",
      "forward_num": "0",
      "look_num": "0",
      "red_heart": "2.00",
      "crowd_funding": "0",
      "is_reply": "0",
      "reply_at": "0",
      "created_at": "10天前",
      "name": "李明—花园社区",
      "img_url": "cloud://lingju-2gmbkk11474c4790.6c69-lingju-2gmbkk11474c4790-1305134585/images/circleImg/user_icon1.png",
      "r_name": "",
      "r_img_url": "",
      "r_user_id": "1320000005725"
    }
    ],
    show: false,
    text: ''
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
       this.getTabBar().setData({
         selected: 4
       })
    }
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    
  },

  //点击发起求助后的处理
  handleHelpBtn(e){
    console.log("发起求助");
  }
})