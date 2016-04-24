/**
 * Created by huangchaohui on 16/4/23.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign_up');
});
router.post('/',function(req,res){
  console.log(req.body);
  var mobile = '13482232023';
  var code = '1234';
  global.cache.get(mobile,function (e,v) {
    if(!e){
      if(v == undefined){
        // 验证码过期处理代码
      }else{
        if(v == code){
          //注册执行代码
          global.cache.del(mobile)
        }
      }
    }
  }) 

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(200)
});
module.exports = router;