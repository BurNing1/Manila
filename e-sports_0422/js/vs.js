//容器宽度
$(function(){
	$('.vsListBox1 .step li:last-child').addClass('end');
	$('.vsListBox1').css('width',$('.vsListBox1 .step li').length*260);
	
	$('.vsListBox2 .step li:last-child').addClass('end');
	$('.vsListBox2').css('width',$('.vsListBox2 .step li').length*260);
});

//上下间隔
$(function(){
	if($('.vsListBox1').length<1){
		return false;
	}
	upDataLiMargin1();
	for(var i=0;i<$('.vsListBox1 .show ul').length;i++){
		var el = $('.vsListBox1 .show ul').eq(i).get(0);
		new Sortable(el, {
			onStart: function (/**Event*/evt) { // 拖拽
				var itemEl = evt.item;
			},
			onEnd: function (/**Event*/evt) { // 拖拽
				var itemEl = evt.item;
				upDataLiMargin1();
			}
		});
	}
	var svgHtml='';
	for(var i=0;i<$('.vsListBox1 .show ul').length;i++){
		for(var z=0;z<$('.vsListBox1 .show ul').eq(i).children('li').length;z++){
			var oY=$('.vsListBox1 .show ul').eq(i).children('li').eq(z).offset().top-$('.svg1').offset().top;
			var oX=$('.vsListBox1 .show ul').eq(i).children('li').eq(z).offset().left-$('.svg1').offset().left;
			var liM=parseInt($('.vsListBox1 .show ul').eq(i).children('li').eq(0).css("margin-bottom"))/2-30;
			var t1,t2,t3,l1,l2,l3;
			if(z%2==0){
				t1=oX+220;
				l1=oY+30;
				t2=t1+80;
				l2=l1;
				t3=t2;
				l3=l2+30+liM;
			}else{
				t1=oX+220;
				l1=oY+30;
				t2=t1+80;
				l2=l1;
				t3=t2;
				l3=l2-70-liM;
			}
			if($('.vsListBox1 .show ul').eq(i).children('li').length!=1){
				svgHtml+='<polyline points="'+t1+' '+l1+','+t2+' '+l2+','+t3+' '+l3+'" />';
			}
			//console.log($('.vsListBox1 .show ul').eq(i).children('li').length);
		}
	}
	$('.svg1').html('<svg width="100%" height="100%">'+svgHtml+'</svg>');
});

$(function(){
	if($('.vsListBox2').length<1){
		return false;
	}
	upDataLiMargin2()
	for(var i=0;i<$('.vsListBox2 .show ul').length;i++){
		var el = $('.vsListBox2 .show ul').eq(i).get(0);
		new Sortable(el, {
			onStart: function (/**Event*/evt) { // 拖拽
				var itemEl = evt.item;
			},
			onEnd: function (/**Event*/evt) { // 拖拽
				var itemEl = evt.item;
				upDataLiMargin2();
			}
		});
	}
	var svgHtml='';
	for(var i=0;i<$('.vsListBox2 .show ul').length;i++){
		var ulType=$('.vsListBox2 .show ul').eq(i).attr('class');
		for(var z=0;z<$('.vsListBox2 .show ul').eq(i).children('li').length;z++){
			var oY=$('.vsListBox2 .show ul').eq(i).children('li').eq(z).offset().top-$('.svg2').offset().top;
			var oX=$('.vsListBox2 .show ul').eq(i).children('li').eq(z).offset().left-$('.svg2').offset().left;
			var liM=parseInt($('.vsListBox2 .show ul').eq(i).children('li').eq(0).css("margin-bottom"))/2-30;
			var t1,t2,t3,t4,t5,t6,l1,l2,l3,l4,l5,l6;
			//分类绘图
			if(ulType=='type0'){
				
			}else if(ulType=='type1'){
				t1=oX-15;
				l1=oY;
				t2=t1;
				l2=l1+15;
				t3=t2+60;
				l3=l2;
				
				t4=oX+30;
				l4=oY+46;
				t5=oX-100;
				l5=oY+46;
				if($('.vsListBox2 .show ul').eq(i).children('li').length!=1){
					svgHtml+='<polyline points="'+t1+' '+l1+','+t2+' '+l2+','+t3+' '+l3+'" /><polyline points="'+t4+' '+l4+','+t5+' '+l5+'" />';
				}
				
			}else if(ulType=='type2'){
				
				
				t1=oX+45;
				l1=oY;
				t2=t1;
				l2=l1-30-liM/4;
				t3=t2-100;
				l3=l2;
				
				t4=oX+45;
				l4=oY+55;
				t5=t4;
				l5=l4+30+liM/4;
				t6=t5-100;
				l6=l5;
				
				if($('.vsListBox2 .show ul').eq(i).children('li').length!=1){
					svgHtml+='<polyline points="'+t1+' '+l1+','+t2+' '+l2+','+t3+' '+l3+'" /><polyline points="'+t4+' '+l4+','+t5+' '+l5+','+t6+' '+l6+'" />';
				}
				
			}else if(ulType=='type3'){
				t1=oX-15;
				l1=oY;
				t2=t1;
				l2=l1+15;
				t3=t2+60;
				l3=l2;
				
				t4=oX+30;
				l4=oY+46;
				t5=oX-100;
				l5=oY+46;
				if($('.vsListBox2 .show ul').eq(i).children('li').length!=1){
					svgHtml+='<polyline points="'+t1+' '+l1+','+t2+' '+l2+','+t3+' '+l3+'" /><polyline points="'+t4+' '+l4+','+t5+' '+l5+'" />';
				}
				
				if(z%2==0){
					t1=oX+220;
					l1=oY+30;
					t2=t1+80;
					l2=l1;
					t3=t2;
					l3=l2+30+liM;
				}else{
					t1=oX+220;
					l1=oY+30;
					t2=t1+80;
					l2=l1;
					t3=t2;
					l3=l2-70-liM;
				}
				if($('.vsListBox2 .show ul').eq(i).children('li').length!=1){
					svgHtml+='<polyline points="'+t1+' '+l1+','+t2+' '+l2+','+t3+' '+l3+'" />';
				}
			}
			else if(ulType=='type4'){
				
				
				
			}
			
		}
	}
	$('.svg2').html('<svg width="100%" height="100%">'+svgHtml+'</svg>');
});

function upDataLiMargin1(){
	var mt,mb,lastMt,lastMb;
	for(var i=0;i<$('.vsListBox1 .show ul').length+1;i++){
		switch(i){
		case 0:
			mt=0;
			mb=40;
			break;
		case 1:
			mt=50;
			mb=140;
			break;
		default:
			mt=lastMt*2+50;
			mb=lastMb*2+60;
		}
		$('.vsListBox1 .show ul').eq(i).css('margin-top',mt+'px');
		$('.vsListBox1 .show ul').eq(i).children("li").css('margin-bottom',mb+'px');
		$('.vsListBox1 .show ul li:last-child').css('margin-bottom','0');
		lastMt=mt;
		lastMb=mb;
	}
}

function upDataLiMargin2(){
	var mt=0,mb=0,lastLi=0;;
	for(var i=0;i<$('.vsListBox2 .show ul').length; i++){
		switch($('.vsListBox2 .show ul').eq(i).attr('class')){
			case 'type0':
				mb=40;
				mt=0;
				break;
			case 'type1':
				$('.vsListBox2 .show ul').eq(i).css('top',-14+'px')
				break;
			case 'type2':
				mb=lastLi*mb/$('.vsListBox2 .show ul').eq(i).children('li').length+60;
				mt=lastLi*mt/$('.vsListBox2 .show ul').eq(i).children('li').length+50;
				break;
			case 'type4':
				mb=lastLi*mb/$('.vsListBox2 .show ul').eq(i).children('li').length+60;
				mt=lastLi*mt/$('.vsListBox2 .show ul').eq(i).children('li').length+50;
				break;
		};
		lastLi=$('.vsListBox2 .show ul').eq(i).children('li').length;
		$('.vsListBox2 .show ul').eq(i).css('margin-top',mt+'px');
		$('.vsListBox2 .show ul').eq(i).children('li').css('margin-bottom',mb+'px');
		$('.vsListBox2 .show ul li:last-child').css('margin-bottom','0');
	}
}

