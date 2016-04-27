/**
 * Created by huangchaohui on 16/4/24.
 */
var express = require('express');
var router = express.Router();
var url = global.config.test_file_url;
var helper = require("../utils/helper");
var formidable = require('../utils/formidableUpload');
var fileFunc = require('../utils/file');
var request = require('request');
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
  req.models.enroll.find(function (e,result) {
    if(e != null) console.log(e);
    res.render('management',{enrolls:result});
  });
});

router.post('/signState',function(req,res){
  var state = req.body.state;
  var round = req.body.round;
  req.models.match.find({ id: 1 }, function (err, match) {
    if(err){
      console.log(err);
    }else{
      if(round == 1){
        match[0].round1 = state;
      }else{
        match[0].round2 = state;
      }
      match[0].save(function(err){
        if(err){
          console.log(err);
          res.json(400);
        }else{
          res.json(200);
        }
      })
    }
  })
});

router.get('/signState',function(req,res){
  req.models.match.find({id:1},function(err,result){
    res.json(result[0].round1);
  });
});

router.get('/signState2',function(req,res){
  req.models.match.find({id:1},function(err,result){
    res.json(result[0].round2);
  });
});

router.post("/uploadfile",function(req,res){
  var fileRoot = __dirname.split("\\");
  var len = fileRoot.length;
  var fileName = "";
  for(var i = 0;i<len-1;i++){
    fileName += fileRoot[i] + "\\";
  }
  fileName += "resource";
  formidable.upload(req, fileName, function (err, file, data) {
    if (err) return res.json({code: 500});

    if(path.extname(file.name) != '.png') {
      fileFunc.delFile("/resource");
      return res.json({code: 400,err:'只支持png格式的图片'});
    }

    if(file.size > 5200000) {
      fileFunc.delFile("/resource");
      return res.json({code: 400,err:'上传的图片不能大于5M'});
    }

    var formData = {
      file: fs.createReadStream(file.path)
    };

    request.post({url:url, formData:formData}, function optionalCallback(err, httpResponse, body) {
      fileFunc.delFile("/resource");
      var p = JSON.parse(httpResponse.body);
      req.models.match.find({ id: 1 }, function(err, result) {
        if(err){
          console.log(err);
        }else{
          result[0].vs_id = p.file_id;
          result[0].vs_url = p.path;
          result[0].save(function (err) {
            if(err){
              console.log(err);
            }else{
              return res.json({code:200,data:p});
            }
          });
        }
      })
    });
  });
});

module.exports = router;
