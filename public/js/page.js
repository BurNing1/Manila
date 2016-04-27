//首页
$(function(){
	$.get('/management/signState',function(data){
		var progress = $("#progress");
		var tab = $('.competitionMain .pageTab a:eq(1)');
		switch (data){
			case null:
				progress.css("width","0");
				$("li[id*='s1']").addClass("now");
				$("i[id*='i1']").addClass("t1");
				$("#signBool .t1").css("display","block");
				break;
			case "signStart":
				progress.css("width","25%");
				$("li[id*='s2']").addClass("now");
				$("i[id*='i2']").addClass("t1");
				$("#signBool .t4").css("display","block");
				break;
			case "signStop":
				progress.css("width","50%");
				$("li[id*='s3']").addClass("now");
				$("i[id*='i3']").addClass("t1");
				$("#signBool .t1").css("display","block");
				tab.css("display","block");
				break;
			case "competeStart":
				progress.css("width","75%");
				$("li[id*='s4']").addClass("now");
				$("i[id*='i4']").addClass("t1");
				$("#signBool .t1").css("display","block");
				tab.css("display","block");
				break;
			case "competeStop":
				progress.css("width","100%");
				$("li[id*='s5']").addClass("now");
				$("i[id*='i5']").addClass("t1");
				$("#signBool .t1").css("display","block");
				tab.css("display","block");
				break;
			case "signReset":
				progress.css("width","0");
				$("li[id*='s1']").addClass("now");
				$("i[id*='i1']").addClass("t1");
				$("#signBool .t1").css("display","block");
				break;
		}
	});
	$.get('/management/signState2',function(data){
		var progress = $("#progress2");
		var tab = $('.competitionMain .pageTab a:eq(1)');
		switch (data){
			case null:
				progress.css("width","0");
				$("li[id*='p1']").addClass("now");
				$("i[id*='q1']").addClass("t1");
				$("#signBool2 .t1").css("display","block");
				break;
			case "signStart":
				progress.css("width","25%");
				$("li[id*='p2']").addClass("now");
				$("i[id*='q2']").addClass("t1");
				$("#signBool2 .t4").css("display","block");
				break;
			case "signStop":
				progress.css("width","50%");
				$("li[id*='p3']").addClass("now");
				$("i[id*='q3']").addClass("t1");
				$("#signBool2 .t1").css("display","block");
				tab.css("display","block");
				break;
			case "competeStart":
				progress.css("width","75%");
				$("li[id*='t4']").addClass("now");
				$("i[id*='q4']").addClass("t1");
				$("#signBool2 .t1").css("display","block");
				tab.css("display","block");
				break;
			case "competeStop":
				progress.css("width","100%");
				$("li[id*='p5']").addClass("now");
				$("i[id*='q5']").addClass("t1");
				$("#signBool2 .t1").css("display","block");
				tab.css("display","block");
				break;
			case "signReset":
				progress.css("width","0");
				$("li[id*='p1']").addClass("now");
				$("i[id*='q1']").addClass("t1");
				$("#signBool2 .t1").css("display","block");
				break;
		}
	});
	checkSession();
	checkInput();
	//发送验证码
	$("#sendVerificationCode").click(function(){
		$(this).css("display","none");
		$("#showTime").css("display","inline-block");
		sendCD("#showTime");
		var num = $("#phoneNum").val();
		$.get("/users/code/"+num)
	});
	$("#sendCode").click(function(){
		$(this).css("display","none");
		$("#showSend").css("display","inline-block");
		sendCD("#showSend");
		var num = $("#findPhone").val();
		$.get("/users/forget/code/"+num)
	});
	//提交注册表
	$("#register").click(function(){
		var num = $("#phoneNum").val();
		var code = $("#code").val();
		var password = $("#password").val();
		var result = testRegister("register");
		var warning = $("#warning");
		if(result){
			$.post("/register",{phone:num,code:code,password:password},function(data){
				if(data.code == 200){
					autoLogin(num,password);
				}else{
					alert("验证码错误");
				}
			});
		}else{
			warning.css("display","block");
			warning.children("span").text("请填完正确有效信息");
		}
	});
	//登录
	$("#login").unbind("click").bind("click",function(){
		login();
	});
	$("#logout").click(function(){
		if(confirm("确认注销?")){
			var cookie = document.cookie;
			$.post('/logout/'+cookie,function(data){
				if(data.bool){
					delCookie();
					window.location.reload();
				}
			});
		}
	});
	//跳转
	findPwd();
	var indexBanner = new Swiper('.topBanner .swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
	
	var indexGameList = new Swiper('.indexGameList .swiper-container', {
        paginationClickable: true,
				nextButton: '.indexGameList .btnR',
        prevButton: '.indexGameList .btnL',
		onInit: function(swiper){
			var step='<p class="step"><span></span></p>';
			$('.indexGameList').append(step);
			$('.indexGameList .step span').css('width',((swiper.activeIndex+1)/swiper.slides.length)*100+'%');
		},
		onSlideChangeStart: function(swiper){
			$('.indexGameList .step span').animate({'left':((swiper.activeIndex)/swiper.slides.length)*100+'%'},100);
		}
    });
	
	$('.login').click(function(){
		$('.re_fPageBg').show();
		$('.f_login').show();
		initialization();
	});
	
	$('.my').click(function(){
		$('.re_fPageBg').show();
		$('.f_register').show();
		initialization();
	});
	
	$('.f_login .more .r a').click(function(){
		$('.re_fPageBg').show();
		$('.f_register').show();
	});
	
	$('.f_login .more .l a').click(function(){
		$('.re_fPageBg').show();
		$('.f_forget').show();
	});
	
	$('.re_fPageBg').click(function(){
		$('.f_login').hide();
		$('.f_register').hide();
		$('.f_forget').hide();
		$('.re_f_dispute').hide();
		$('.f_ssgl').hide();
		$('.f_bmmd').hide();
		$(this).hide();
	});

	$("#logPwd").focus(function () {
		$(this).unbind("keydown").bind("keydown",function (e) {
			if(e.keyCode == 13){
				login();
			}
		})
		// onkeypress="(function(e){e=e||window.event; if(e.keyCode == 13){loginSubmit();}})(event)"
	})
});

function autoLogin(num,pass) {
	$.get('/login/'+num+"/"+pass,function(data) {
		if (data.id != "") {
			delCookie();
			var hours = 1;
			var exp = new Date();
			exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
			document.cookie = data.link + ";expires=" + exp.toGMTString();
			window.location.reload();
		}else{
			$("#warning").css("display","block").children("span").text("注册失败");
		}
	})
}

function login() {
	var phone = $("#logPhone").val();
	var result = testRegister("login");
	var pwd = $("#logPwd").val();
	if(result){
		$.get('/login/'+phone+"/"+pwd,function(data) {
			if (data.id != "") {
				delCookie();
				var hours = 1;
				var exp = new Date();
				exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
				document.cookie = data.link + ";expires=" + exp.toGMTString();
				window.location.reload();
			} else if (data.mobile) {
				alert("手机号或密码错误");
			} else {
				if (confirm("您还未注册,是否注册?")) {
					$('.re_fPageBg').show();
					$('.f_register').show();
					initialization();
				}
			}
		})
	}
}

function initialization(){
	clearCD();
	$("#logPhone").val("");
	$("#logPwd").val("");
	$(".formInput").val("");
	$(".err").css("display","none");
	$("#agree").prop("checked",false);
	$("#sendVerificationCode").css("display","inline-block");
	$("#showTime").css("display","none");
}

function testRegister(type){
	var bool = true;
	switch (type){
		case "register":
			$(".f_register").find(".err").each(function(){
				if($(this).css("display") == "block"){
					bool = false;
				}
			});
			return bool;
			break;
		case "login":
			$(".f_login").find(".err").each(function(){
				if($(this).css("display") == "block"){
					bool = false;
				}
			});
			return bool;
			break;
		case "f_forget_1":
			$(".f_forget>ul:eq(0)").find(".err").each(function(){
				if($(this).css("display") == "block"){
					bool = false;
				}
			});
			return bool;
			break;
		case "f_forget_2":
			$(".f_forget>ul:eq(1)").find(".err").each(function(){
				if($(this).css("display") == "block"){
					bool = false;
				}
			});
			return bool;
			break;
	}
}

function findPwd(){
	var reset = {
		phone:"",
		pwd:""
	};
	$("#stepTo").click(function(){
		var result = testRegister("f_forget_1");
		var num = $("#findPhone").val();
		var code = $("#findCode").val();
		if(result){
			$.post("/register",{phone:num,code:code},function(data) {
				if (data.code == 200) {
					$(".f_forget>ul:eq(0)").css("display","none");
					$(".f_forget>ul:eq(1)").css("display","block");
					reset.phone = num;
				} else {
					$(".f_forget>ul:eq(0)>li:eq(1) .err").css("display","block");
				}
			});
		}
	});
	$("#stepFn").click(function(){
		var result = testRegister("f_forget_2");
		if(result){
			reset.pwd = $("#findPwd").val();
			$.post('/users/resetPwd',reset,function(data){
				if(data.code == 200){
					window.location.href="/";
				}
			})
		}
	});
}

//报名页
$(function(){
	$('.joinPage .intro .notice i').hover(function(){
		$('.joinPage .intro .notice .tips').show();
	});
	$('.joinPage .intro .notice i').mouseout(function(){
		$('.joinPage .intro .notice .tips').hide();
	});
	$('.joinPage .selectBox').click(function(){
		$(this).children('ul').show();
	});
	$('.joinPage .selectBox li').click(function(e){
		e.stopPropagation();
		$(this).parent('ul').hide();
	});
	$("#postTeamMessage1").click(function(){
		$(this).css("display","none");
		$.ajax({
			data:{
				uid:document.cookie,
				battle_name:$("#teamName").val(),
				player1:$("#player1").val(),
				player2:$("#player2").val(),
				player3:$("#player3").val(),
				player4:$("#player4").val(),
				player5:$("#player5").val(),
				player6:$("#player6").val(),
				round:1,
				mobile:$("#phoneNum").val()
			},
			url: '/enroll',
			type: 'post',
			dataType: 'json',
			async: false,
			success: function (data) {
				if(data.code == 200){
					window.location.href="/";
				}
			}
		});
	})

	$("#postTeamMessage2").click(function(){
		$(this).css("display","none");
		$.ajax({
			data:{
				uid:document.cookie,
				battle_name:$("#teamName").val(),
				player1:$("#player1").val(),
				player2:$("#player2").val(),
				player3:$("#player3").val(),
				player4:$("#player4").val(),
				player5:$("#player5").val(),
				player6:$("#player6").val(),
				round:2,
				mobile:$("#phoneNum").val()
			},
			url: '/enroll',
			type: 'post',
			dataType: 'json',
			async: false,
			success: function (data) {
				if(data.code == 200){
					window.location.href="/";
				}
			}
		});
	})
});

//赛事综合页
$(function(){
	$('.competitionMain .pageTab a').click(function(){
		var newIndex=$(this).index();
		$('.competitionMain .pageTab a').removeClass('now');
		$('.competitionMain .pageTab a').eq(newIndex).addClass('now');
		$('.competitionMain .mainShow').hide();
		$('.competitionMain .mainShow').eq(newIndex).show();
	});
});

/*创建比赛*/
$(function(){
	$('.f_ssgl .btn').click(function(){
		$('.f_ssgl').hide();
		$('.re_fPageBg').hide();
	});
});

/*我的赛事*/
$(function(){
	$('.f_sportMenu .clear').click(function(){
		$('.f_sportMenu').hide();
		$('.re_fPageBg').hide();
	});
});

function delCookie(){
	var del = new Date();
	del.setTime(del.getTime() - 1);
	var Co = document.cookie;
	document.cookie =Co+";expires=" + del.toGMTString();
}

function checkSession(){
	var cookie = document.cookie;
	var url = window.location.pathname;
	$.post('/loginCheck',{cookie:cookie,url:url},function(data) {
		if (data.bool) {
			$("#signBool").css("display","block");
			$("#signBool2").css("display","block");
			checkMess(data.data);
		}else{
			if(data.jump){
				window.location.href='/';
			}else{
				$("#signBool").css("display","none");
				$("#signBool2").css("display","none");
			}
		}
	});
}

function checkMess(data){
	$.get("/users/form/"+data.id,function(check){
		$("#logoutState").css("display","none");
		$("#loginState").css("display","block").children("a:eq(0)").text(data.mobile);
		var loginState = $("#loginState a:eq(2)");
		if(check.round1 && check.round2){
			loginState.text("二轮都已报名");
			$("#signBool").css("display","none");
			$("#signBool2").css("display","none");
		}else if(check.round1 && !check.round2){
			loginState.text("第一轮已报名");
			$("#signBool").css("display","none");
			$("#signBool").css("display","none");
			$("#signBool2").css("display","none");
		}else if(check.round1 && !check.round2){
			loginState.text("第一轮已报名");
			$("#signBool").css("display","none");
			$("#signBool2").css("display","block");
		}else if(!check.round1 && check.round2){
			loginState.text("第二轮已报名");
			$("#signBool").css("display","block");
			$("#signBool2").css("display","none");
		}else{
			loginState.text("未报名");
			$("#signBool").css("display","block");
			$("#signBool2").css("display","block");
		}
	});
}

function checkInput(){
	$(".formInput").on("input",function(){
		var type = $(this).data("type");
		var value = $(this).val();
		var findParent = $(this).parent().parent().parent();
		var err = $(this).parent().parent().children(".err");
		var reg;
		switch (type){
			case "phone":
				reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
				if(reg.test(value)){
					err.css("display","none");
				}else{
					err.css("display","block");
				}
				break;
			case "pwd":
				reg = /^[0-9A-Za-z]{6,12}$/;
				if(reg.test(value)){
					err.css("display","none");
				}else{
					err.css("display","block");
				}
				break;
			case "pwdCheck":
				var num = findParent.find("input[data-type='checkPwd']").val();
				if(value == num){
					err.css("display","none");
				}else{
					err.css("display","block");
				}
				break;
			case "checkPwd":
				var reNum = findParent.find("input[data-type='pwdCheck']").val();
				reg = /^[0-9A-Za-z]{6,12}$/;
				if(reg.test(value)){
					err.css("display","none");
				}else{
					err.css("display","block");
				}
				if(value == reNum){
					findParent.find(".err[data-type='re']").css("display","none");
				}else{
					findParent.find(".err[data-type='re']").css("display","block");
				}
				break;
			case "code":
				reg = /^\d{4}$/;
				if(reg.test(value)){
					err.css("display","none");
				}else{
					err.css("display","block");
				}
				break;
		}
	})
}












