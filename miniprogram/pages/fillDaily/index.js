// miniprogram/pages/form/form.js
const app = getApp()
const DB=wx.cloud.database().collection("1form")
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';//弹窗
import { $wuxToptips } from '../../../componments/index'//组件引入
Page({


  data: {
    //体温范围
    temperature_range: [
      Array(8).fill(0).map((_, index) => index + 35), // 体温可能范围35-42
      Array(10).fill(0).map((_, index) => `.${index}`)
    ],
    //日期
    tempIndexes: [
      {
       
      }
    ],
    //温度数组
    temperatures: [
      {
        am: '',
        pm: ''
      }
    ],
    location: '',//位置
    memberNum: 0,//家庭成员
    hasReturneesIndex: 0,//流动人口索引
    hasReturnees: ''//是否流动人口
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 设置picker当前状态为当前体温
    let tempIndexes = []
    let temperatures = []
    let members = [
      {
    
      }
    ]
    for(let i in members) {
      tempIndexes[i] = {}
      temperatures[i] = {}
      let t = members[i].temperatures
      for(let time of ['am', 'pm']) {
        if (t && t[time]) {
          temperatures[i][time] = t[time]
          let [integer_part, decimal_part] = t[time].split('.')
          tempIndexes[i][time] = [
            this.data.temperature_range[0].indexOf(parseInt(integer_part)),
            parseInt(decimal_part)
          ]
        }
        else {
          tempIndexes[i][time] = [0, 0]
          temperatures[i][time] = ''
        }
      }
    }
   
    this.setData({
      memberNum: members.length - 1,
      tempIndexes,
      temperatures,
    })
  },


  
  onShow: function () {

  },
  onUnload: function () {

  },



  //获取位置信息
  getLocation() {
    const that = this
    wx.chooseLocation({
      latitude: 0,
      longitude: 0,
      success(res){
        console.log(res);
        that.setData({
          location:res.name
        })
      }
    })
    
    
  },
  
  changeTemp(e) {
    let {index, time} = e.currentTarget.dataset
    let [i, j] = e.detail.value
    this.setData({
      [`tempIndexes[${index}].${time}`]: [i, j],
      [`temperatures[${index}].${time}`]: this.data.temperature_range[0][i] + this.data.temperature_range[1][j]
    })
  },
  changeNum(e) {
    let num = +e.detail.value + 1
    let {tempIndexes, temperatures} = this.data
    tempIndexes.splice(num)
    temperatures.splice(num)
    while(tempIndexes.length < num) {
      tempIndexes.push({
        am: [0, 0],
        pm: [0, 0]
      })
      temperatures.push({
        am: '',
        pm: ''
      })
    }
    this.setData({
      memberNum: num - 1,
      tempIndexes,
      temperatures
    })
  },
  changeReturnees(e) {
    console.log(e.detail)
    this.setData({
      hasReturneesIndex: e.detail.value,
      hasReturnees: e.detail.value=='1' ? '否' :'是'
    })
  },

  //提交按钮
  submit() {
    for(let temperature of this.data.temperatures) {
      if(temperature.am && temperature.pm) {
        continue
      }
      wx.showToast({
        title: '体温未填完',
        icon: 'none'
      })
      return
    }
    if (!this.data.hasReturnees) {
      wx.showToast({
        title: '是否有回国人员？',
        icon: 'none'
      })
      return
    }
    if (!this.data.location) {
      wx.showToast({
        title: '未获取位置',
        icon: 'none'
      })
      return
    }

    Toast.loading({//弹窗提示
      message: '加载中...',
      forbidClick: true,
      mask:true,
      duration:3000,
    });

  
    let mydate = new Date()//最后提交时间
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
    let temperatures=this.data.temperatures//个人体温
    let members=this.data.memberNum//家庭成员人数
    let location=this.data.location//位置信息
    let hasReturn=this.data.hasReturnees//是否有流动人口
    let id='123'//这里应该根据当前用户是否今天提交过  应该从全局变量钟获取暂时测试用
   
   
    DB.add({
      data:{
          submitTime:str,
          temperatures:temperatures,
          location:location,
          hasReturn:hasReturn,
          id:id,
      },
        success: (res) => {
          console.log("添加成功",res);
          Toast.clear();
          $wuxToptips().success({
            hidden: false,
            text: '提交成功',
            duration: 3000,
            success() {
              wx.switchTab({
                url: '../index/index',
              })
            },
        })
        },
        fail(res){
        
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


    
 }
})