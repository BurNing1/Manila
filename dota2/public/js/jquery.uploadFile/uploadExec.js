/**
 * Created by yy on 2015/1/12.
 */
//上传图片和视频
function uploadOthers(id){
    'use strict';
    var optionsSet = function(type) {
        var opt = {};
        switch (type) {
            case 'image':
                opt.acceptFileTypes = /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i;
                //opt.acceptFileTypes = /(\.|\/)(gif|jpe?g|png)$/i;
                break;
            case 'video':
                opt.acceptFileTypes= /(\.|\/)(avi|wmv|mpg|mp4|mp3)$/i;
                break;
            default :
                break;
        }
        var options = {
            url: '/dimension/upload/'+id+'/file',
            dataType: 'json',
//            formData: {update: type},
//            acceptFileTypes:opt.acceptFileTypes,
            add: function (e, data) {
                var filename = data.originalFiles[0].name;
                var acceptFileTypes = opt.acceptFileTypes;
                //if(data.form[0].action.indexOf('version')>=0 && $("#version").val() == '') {
                //    $("#status").text("* 版本号不能为空").css('display','block');
                //    return false;
                //}
                if(!checkFileType(filename,acceptFileTypes)){
                    return alert("上传的文件格式不正确");
                }
                $("#uploadDiv").attr("disabled","disabled");
                $("#fileProgress").modal('show');
                data.submit();
                //$("#fileProgress").modal('show');
            },
            done: function (e, data) {
                if (data.result == 200) {
                    alert('上传成功');
                    window.location.reload()
                }
            },
            progressall: function (e, data) {
                var t = parseInt(data.loaded / data.total * 100, 10);
                var p = $("#fileProgress").find("#progress");
                $(p).show();
                $(p).find("#progressBar").css('width', t + '%');
                $(p).find("#progressPercent").html(t + '%');
                if (t == 100) {
                    $(p).fadeOut('slow');
                    $("#uploadControl").removeAttr("disabled");
                    $("#fileProgress").modal('hide');
                    //if($(p).data('biaozhi')==="edit-upload"){
                    var url = window.location.href;
                    if(url.indexOf('dimension/edit')>-1){
                        url=url+"&tab=1";
                        window.location.href = url;
                    }else{
                        window.location.reload();
                    }
                }
            }
        };
        return options;
    };
    $("#uploadImage").fileupload(optionsSet('image'));
    $("#uploadVideo").fileupload(optionsSet('video'));
}

//上传文件
function uploadFiles(id){
    var options = {
        url:'/dimension/upload/'+id+'/file',
        dataType: 'json',
        maxFileSize: 5000000,
        autoUpload: true,
        //async:false,
        //acceptFileTypes: /(\.|\/)(pdf|doc?x|exl)$/i,
        maxNumberOfFiles: 5,
        add: function (e, data) {
            var filename = data.originalFiles[0].name;
            var acceptFileTypes = /(\.|\/)(pdf|pptx?|docx?|xlsx?|xps|jpe?g|png|bmp|avi|wmv|mpg|mp4|mp3)$/i;
            if(!checkFileType(filename,acceptFileTypes)){
                return alert("只能上传以下格式的文件：\n文档：pdf，ppt，pptx，doc，docx，xls，xlsx，xps；\n图片：gif，jpg，jpeg，png，bmp；\n音视频：mp3，avi，wmv，mpg，mp4；");
            }
            $("#uploadDiv").attr("disabled","disabled");
            $("#fileProgress").modal('show');
            data.submit();
        },
        done: function (e, data){
            if (data.result.code == 200) {
                //var f = data.result.file;
                //var tmpl = _.template($('#fileItem').html());
                //f.meetingid = id;
                //f.size = filesize(f.size);
                //if(f.status==='success'){
                //    f.status="上传成功";
                //}else{
                //    f.status="上传失败";
                //}
                ////f.name = f.name.substring(0, f.name.lastIndexOf('.'));
                //$('#filesTable').append(tmpl(f));
                //$("#progressComplete").show();
                ////$("tr#" + f._id).find("#progress").show();
                //CheckBoxInitial('fileChkAll', 'file');
            } else if (data.result.code == 404) {
                alert('会议不存在，请刷新页面重试');
            } else {
                alert("未知错误");
            }
        },
        progressall: function (e, data) {
            var t = parseInt(data.loaded / data.total * 100, 10);
            var p = $("#fileProgress").find("#progress");
            $(p).show();
            $(p).find("#progressBar").css('width', t + '%');
            $(p).find("#progressPercent").html(t + '%');
            if (t == 100) {
                $(p).fadeOut('slow');
                $("#uploadControl").removeAttr("disabled");
                $("#fileProgress").modal('hide');
                //if($(p).data('biaozhi')==="edit-upload"){
                var url = window.location.href;
                setTimeout(function(){
                    if(url.indexOf('dimension/edit')>-1){
                        url=url+"&tab=1";
                        window.location.href = url;
                    }else{
                        window.location.reload();
                    }
                },500);

            }
        }
    };
    $("#uploadFile").fileupload(options);
}

function checkFileType(filename,typeRegEx){
    if (filename.length < 4 || typeRegEx.length < 1) return false;
    var filenameParts = filename.split('.');
    if (filenameParts.length < 2) return false;
    var fileExtension = filenameParts[filenameParts.length - 1];
    return typeRegEx.test('.' + fileExtension);
}