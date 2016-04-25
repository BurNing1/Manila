/**
 * Created by huangchaohui on 16/4/23.
 */
$(function(){
  $.get('/management/signState',function(data){
    var signState = $("#signState");
    switch (data){
      case "null":
        signState.text("未开始");
        break;
      case "signStart":
        signState.text("报名开始");
        break;
      case "signStop":
        signState.text("报名结束");
        break;
      case "competeStart":
        signState.text("比赛开始");
        break;
      case "competeStop":
        signState.text("比赛结束");
        break;
      case "signReset":
        signState.text("未开始");
        break;
    }
  });
  $(".state").click(function(){
    switch ($(this).data("state")){
      case "stateStart":
        postState("signStart");
        break;
      case "stateStop":
        postState("signStop");
        break;
      case "competeStart":
        postState("competeStart");
        break;
      case "competeStop":
        postState("competeStop");
        break;
      case "stateReset":
        postState("signReset");
        break;
    }

  });
  $("#fileForm").submit(function(){
    $("#fileForm").ajaxSubmit({
      type: "post",
      url: "",
      success: function (data1) {

      },
      error: function (msg) {

      }
    });
    return false;
  })
});
function postState(type){
  $.post("/management/signState",{state:type},function(data){
    if(data == 200){
      window.location.reload();
    }
  })
}