var amapFile = require('../../../libs/amap-wx.js');
var markersData = {
  latitude: '',//纬度
  longitude: '',//经度
  key: "77180d5c4b2df96c571e91fb2dfac5ab"//申请的高德地图key
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weather:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.loadInfo();
  },


  //获取当前位置的经纬度
  loadInfo: function(){
    var that=this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
      //   var latitude = res.latitude//维度
      //   var longitude = res.longitude//经度
        console.log(res);
      //   that.loadCity(latitude,longitude);
      }
    })
  },
  test(){
     //获取当前位置的经纬度
  
    //  wx.openLocation({
    //    latitude: 0,
    //    longitude: 0,
    //  })
     wx.chooseLocation({
       latitude: 0,
       longitude: 0,
     })
  },
  loadInfo: function(){
    var that=this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      highAccuracyExpireTime:5000,
      isHighAccuracy:true,
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        console.log(res);
        // console.log(latitude-10);

        // wx.showToast({
        //   title:res.latitude+" "+res.longitude ,
        // })



        that.loadCity(latitude,longitude);
      }
    })
  },

  //把当前位置的经纬度传给高德地图，调用高德API获取当前地理位置，天气情况等信息
  loadCity: function (latitude, longitude){
    var that=this;
    var myAmapFun = new amapFile.AMapWX({ key: markersData.key });
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
      success: function (data) {
        console.log("address",data);
      },
      fail: function (info) { }
    });

    myAmapFun.getWeather({
      success: function (data) {
        that.setData({
          weather: data
        })
        console.log(data);
         wx.showToast({
          title:data[0].name+','+desc
          // regeocodeData.addressComponent.city+','+district+','+streetNumber.street+','
          // +streetNumber.township
        })
        //成功回调
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },



})