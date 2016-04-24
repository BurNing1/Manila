var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
//var mysql = require('../utils/mysql');
//mysql.connect();
//mysql.useTable("sign_state");
/* GET home page. */
router.get('/', function(req, res, next) {
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
