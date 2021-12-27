// pages/mine/mine.js
//0 引入 用来发送请求的 方法 一定要把路径补全
import{request} from "../../request/index.js";
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';//弹窗
import { $wuxToptips } from '../../../componments/index'//组件引入

var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
const app = getApp();
const DBrepair=wx.cloud.database().collection("1repair")
Page({
  //云开发环境初始化
  data: {
  headerText:"预约时间",
  addImgUrl:'添加图片路径',
  deleteImgUrl:'删除图片路径',
  autosize:{maxHeight: 49, minHeight: 140},
  
  value: '',
  desc:'',//报修描述内容
  imgUrl:[],//上传图片路径数组
  phone:'',//联系方式
  name:'',//姓名
  house:'',//报修房屋
 
 
  pics:[],
  isShow: true,
    startDate: "请选择日期",
    multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
    multiIndex: [0, 0, 0],

  //  这里应该是查用户表得到的
  userinfoTest:{
    name: "李明",
    icon:"https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoicmjfhQ3uP8DoI4xZMbxqicg4PGOcwOgGW69c86ROI9Hvxn9JlVJiaGX4OOLpDzef4e6abVYgHykFg/132",
    communityId:"2",
    id:"在用户表中的唯一id"
  },


  },
  // 应该从云环境中获取的数据 先用缓存代替 这里应该是查用户表得到的
  setTestData(){
    let userinfoTest=this.data.userinfoTest
    wx.setStorageSync('UserinfoTest', userinfoTest);
  },

  onLoad: function (options) {
    
    
  },
  onShow:function(options){
    
  },
  //为了真机隐藏键盘
  hideKeyBorder() {
    
    wx.hideKeyboard({
      success: (res) => {
        console.log(res)
      },
    })
  },
  pickerTap:function() {
   

    var monthDay = ['今天','明天'];
    var hours = [];
    var minute = [];
    
    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if(data.multiIndex[0] === 0) {
      if(data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },


  bindMultiPickerColumnChange:function(e) {
    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);
        
      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if(data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },

  loadData: function (hours, minute) {

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute){
    // 时
    for (var i = 10; i <= 20; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  bindStartMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      var month = date.getMonth()+1;
      var day = date.getDate();
      monthDay = month + "月" + day + "日";
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
    }

    var startDate = monthDay + " " + hours + ":" + minute;
    that.setData({
      startDate: startDate
    })
    console.log(startDate);
  },

  /**获取textarea值：描述内容 */
  bindTextAreaBlur:function(e){
    let that=this;
    that.setData({
        desc:e.detail
     }) 
    },

    /**获取手机号*/
    inputPhone: function (e) {
     
    this.setData({
    phone: e.detail
    })
    },
    
    /**获取称呼 */
    inputName: function (e) {
     
    this.setData({
    name: e.detail
    })
    },

     /**获取房屋*/
     inputHouse: function (e) {
     
      let that=this;
      that.setData({
      house: e.detail
      })
     
      },
     

    /**选择图片 */
    uploadImage:function(){
    let that=this;
    let pics = that.data.pics;
    wx.chooseImage({
    count:3 - pics.length,
    sizeType: ['original', 'compressed'], 
    sourceType: ['album', 'camera'], 
    success: function(res) {
    let imgSrc = res.tempFilePaths[0];
     pics.push(imgSrc);
    if (pics.length >= 3){
     that.setData({
     isShow: false
     }) 
    }
    that.setData({
     pics: pics
    })
    },
    })
    
    },
    
    /**删除图片 */
    deleteImg:function(e){
    let that=this;
    let deleteImg=e.currentTarget.dataset.img;
    let pics = that.data.pics;
   
    let newPics=[];
    for (let i = 0;i<pics.length; i++){
    //判断字符串是否相等
    if (pics[i] !== deleteImg){
    newPics.push(pics[i])
    }
    }
    that.setData({
    pics: newPics,
    isShow: true
    })
    
    },

    // 预览图片
    handlePreviewImage(e){
      console.log(e);
      // 1 先构造 要预览的图片数组
     
      // //2 接收传递过来的图片url
      const current=e.currentTarget.dataset.url;
      wx.previewImage({
        current,
        urls:this.data.pics,
      });
    }    ,
    
    upImgCloud(pics,imageUrl){
      return new Promise((resolve,reject)=>{
        if(pics.length!=0){
          for (var i = 0; i <= pics.length; i++) {
            let filePath=this.data.pics[i];
          wx.cloud.uploadFile({//上传到云端
            cloudPath:new Date().getTime()+'.png',
            filePath:filePath,
            success :res=> {
              imageUrl.push(res.fileID);
              that.setData({
                  // imgUrl:res.fileID
                  imgUrl:imgUrl
                })  
            },
          })
        }
        }
        setTimeout(()=>{
          resolve("upload image to Cloud sucess");
        },3000)
        
        
      })
      
    },

    /**提交 */
   async submit(){
    
    let that=this;
    let desc=that.data.desc
    let house = that.data.house
    let name=that.data.name
    let phone=that.data.phone
    let pics=that.data.pics
    let time=that.data.startDate
    let imageUrl=that.data.imgUrl;
    let userinfoTest=that.data.userinfoTest
   
    Toast.loading({//弹窗提示
      message: '加载中...',
      forbidClick: true,
      mask:true,
      duration:3000,
    });
    await that.upImgCloud(pics,imageUrl);
      
    
    that.addData(desc,imageUrl,house,name,phone,time,userinfoTest);//调用添加方法
    
  
  },
 
    //向数据库中插入数据
     //添加数据
  addData(desc,imageUrl,house,name,phone,serviceTime,userinfoTest){
    console.log("add");
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "/";
    if(mydate.getMonth()<10){
        str +=(mydate.getMonth() + 1) + "/";
    }else{
        str += (mydate.getMonth() + 1) + "/";
    }

    if(mydate.getDate()<10){
        str += mydate.getDate() + " ";
    }else{
        str += mydate.getDate() + " ";
    }
    str += mydate.getHours() + ":";
    str += mydate.getMinutes() + "";
    // str += mydate.getSeconds();
    console.log("上传数据库中的url",imageUrl);
    DBrepair.add({
      data:{
        desc:desc,
        imageUrl:imageUrl,
        phone:phone,
        name:name,
        house:house,
        serviceTime:serviceTime,
        state:"待处理",
        id:userinfoTest.id,
        communityId:userinfoTest.communityId,
        icon:userinfoTest.icon,
        time:str
      },
        success: res => {
          Toast.clear();
          $wuxToptips().success({
            hidden: false,
            text: '提交成功',
            duration: 3000,
            success() {
              wx.redirectTo({
                url: '../repairShow/index',
              })
            },
        })
        },
        fail:res=>{
          console.log("添加失败",res);
          $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: '网络异常',
            duration: 3000,
            success() {
            },
        })
        }
        
    })
},

  
})