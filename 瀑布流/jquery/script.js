//jquery方法只能由jQuery对象来用；  DOM对象转换为jQuery对象  $()
$(window).on('load',function(){
	waterfall();
	var dataInt = {"data":[{'src':'8.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]}

	$(window).on('scroll',function(){
		if(checkScrollSlide()){
			$.each(dataInt.data,function(key,value){
				var oBox=$('<div>').addClass('box').appendTo($("#main"));  //创建一个元素
				var oPic=$("<div>").addClass('pic').appendTo($(oBox));
				var oImage=$('<img>').attr('src','images/'+$(value).attr('src'));
				oImage.appendTo($(oPic));
			})
			waterfall();
		}
	})
})

function waterfall(){
	var $boxs=$('#main>div');
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');  //

	var hArr=[];
	$boxs.each(function(index,value){  //遍历  value使dom元素
		var h=$boxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);
			$(value).css({    //把DOM对象转换为jQuery对象
				'position':"absolute",
				'top':minH+'px',
				'left':minHIndex*w+'px'
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	})
}

function checkScrollSlide(){
	var $lastBox = $('#main>div').last();
	var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.height()/2);
	var scrollTop = $(window).scrollTop();
	var documentH=$(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}