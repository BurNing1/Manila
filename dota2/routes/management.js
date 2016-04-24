/**
 * Created by huangchaohui on 16/4/24.
 */
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('management');
});
module.exports = router;
