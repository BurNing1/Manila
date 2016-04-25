//首页
$(function(){
	$.get('/management/signState',function(data){
		var progress = $("#progress");
		var tab = $('.competitionMain .pageTab a:eq(1)');
		switch (data){
			case null:
				progress.css("width","0");
				$("li[id*='s1']").addClass("now");
				$("#signBool .t1").css("display","block");
				tab.css("display","none");
				break;
			case "signStart":
				progress.css("width","25%");
				$("li[id*='s2']").addClass("now");
				$("i[id*='i1']").addClass("t1");
				$("#signBool .t4").css("display","block");
				tab.css("display","none");
				break;
			case "signStop":
				progress.css("width","50%");
				$("li[id*='s3']").addClass("now");
				$("i[id*='i2']").addClass("t1");
				$("#signBool .t1").css("display","block");
				tab.css("display","block");
				break;
			case "competeStart":
				progress.css("width","75%");
				$("li[id*='s4']").addClass("now");
				$("i[id*='i3']").addClass("t1");
				$("#signBool .t1").css("display","block");
				tab.css("display","block");
				break;
			case "competeStop":
				progress.css("width","100%");
				$("li[id*='s5']").addClass("now");
				$("i[id*='i4']").addClass("t1");
				$("#signBool .t1").css("display","block");
				tab.css("display","block");
				break;
			case "signReset":
				progress.css("width","0");
				$("li[id*='s1']").addClass("now");
				$("#signBool .t1").css("display","block");
				tab.css("display","none");
				break;
		}
	});
	checkSession();
	var testForm = {
		phone:false,
		pass:false,
		passCheck:false
	};
	//发送验证码
	$("#sendVerificationCode").click(function(){
		$(this).css("display","none");
		$("#showTime").css("display","inline-block");
		sendCD("#showTime");
		var num = $("#phoneNum").val();
		$.get("/users/code/"+num)
	});
	//提交注册表
	$("#register").click(function(){
		var num = $("#phoneNum").val();
		var code = $("#code").val();
		var password = $("#password").val();
		var result = testRegister();
		var warning = $("#warning");
		switch (result){
			case "else":
				warning.css("display","block");
				warning.children("span").text("请填完正确有效信息");
				break;
			case "OK":
				$.post("/register",{phone:num,code:code,password:password},function(data){
					if(data == 200){
						window.location.reload();
					}else{
						alert("验证码错误");
					}
				});
				break;
		}
	});
	//验证手机号
	$("#phoneNum").on("input",function(){
		var num = $(this).val();
		var reg = /^1[3|4|5|8][0-9]\d{8}$/;
		if(reg.test(num)){
			$("#phoneCheck").css("display","none");
			testForm.phone = true;
		}else{
			$("#phoneCheck").css("display","block");
			testForm.phone = false;
		}
	});

	//验证密码
	$("#password").on("input",function(){
		var num = $(this).val();
		var numCheck = $("#REpassword").val();
		var reg = /^[0-9A-Za-z]{6,12}$/;
		if(reg.test(num)){
			$("#passCheck").css("display","none");
			testForm.pass = true;
		}else{
			$("#passCheck").css("display","block");
			testForm.pass = false;
		}
		if(num == numCheck){
			$("#RECheck").css("display","none");
			testForm.passCheck = true;
		}else{
			$("#RECheck").css("display","block");
			testForm.passCheck = false;
		}
	});
	//验证重复
	$("#REpassword").on("input",function(){
		var num = $(this).val();
		var reg = $("#password").val();
		if(reg == num){
			$("#RECheck").css("display","none");
			testForm.passCheck = true;
		}else{
			$("#RECheck").css("display","block");
			testForm.passCheck = false;
		}
	});
	//登录
	$("#login").unbind("click").bind("click",function(){
		var phone = $("#logPhone").val();
		var pwd = $("#logPwd").val();
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
	//$.get("http://localhost:3000/signState",function(data){
	//	console.log(data);
	//});
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
	function initialization(){
		clearCD();
		$("#logPhone").val("");
		$("#logPwd").val("");
		$(".formInput").val("");
		$(".err").css("display","none");
		$("#agree").prop("checked",false);
		$("#sendVerificationCode").css("display","inline-block");
		$("#showTime").css("display","none");
		testForm = {
			phone:false,
			pass:false,
			passCheck:false,
			agree:false
		};
	}
	function testRegister(){
		if(testForm.phone && testForm.pass && testForm.passCheck){
			return "OK";
		}else{
			return "else";
		}
	}
});

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
	$("#postTeamMessage").click(function(){
		$(this).css("display","none");
		$.ajax({
			data:{
				uid:document.cookie,
				battle_name:$("#teamName").val(),
				battle_id:$("#personID").val(),
				mobile:$("#phoneNum").val(),
				wechat:$("#wechart").val(),
				qq:$("#qq").val()
			},
			url: '/enroll',
			type: 'post',
			dataType: 'json',
			async: false,
			success: function (data) {
				window.location.href("/");
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
	$.get('/login/'+cookie,function(data) {
		if (data.bool) {
			$("#signBool").css("display","block");
			checkMess(data.data);
		}else{
			$("#signBool").css("display","none");
		}
	});
}
function checkMess(data){
	$.get("/users/form/"+data.id,function(bool){
		$("#logoutState").css("display","none");
		$("#loginState").css("display","block").children("a:eq(0)").text(data.mobile);
		if(bool){
			$("#loginState a:eq(2)").text("已报名");
		}else{
			$("#loginState a:eq(2)").text("未报名");
		}
	});
}













