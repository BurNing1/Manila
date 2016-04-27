/**
 * Created by huangchaohui on 16/4/26.
 */
var fs = require('fs');

var file = {
  delFile:function(route){
    fs.readdir(dirname+route, function(err,files){
      for(var i = 0 ; i < files.length; i ++){
        del(dirname+route+"/"+files[i])
      }
    });
    function del(file){
      fs.unlink(file, function(err){
        fs.exists(file, function(exists){
        });
      });
    }
  }
};
module.exports = file;