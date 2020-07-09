/**
 * Created by DeLL on 2020/7/8.
 */
const express = require('express');
const db = require('./db');
const users = require('./models/users');

const uiRouter = require('./router/UiRouter');
const userRouter = require('./router/UserRouter');

const app = express();

//通过内置中间件暴露出去静态资源
app.use(express.static('public'));
//通过内置中间件解析请求体内容
app.use(express.urlencoded({extended:true}));


app.use(uiRouter);
app.use(userRouter);
app.listen(3000,err => {
  if(!err) console.log('服务器启动成功！！');
  else console.log(err);
})