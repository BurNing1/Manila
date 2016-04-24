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
  //console.log(config.sms_url);
  //var req = config.sms_url + "&account=" + config.sms_account + "&password=" + config.sms_password + "&mobile=" + mobile +
  //    "&content=" + config.sms_template.replace("变量",code);
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
        res.send(r.statusCode);
      } 
      else res.send(body); }
    else { res.send(e); }
  });
});
module.exports = router;
