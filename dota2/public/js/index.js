/**
 * Created by huangchaohui on 16/4/23.
 */
$(function(){
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
  $("#imageForm").submit(function(){
    console.log($(this));
    var files = $(this);
    $.ajax({
      data:{file:files},
      url: '/management/file',
      type: 'post',
      async: false,
      success: function (data) {
        console.log(data);
      }
    });
  })
});
function postState(type){
  $.post("/management/signState",{state:type},function(data){
    if(data == 200){
      window.location.reload();
    }
  })
}