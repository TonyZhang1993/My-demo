
var container = document.getElementById("container");
var list = document.getElementById("list");
var buttons = document.getElementById("buttons").getElementsByTagName("span");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var index = 1;
var timer;

function showButton(){
	for(var i = 0; i<buttons.length; i++){
		if(buttons[i].className == 'on'){
			buttons[i].className = '';
			break;     //去除原有的按钮的on类
		}

	}
	buttons[index-1].className = 'on';   //添加类名
}

function animate(offset){
	var newLeft = parseInt(list.style.left) + offset ;
	 //字符串转数字，元数据是600px字符串
	 list.style.left = newLeft +'px';
	if(newLeft>-600){     //实现无限滚动
		list.style.left = -3000 +'px';
	}
	if(newLeft<-3000)
	{
		list.style.left = -600 +'px';
	}
	list.style.transition = "left 1.5s";    //过渡属性

}

function play(){   //自动播放
	timer = setInterval(function() {   //每隔2秒执行
		next.onclick();

	},2000);
}

function stop(){
	clearInterval(timer);  //清楚定时器
}

container.onmouseover = stop;
container.onmouseout = play;

next.onclick = function(){
	if(index==5)
		index=1;
	else
		index++;
	animate(-600);
	showButton();
}
prev.onclick = function(){
	if(index==1)
		index=5;
	else
		index--;
	animate(600);
	showButton();
}

for(var i=0;i<buttons.length;i++){   //点击圆点按钮切换图片
	buttons[i].onclick = function(){
		if(this.className == 'on'){
			return;  //优化效果
		}
		var myindex = parseInt(this.getAttribute('index'));   //index是自定义的属性，所以只能通过getAttribute获得
		var offset = -600 * (myindex-index);
		index = myindex;
		showButton();
		animate(offset);
	}
}
play();
