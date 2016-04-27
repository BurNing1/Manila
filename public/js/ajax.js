/**
 * Created by HDRorz on 2016-4-7.
 */

var countdown;

function validator(input) {
    var type = input.name;
    var value = input;
    if(input.name == "")
    {
        return;
    }
    switch (input.name) {
        case 'mobile':
            if(input.value.length == 0 || input.value.match(/^1[3|4|5|8][0-9]\d{8}$/) != input.value) {
                appendErrmsg(input.parentNode.parentNode.tagName == 'LI' ? input.parentNode.parentNode : input, '错误的手机号码');
            }
            else {
                $(input.parentNode.parentNode).find('.err').remove();
            }
            break;
        case 'pwd':
            if(input.value.length == 0 ||
                input.value.match(/^[0-9A-Za-z]{6,12}$/) != input.value) {
                appendErrmsg(input.parentNode.parentNode.tagName == 'LI' ? input.parentNode.parentNode : input, '不符合规则的密码');
            }
            else {
                $(input.parentNode.parentNode).find('.err').remove();
            }
            break;
        case 'pwd2':
            if(input.value.length == 0 ||
                input.value.match(/^[0-9A-Za-z]{6,12}$/) != input.value ||
                input.value != $(input.parentNode.parentNode.parentNode).find('[name=pwd]')[0].value) {
                appendErrmsg(input.parentNode.parentNode.tagName == 'LI' ? input.parentNode.parentNode : input, '重复密码错误');
            }
            else {
                $(input.parentNode.parentNode).find('.err').remove();
            }
            break;
        case 'code':
            if(input.value.length == 0 || input.value.match(/^\d{4}$/) != input.value) {
                appendErrmsg(input.parentNode.parentNode.tagName == 'LI' ? input.parentNode.parentNode : input, '验证码格式不对');
            }
            else {
                $(input.parentNode.parentNode).find('.err').remove();
            }
            break;
        default:
            return
    }
}

function ajaxError(xhr, msg, ex) {
    alert(msg);
}


function appendErrmsg(selector, msg) {
    $(selector).find('.err').remove();
    $(selector).append('<p class="err"><i></i><span>' + msg + '</span></p>');
}

function prependErrmsg(selector, msg) {
    $(selector).find('.err').remove();
    $(selector).prepend('<p class="err"><i></i><span>' + msg + '</span></p>');
}

function loginSubmit() {
    ajaxPost('auth/login', $('#login_form').serialize(), '#login_form');
}

function sendCD(selector) {
    var lock = $(selector).parent().find('.lock');
    var delay = 60;
    $(selector).hide();
    lock.show();
    lock.text(delay + '秒后重新发送');
    countdown = setInterval(
        function(){
            delay--;
            lock.text(delay + '秒后重新发送');
            if(delay == 0) {
                clearInterval(countdown);
                lock.hide();
                $(selector).show();
            }
        },
        1000
    );
}

function clearCD() {
    clearInterval(countdown);
    $('li .code a').show();
    $('.lock').hide();
}

function sendCode(selector) {
    sendCD(selector);
    ajaxPost(
        'auth/sendCode',
        'mobile='+$(selector).parent().find('[name=mobile]').attr('value'),
        selector
    );
}

function registerSubmit() {
    ajaxPost('auth/register', $('#register_form').serialize(), '#register_form');
}

function stepNext(selector, step) {
    $(selector + step.toSource()).hide();
    $(selector + (step + 1).toString()).show();
}

function stepPrev(selector, step) {
    $(selector + step.toSource()).show();
    $(selector + (step - 1).toString()).show();
}