window.onload=function(){
	waterfall('main','box');
	var dataInt = {"data":[{'src':'8.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]}
	window.onscroll=function(){
		if(checkScrollSlide()){
			//将数据库渲染到页面尾部
			var oParent = document.getElementById('main');
			for(var i=0;i<dataInt.data.length;i++){

				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src='images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);


			}
			waterfall('main','box');
		}
		//checkScrollSlide();
	}
}
function checkScrollSlide(){  //监测是否具备了滚条加载数据地条件
	var oParent = document.getElementById('main');
	var oBox = document.getElementsByClassName('box');
	var lastBoxH = oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetWidth/2);
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;  //混杂和标准模式  滚动地高度
	//console.log(scrollTop);
	var height = document.body.clientHeight || document.documentElement.clientHeight; //可视窗口地高度
	//console.log(height);
	return (lastBoxH<scrollTop+height)?true:false;

}


function waterfall(parent,child){
	//将main下的所有class为box的元素取出来
	var oParent = document.getElementById(parent);
	var box = document.getElementsByClassName(child); //注意有s
	//console.log(box.length);
	//计算整个页面显示的列数（页面宽/box的宽）
	var oBoxW = box[0].offsetWidth;//offsetWidth
	var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
	//设置main的宽度
	oParent.style.cssText = 'width:'+oBoxW*cols +'px;margin:0 auto';
	var hArr=[];
	for(var i=0;i<box.length;i++){
		if(i<cols){
			hArr.push(box[i].offsetHeight); //存放每列高度的数组，1-6列
		}else{
			var minH = Math.min.apply(null, hArr);  //求该数组中较小值
			var index = hArr.indexOf(minH);       //获取该较小值在数组中的索引
			box[i].style.position='absolute';
			box[i].style.top = minH+'px';          //设置绝对位置；放置在每列最小值地下面
			box[i].style.left = oBoxW*index+'px';
			hArr[index] += box[i].offsetHeight;    //并把该列地高度加上放入地box地高度；
		}

	}
	console.log(hArr);
}