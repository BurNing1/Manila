/**
 * Created by huangchaohui on 16/4/23.
 */
$(function(){
  $("#stateStart").click(function(){
    $.post("/signState",{state:"start"},function(data){
      if(data == 200){
        window.location.reload();
      }
    })
  })
});