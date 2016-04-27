/**
 * Created by huangchaohui on 16/4/23.
 */
function SetMatchStatus(target,data) {
  switch (data) {
    case "null":
      target.text("未开始");
      break;
    case "signStart":
      target.text("报名开始");
      break;
    case "signStop":
      target.text("报名结束");
      break;
    case "competeStart":
      target.text("比赛开始");
      break;
    case "competeStop":
      target.text("比赛结束");
      break;
    case "signReset":
      target.text("未开始");
      break;
  }
}

$(function() {
  uploadOthers();
  $.get('/management/signState', function (data) {
    SetMatchStatus($("#signState"), data);
  });
  
  $.get('/management/signState2', function (data) {
    SetMatchStatus($("#signState2"), data);
  });
  
  $(".state").click(function () {
    switch ($(this).data("state")) {
      case "stateStart":
        postState("signStart",1);
        break;
      case "stateStop":
        postState("signStop",1);
        break;
      case "competeStart":
        postState("competeStart",1);
        break;
      case "competeStop":
        postState("competeStop",1);
        break;
      case "stateReset":
        postState("signReset",1);
        break;
    }
  });
  $(".state2").click(function () {
    switch ($(this).data("state")) {
      case "stateStart":
        postState("signStart",2);
        break;
      case "stateStop":
        postState("signStop",2);
        break;
      case "competeStart":
        postState("competeStart",2);
        break;
      case "competeStop":
        postState("competeStop",2);
        break;
      case "stateReset":
        postState("signReset",2);
        break;
    }
  });
  $("#fileForm").submit(function () {
    $("#fileForm").ajaxSubmit({
      type: "post",
      url: "",
      success: function (data1) {
      }
    });
  });
});

function postState(type,round){
  $.post("/management/signState",{state:type,round:round},function(data){
    if(data == 200){
      window.location.reload();
    }
  })
}