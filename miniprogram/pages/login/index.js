
const DB_userBaseInfo = wx.cloud.database().collection("T4_user_baseInfo");
Page({
  data: {
    userinfo: {},
    openId: '',
    cloud_userInfo: {}
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

  //登录按钮绑定事件；
  getUserProfile(e){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userinfo: res.userInfo,
          // hasUserInfo: true,
        }),
        //用户数据存入缓存
        wx.setStorageSync('userinfo', this.data.userinfo);
      }
    }),
    //获取openid
    this.getOpenid();
    //用户登录检测
    this.loginCheck();
  },
  /*点击登录=====================过时版本--无效
  // handleGetUserInfo(e) {
  //   //这里返回的参数是用户信息;
  //   //信息存入缓存；
  //   const {
  //     userInfo
  //   } = e.detail;
  //   wx.setStorageSync("userinfo", userInfo);
  //   //从缓存中拿出数据并存入data中；
  //   const userinfo = wx.getStorageSync('userinfo');
  //   this.setData({
  //     userinfo
  //   });
  //   //调用方法获取openID；
  //   this.getOpenid();
  //   //先判断数据库中有没有该用户的数据，如果有，不添加，如果没有，添加;
  //   // this.addData();
  //   this.loginCheck();
  //   //返回个人页面
  //   // wx.navigateBack({
  //   //   delta: 1
  //   // });
  // },*/

  //获取openId，并存入data数据中
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: "t4getOpenid",
      success(res) {
        // console.log(res);
        const OpenId = res.result.openid;
        that.setData({
          openId: OpenId,
        }),
        console.log("openId获取成功");
      },
      fail(res) {
        console.log("openId获取失败");
      }
    })
  },

  //给T4_user_BaseInfo添加数据；
  /**
   * 传入的数据包括：
   * 姓名，城市，省份，头像url，地址，社区名称，个人说明，用户等级，工作，邮箱
   * 其中：
   * 地址，个人说明，工作，邮箱，由用户自己上传，
   * 社区名称，权限等级需要认证;
   */
  addData() {
    let that = this;
    DB_userBaseInfo.add({
      data: {
        name: that.data.userinfo.nickName,
        city: that.data.userinfo.city,
        province: that.data.userinfo.province,
        avatarUrl: that.data.userinfo.avatarUrl,
        // openId:that.data.openId,
        //一些社区信息
        address: '',
        community: '',
        explain: '',
        grade: '',
        job: '',
        mail: '',
      },
      success(res) {
        console.log("添加成功", res);
      },
      fail(res) {
        console.log("添加失败");
      }
    })
  },

  // 用户登录检测，读取用户的OpenId，同时查询数据库中有无该用户的数据存在;
  loginCheck() {
    let that = this;
    DB_userBaseInfo.where({
        _openid: that.data.openId,
      })
      .get({
        success: function (res) {
          // console.log("数据库中已经存在该用户",res)
          if (res.data[0]) {
            console.log("用户存在于数据库中");
            //将云端的数据存入变量中，和本地缓存的信息判断，更具时间戳判断是否需要更新缓存文件；
            //数据存入本地变量中；
            that.setData({
              cloud_userInfo: res.data[0],
            })
            //判断是否需要更新本地文件；
            // console.log("云端数据已存如变量",that.data.cloud_userInfo);
            //同时判断用户是否完成认证，如果完成认证，返回个人界面，如果未完成，跳转到认证界面;
            if (res.data[0].community && res.data[0].grade) {
              console.log("用户已经认证");
              // 返回个人页面
              wx.navigateBack({
                delta: 1
              });
            } else {
              console.log("用户未认证");
              //跳转到用户认证界面；
              wx.showLoading({
                title: '前往认证界面',
              })
              setTimeout(function () {
                console.log("认证弹窗");
                wx.hideLoading();
                wx.navigateTo({
                  url: '/pages/prove/prove',
                })
              }, 500)
            }
          } else {
            console.log("用户不存在于数据库中");
            that.addData();
          }
        }
      })
  },

})