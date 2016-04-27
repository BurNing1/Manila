/**
 * Created by tommy on 2016/4/24.
 */
var express = require('express');
var router = express.Router();
var uuid = require('uuid');

router.get('/', function(req, res, next) {
    res.render('enroll',{round:req.query.round});
});

router.post('/',function(req,res){
    var cookie = req.session.users;
    if(cookie){
        cookie.forEach(function(item){
            if(item.link == req.body.uid){
                var date = new Date();
                var p = {
                    uid:item.id,
                    battle_name:req.body.battle_name,
                    player1:req.body.player1,
                    player2:req.body.player2,
                    player3:req.body.player3,
                    player4:req.body.player4,
                    player5:req.body.player5,
                    player6:req.body.player6,
                    mobile:req.body.mobile,
                    round:req.body.round,
                    enable:false,
                    add_time:date
                };
                req.models.enroll.create(p, function(err, results) {
                    if(err){
                        console.log(err);
                        res.json({code:400});
                    }else{
                        res.json({code:200});
                    }
                });
            }
        });
    }
});


module.exports = router;