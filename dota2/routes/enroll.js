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
        uid:req.body.uid,
        battle_name:req.body.battle_name,
        steam_id:req.body.battle_id,
        mobile:req.body.mobile,
        qq:req.body.qq,
        wechat:req.body.wechat,
        enable:false,
        add_time:date
    };
    req.models.enroll.create(p, function(err, results) {
        if(!err){
            console.log(err);
            res.json(400);
        }else{
            res.json(200);
        }
    });
});
module.exports = router;