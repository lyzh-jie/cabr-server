/**
 * Created by DeLL on 2020/7/8.
 */
const express = require('express');
const db = require('./db');
const users = require('./models/users');


const app = express();

//通过内置中间件暴露出去静态资源
app.use(express.static('public'));
//通过内置中间件解析请求体内容
app.use(express.urlencoded({extended:true}));

app.post('/register',(request,response) => {
  /*
  * 1.接收请求数据
  * 2.验证请求数据的格式
  * 3.查询数据库用户名是否已存在，若是存在返回，若是不存在执行下一步
  * 4.将数据存入数据库中保存
  * 5.返回响应
  *
  * */
  //1.接收请求数据
  const {userName,password,repeatPassword,email} = request.body;
  //2.验证请求数据的格式
  const userNameReg = /^[A-Za-z0-9_]{5,16}$/;
  const passwordReg = /^[[A-Za-z0-9_]{6,20}]$/;
  const emailReg = /^[A-Za-z0-9_]{3,8}@[A-Za-z0-9_]{2,6}\.com$/;

  if(userNameReg(userName)){

  }
  //3.将数据存入数据库中保存

  console.log(request.body);
  response.send('register');
});
app.post('/login',(request,response) => {
  console.log(request.body);
  response.send('login');
})




app.listen(3000,err => {
  if(!err) console.log('服务器启动成功！！');
  else console.log(err);
})