/**
 * Created by tommy on 2016/4/24.
 */
var express = require('express');
var router = express.Router();
var uuid = require('uuid');
router.get('/', function(req, res, next) {
    res.render('enroll');
});
router.post('/',function(req,res){
    var date = new Date();
    var p = {
        uid:uuid.v4(),
        battle_name:req.body.battle_name,
        steam_id:req.body.battle_id,
        mobile:req.body.mobile,
        qq:req.body.qq,
        wechat:req.body.wechat,
        enable:false,
        add_time:date
    };
    console.log(p);
    req.models.enroll.create(p, function(err, results) {
        if(!err) console.log(err);
        console.log(results);
    });
});
module.exports = router;