/**
 * Created by huangchaohui on 16/4/23.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign_up');
});
router.post('/',function(req,res){
  console.log(req.body);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(200)
});
module.exports = router;