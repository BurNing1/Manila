//首页
$(function(){
	$.get("http://localhost:3000/signState",function(data){
		console.log(data);
	});
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
	});
	
	$('.my').click(function(){
		$('.re_fPageBg').show();
		$('.f_register').show();
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
		$.ajax({
			data:{
				match_id:1,
				uid: 1,
				fullname:1,
				id_name:1,
				phone:1,
				wechat:1,
				qq:1
			},
			url: 'http://localhost:3000/sign_up',
			type: 'post',
			dataType: 'json',
			async: false,
			success: function (data) {
				console.log(data);
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
})





















