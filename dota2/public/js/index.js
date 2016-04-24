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