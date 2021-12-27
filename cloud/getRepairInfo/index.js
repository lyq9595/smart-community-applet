// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "你的云环境id"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("1repair")
  .where(
    {
      _openid:event._openid,
     
    },
  )
  .get();
}