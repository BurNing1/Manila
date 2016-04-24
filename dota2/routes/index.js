var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var uuid = require('uuid');
//var mysql = require('../utils/mysql');
//mysql.connect();
//mysql.useTable("sign_state");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/register',function(req,res){
  var data = req.body;
  var mobile = data.phone,code = data.code,password = data.password;
  cache.get(mobile,function (e,v) {
    if(!e){
      if(v == undefined){
      }else{
        if(v == code){
          //注册执行代码
          appendUser(data);
          global.cache.del(mobile);
        }else{
          console.log(222);
        }
      }
    }
  });
});
router.post('/signState',function(req,res){
  var state = req.body.state;
  console.log(state);
});
router.get('/signState',function(req,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.render("sign",{state:"none"});
});
function appendUser(data){

}
module.exports = router;
