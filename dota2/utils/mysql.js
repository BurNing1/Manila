/**
 * Created by huangchaohui on 16/4/24.
 */
var mysql = require('mysql');
var client = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user: 'root',
  password: ''
});
var sql = {
  connect: function(){
    client.connect();
    client.query('create database malaysia', function(error, result) {
      if(error) {
        console.log('Error: ' + error.message);
      }
    });
    client.query('use malaysia');
  },
  useTable: function(type){
    client.query('show tables',function(err,result){
      if(!err){
        var bool = true;
        for(var i in result){
          if(type == result[i].Tables_in_malaysia){
            bool = false
          }
        }
        if(bool){
          client.query('create table '+type+' (name VARCHAR(20),state VARCHAR(20))',function(err){
            if(err){
            }
          });
          client.query('insert into '+type+' values("state","undetermined")')
        }else{
          client.query('select * from '+type,function(err,result){
            console.log(result);
            if(result.length === 0){
              client.query('insert into '+type+' values("state","undetermined")')
            }
          })
        }
      }
    });
  },
  insert: function(type,data){

  }
};
module.exports = sql;