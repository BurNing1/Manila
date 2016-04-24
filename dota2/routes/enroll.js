/**
 * Created by tommy on 2016/4/24.
 */
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('enroll');
});
module.exports = router;