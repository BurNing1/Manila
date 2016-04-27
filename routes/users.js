var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var s = {
  code:"",
  msg:""
};

router.get('/code/:mobile',function (req, res, next) {
  var mobile = req.params.mobile;
  var code = parseInt((Math.random() * 9000 + 1000),10);
  req.models.user.count({mobile:mobile}, function(err, count) {
    if(err) console.log(err);
    if(count > 0){
      console.log("[" + mobile + "]:该手机号已经注册过。");
      res.json("该手机号已经注册过。");
    }else {
      request.post(config.sms_url, {form:{
        account:config.sms_account,
        password:config.sms_password,
        mobile:mobile,
        content:config.sms_template.replace("变量",code)
      }}, function (e, r, body) {
        if(!e && r.statusCode == 200){
          s.code = body.split('<code>')[1].split("</code>")[0];
          if(s.code == '2'){
            cache.set(mobile,code,1000 * 60);
          }
          else res.send(body); }
        else { res.send(e); }
      });
    }
  });
});

router.get('/forget/code/:mobile',function (req, res, next) {
  var mobile = req.params.mobile;
  var code = parseInt((Math.random() * 9000 + 1000),10);
  req.models.user.count({mobile:mobile}, function(err, count) {
    if(err) console.log(err);
    if(count == 0){
      console.log("[" + mobile + "]:该手机号未注册过。");
      res.json("该手机号未注册过。");
    }else {
      request.post(config.sms_url, {form:{
        account:config.sms_account,
        password:config.sms_password,
        mobile:mobile,
        content:config.sms_template.replace("变量",code)
      }}, function (e, r, body) {
        if(!e && r.statusCode == 200){
          s.code = body.split('<code>')[1].split("</code>")[0];
          if(s.code == '2'){
            cache.set(mobile,code,1000 * 60);
          }
          else res.send(body); }
        else { res.send(e); }
      });
    }
  });
});

router.get('/form/:id',function(req,res){
  req.models.enroll.find({ uid: req.params.id }, function (err, match) {
    if(err){
      console.log(err);
    }else{
      var round = {
        round1:false,
        round2:false
      };
      for(var i in match){
        if(match[i].round == 1){
          round.round1 = true;
        }else if(match[i].round == 2){
          round.round2 = true;
        }
      }
      res.json(round);
    }
  })
});

router.post('/resetPwd',function(req,res){
  var mobile = req.body.phone;
  var pwd = req.body.pwd;
  req.models.user.find({mobile:mobile}, function(err, result) {
    if(err){
      console.log(err);
    }else{
      result[0].pwd = pwd;
      result[0].save(function (err) {
        if(err){
          console.log(err);
        }else{
          res.json({code:200})
        }
      });
    }
  })
});

module.exports = router;
