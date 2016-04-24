var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('uuid');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index');
});
router.get('/getSession',function(req,res){
  req.models.userMessage.find({},function(err,result){
    res.json(result);
  });
});
router.post('/register',function(req,res){
  var data = req.body;
  var mobile = data.phone,code = data.code;
  cache.get(mobile,function (e,v) {
    if(!e){
      if(v == undefined){
      }else{
        if(v == code){
          //注册执行代码
          appendUser(data,req);
          global.cache.del(mobile);
          res.json(200);
        }else{
          res.json(400);
        }
      }
    }
  });
});

function appendUser(data,req){
  var p = {
    mobile:data.phone,
    pwd:data.password,
    enabled:true
  };
  console.log(p);
  req.models.userMessage.create(p, function(err, results) {
    if(!err) console.log(err);
    console.log(results);
  });
}
module.exports = router;
