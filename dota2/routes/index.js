var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('uuid');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login/:phone/:pwd',function(req,res){
  var phone = req.params.phone;
  var pwd = req.params.pwd;
  req.models.userMessage.find({},function(err,result){
    var rightBool = true,phoneBool = false;
    result.forEach(function(item){
      if(item.mobile == phone && item.pwd == pwd){
        rightBool = false;
        var q = {
          id:item.id,
          mobile:item.mobile,
          pwd:item.pwd,
          link:uuid.v4()
        };
        if(req.session.users){
          var bool = true;
          req.session.users.forEach(function(sItem){
            if(sItem.mobile == phone){
              bool = false;
              res.json(sItem);
            }
          });
          if(bool){
            req.session.users.push(q);
            res.json(q);
          }
        }else{
          req.session.users = [];
          req.session.users.push(q);
          res.json(q);
        }
      }else if(item.mobile == phone){
        phoneBool = true;
      }
    });
    if(rightBool){
      res.json({id:"",mobile:false});
    }
    if(phoneBool){
      res.json({id:"",mobile:true});
    }
  });
});
router.get('/login/:link',function(req,res){
  var link = req.params.link;
  var users = req.session.users;
  var bool = true;
  if(users){
    for(var i in users){
      if(users[i].link == link){
        bool = false;
        res.json({bool:true,data:users[i]});
      }
    }
    if(bool){
      res.json({bool:false});
    }
  }else{
    res.json({bool:false});
  }
});
router.post('/logout/:cookie',function(req,res){
  var cookie = req.params.cookie;
  var users = req.session.users;
  var bool = true;
  if(users){
    for(var i in users){
      if(users[i].link == cookie){
        bool = false;
        users.splice(i,1);
        res.json({bool:true});
      }
    }
    if(bool){
      res.json({bool:false});
    }
  }
});
router.post('/register',function(req,res){
  var data = req.body;
  var mobile = data.phone,code = data.code;
  cache.get(mobile,function (e,v) {
    if(!e){
      if(v == undefined){
      }else{
        if(v == code){
          //注册执行代码
          appendUser(data,req);
          global.cache.del(mobile);
          res.json(200);
        }else{
          res.json(400);
        }
      }
    }
  });
});

function appendUser(data,req){
  var p = {
    mobile:data.phone,
    pwd:data.password,
    enabled:true
  };
  req.models.userMessage.create(p, function(err, results) {
    if(!err) console.log(err);
    console.log(results);
  });
}
module.exports = router;
