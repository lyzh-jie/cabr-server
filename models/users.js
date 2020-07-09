/**
 * Created by DeLL on 2020/7/9.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  userName:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:Schema.Types.Mixed,
    required:true,
    default:'123'
  },
  email:{
    type:String,
    required:true
  }
})
const Users = mongoose.model('users',usersSchema);
module.exports = Users;