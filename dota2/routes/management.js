/**
 * Created by huangchaohui on 16/4/24.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var url = "http://test.dianjingquan.cn:8080/v1/file/upload";
router.get('/', function(req, res, next) {
  res.render('management');
});
router.get('/file', function(req, res, next) {
  var url = 'http://10.10.50.23:8080/v1/file/upload';
  var filename = path.resolve(__dirname, 'cn.png');
  var formData = {
    // Pass data via Streams
    file: fs.createReadStream(filename)
  };
  request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
    res.render('body');
  });
  console.log(filename);
});
module.exports = router;
