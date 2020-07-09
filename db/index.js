/**
 * Created by DeLL on 2020/7/9.
 */
const  mongoose = require('mongoose');

module.exports = new  Promise((resolve,reject) => {
  mongoose.connect('mongodb://localhost:27017/cabr',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
  mongoose.connection.once('open',err => {
    if(!err){
      console.log('数据库连接成功！！');
      resolve();
    }else {
      console.log(err);
      reject();
    }
  })
})
