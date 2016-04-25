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
    $("#_fileForm").ajaxSubmit({
      type: "post",
      url: "",
      success: function (data1) {
        var remsg = data1.split("|");
        var name = remsg[1].split("\/");
        if (remsg[0] == "1") {
          var type = name[4].substring(name[4].indexOf("."), name[4].length);
          //$("#msg").html("文件名：" + name[name.length - 1] + "   ---  " + remsg[2]);
          switch (type) {
            case ".jpg":
            case ".jpeg":
            case ".gif":
            case ".bmp":
            case ".png":
              $("img").attr({ "src": remsg[1] });
              break;
            default:
              $("img").attr({ "src": "project/Images/msg_ok.png" });
              break;
          }
        } else {
          //$("#msg").html("文件上传失败：" + remsg[2]);
          //$("img").attr({ "src": "project/Images/msg_error.png" });
        }
      },
      error: function (msg) {
        alert("文件上传失败");
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