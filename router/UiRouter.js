/**
 * Created by DeLL on 2020/7/9.
 */
const express = require('express');
const {resolve} = require('path');
const router = new express.Router();
router.get('/login',(req,res) => {
  const fileName = resolve(__dirname,'../public/login.html');
  res.sendfile(fileName);
})
router.get('/register',(req,res) => {
  const fileName = resolve(__dirname,'../public/register.html');
  res.sendfile(fileName);
})
module.exports = router;