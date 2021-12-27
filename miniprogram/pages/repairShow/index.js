
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';//弹窗

Page({


  data: {
    new:false,
   
    active: 0,//索引选择器
    repairDataAll:[],
    repairData1:[],
    repairData2:[],
    repairData3:[],
  },
  //tabs切换绑定事件
  tabOnClick(event) {
    let that=this;
    // if(event.detail.name){
     // console.log(event.detail.name); 
    // }
   
  
   
  },

  //初始化查询并分类数据函数
  dataQuery(){
     //  云函数调用查询修理信息
     wx.cloud.callFunction({
      name:"getRepairInfo",
      data:{
        _openid:'ocqK85eRrDIoQK9eGvOueteQHfrU',
      },
    })
    .then(
      res=>{console.log("查询物业报修成功,进入数据处理部分",res);
      this.setData({
        repairDataAll:res.result.data
      })
      //处理分类数据
      var repair_data1=[];//待处理
      var repair_data2=[];//处理中
      var repair_data3=[];//已完成
      let repair_dataAll=this.data.repairDataAll;
      for(var i=0;i<repair_dataAll.length;i++){
         if(repair_dataAll[i].state=='待处理'){
           repair_data1.push(repair_dataAll[i]);
         }
         else if(repair_dataAll[i].state=='处理中'){
          repair_data2.push(repair_dataAll[i]);
        }
        else if(repair_dataAll[i].state=='已完成'){
          repair_data3.push(repair_dataAll[i]);
        }
      }
      this.setData({
       repairData1:repair_data1,
       repairData2:repair_data2,
       repairData3:repair_data3
      })
      Toast.clear();
     
      
    })
    .catch(res=>{console.log('查询物业报修失败！！！',res);})
  },
 
  onLoad: function (options) {
    let that=this;
    Toast.loading({//弹窗提示
      message: '加载中...',
      forbidClick: true,
      mask:true,
      duration:6000,
    });
    

      that.dataQuery(); 
  },

    // 预览图片
    handlePreviewImage(e){
      // 1 先构造 要预览的图片数组
      // //2 接收传递过来的图片url
      const current=e.currentTarget.dataset.url;
      if(current!=0){
        wx.previewImage({
          current,
          urls:e.currentTarget.dataset.url,
        });
      }
     
    }    ,
    

  //添加报修
  add(){
    
    wx.navigateTo({
      url: '../propertyMaintenance/index',
    })
  }
 
})