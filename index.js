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

app.post('/register',async (request,response) => {
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
  const passwordReg = /^[[A-Za-z0-9_]{6,20}$/;
  const emailReg = /^[A-Za-z0-9_]{3,11}@[A-Za-z0-9_]{2,6}\.com$/;

  if(!userNameReg.test(userName)){
      response.send('用户名可以包含英文字母、数字、下划线，长度为5-16');
      return;
  }else if(!passwordReg.test(password)){
      console.log(request.body);
      response.send('密码可以包含英文字母、数字、下划线，长度为6-20');
      return;
  }else if(password !== repeatPassword){
      response.send('两次密码输入不一致，请重新输入');
      console.log(response.body);
      return;
  }else if(!emailReg.test(email)){
      response.send('邮箱格式不正确');
      return;
  }
  //3.查询数据库用户名是否已存在，若是存在返回，若是不存在执行下一步
  try{
    const user = await users.findOne({userName});
    if(user){
      //用户名存在
      response.send('用户已存在，请重新注册');
    }else {
      //成功在数据库中保存
      await users.create({userName,password,email});
      response.send('注册成功！')
    }

  }catch (e){
    console.log(e);
    response.send('网络不稳定，请刷新重试！！')
  }
});
app.post('/login',async(request,response) => {
  /*
  * 1.获取数据
  * 2.查看数据的格式是否符合要求
  * 3.查看数据库中是否存在该用户
  * 4.对比用户名和密码
  * 5.成功登陆
  * */
  const {userName,password} = request.body;
  console.log(userName,password);
  const userNameReg = /^[A-Za-z0-9_]{5,16}$/;
  const passwordReg = /^[[A-Za-z0-9_]{6,20}$/;
  if(!userNameReg.test(userName)){
    response.send('用户名或密码错误！！');
    return;
  }else if (!passwordReg.test(password)){
    response.send('用户名或密码错误！！')
    return;
  }
  try {
    const user = await users.findOne({userName});
    console.log(user);
    if (user.userName == userName && user.password == password) {
      response.send('登陆成功');
    } else {
      response.send('用户名错误！！！')
    }
  }catch(e){
    console.log(e);
    response.send('网络不稳定，请刷新重试')
  }


})




app.listen(3000,err => {
  if(!err) console.log('服务器启动成功！！');
  else console.log(err);
})