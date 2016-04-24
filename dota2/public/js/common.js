/**
 * Created by yy on 2015/1/26.
 */
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.trimAll=function(){
    return this.replace(/(\s)/g, "");
};

$.fn.errorShow = function(message){
    var t = $(this).html(message);
    t.fadeIn();
    setTimeout(function(){
        t.fadeOut();
    },3000);
};


$(function(){
  var height = document.body.offsetHeight;
  $("#contain").css("height",height-71);
});
function setMenu(id){
    $("#"+id).addClass("bg-color");
}

function getCurrIp(){
  var url = window.location.href;
  return url.split('/')[2].split(':')[0];
}

function CheckBoxInitial(allId,subId) {
    var chklist = $("input[id^='" + subId + "']");
//    var checkfault = $("input[id^='" + subId + "']:checkbox");
    var checkfault = $("input:checkbox");
    checkfault.each(function () {
        $(this).prop("checked", false);
    });
    $("#" + allId).click(function () {
        var value = $("#" + allId).prop("checked");
        value = value == undefined ? false : value;
        chklist.each(function () { $(this).prop("checked", value); });
    });

    chklist.each(function () {
        $(this).click(function () {
            $("#" + allId).prop("checked", $(this).prop("checked"));
            chklist.each(function (index) {
                $("#" + allId).prop("checked", ($("#" + allId).prop("checked") && chklist.eq(index).prop("checked")) ? true : false);
            });
        });
    });
}

function CheckBoxInitial2(allId,subId) {
    var chklist = $("input[id^='" + subId + "']");
//    var checkfault = $("input[id^='" + subId + "']:checkbox");
//    var checkfault = $("input:checkbox");
//    checkfault.each(function () {
//        $(this).prop("checked", false);
//    });
    $("#" + allId).click(function () {
        var value = $("#" + allId).prop("checked");
        value = value == undefined ? false : value;
        chklist.each(function () { $(this).prop("checked", value); });
    });

    chklist.each(function () {
        $(this).click(function () {
            $("#" + allId).prop("checked", $(this).prop("checked"));
            chklist.each(function (index) {
                $("#" + allId).prop("checked", ($("#" + allId).prop("checked") && chklist.eq(index).prop("checked")) ? true : false);
            });
        });
    });
}

function forward(url){
    window.location.href=url;
}

function setGuidHeader(name){
    $(".guideHeader").find("div[id^='guide']").removeClass('active');
    $(".guideHeader").find("div[id="+name+"]").addClass('active');
}
function d(config,cb){
    $.ajax({
        url:config.url,
        data:config.data,
        type:'delete',
        dataType:'json',
        async:false,
        success:function(data){
            if(config.mid){cb(config.mid,data);}
            else cb(data);
        }
    })
}

function postMeeting(mid){
    $.ajax({
        url:'/dimension/complete/'+mid,
        type:'post',
        dataType:'json',
        async:false,
        success:function(data){
            alert("配置完成！")
        }
    })
}

function liCheckBoxInitial(str) {
    var chklist = $("ul."+str+" input[id^='member']");
    console.log(str);
    console.log(chklist);
//    var checkfault = $("input[id^='" + subId + "']:checkbox");
    var checkfault = $("input:checkbox");
    checkfault.each(function () {
        $(this).prop("checked", false);

    });
    var allchk = "#" + str + "Chk";
    $(allchk).click(function () {
        var value = $(allchk).prop("checked");
        value = value == undefined ? false : value;
        var chklist1 = $("ul."+str+" input[id^='member']");
        chklist1.each(function () { $(this).prop("checked", value); });
    });

    chklist.each(function () {
        $(this).unbind('click').bind('click',function () {
            $(allchk).prop("checked", $(this).prop("checked"));
            chklist.each(function (index) {
                $(allchk).prop("checked", ($(allchk).prop("checked") && chklist.eq(index).prop("checked")) ? true : false);
            });
        });
    });
}