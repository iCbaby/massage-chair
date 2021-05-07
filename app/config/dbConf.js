/**
 * @description mongo数据库配置
 * @author 飞翔
 */

// const connectionStr =
//   'mongodb+srv://iCbaby:456123Ab13@cluster0.bppbk.mongodb.net/Cluster0?retryWrites=true&w=majority'

const connectionStr = 'mongodb://10.167.64.40:27017/massage_chair_dev' // 本地测试数据库

// const connectionStr = 'mongodb://10.167.64.40:27017/massage_chair_prod' // 本地生产数据库

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

module.exports = {
  connectionStr,
  mongoConfig
}
