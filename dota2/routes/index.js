var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var helper = require('../utils/helper');


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
module.exports = router;
