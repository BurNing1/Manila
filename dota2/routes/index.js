var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var mysql = require('../utils/mysql');
mysql.connect();
mysql.useTable("sign_state");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/image',function(req,res) {
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = "uploads/images/";
  form.keepExtensions = true;
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.parse(req, function(err, fields, files) {
    console.log(files)
  });
  res.render('index');
});
router.post('/signState',function(req,res){
  var state = req.body.state;
  console.log(state);
});
router.get('/signState',function(req,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.render("sign",{state:"none"});
});
module.exports = router;
