/**
 * Created by huangchaohui on 16/4/24.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var url = global.config.test_file_url;

router.get('/', function(req, res, next) {
  //enroll count
  //req.models.enroll.count(function (e,result) {
  //  if(e != null) console.log(e);
  //  console.log(result);
  //});
  req.models.enroll.find(function (e,result) {
    if(e != null) console.log(e);
    res.render('management',{enrolls:result});
  });

});

router.post('/signState',function(req,res){
  var state = req.body.state;
  req.models.match.find({ id: 1 }, function (err, match) {
    if(err){
      console.log(err);
    }else{
      match[0].status = state;
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
    res.json(result[0].status);
  });
});

module.exports = router;
