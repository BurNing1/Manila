/**
 * Created by huangchaohui on 16/4/24.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var url = "http://test.dianjingquan.cn:8080/v1/file/upload";
router.get('/', function(req, res, next) {
  var req1 = request.post(url, function (err, resp, body) {
    if (err) {
      console.log('Error!');
    } else {
      console.log('URL: ' + body);
    }
  });
  var form = req1.form();
  form.append('file', fs.createReadStream("/Users/huangchaohui/"));
  res.render('management');
});
module.exports = router;
