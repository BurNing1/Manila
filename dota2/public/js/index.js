/**
 * Created by huangchaohui on 16/4/23.
 */
$(function(){
  $('#add').submit(function(){
    var data = new FormData($('#add')[0]);
    console.log(data);
  });
});