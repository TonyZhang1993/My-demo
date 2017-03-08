function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
			oldonload();
			func();
		}
	}
}


function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling); //目标元素的下一个兄弟元素
	}
}

function addClass(element,value){
	if(!element.className){
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName+=" ";
		newClassName+= value;
		element.className = newClassName;
	}
}

function highlightPage(){

	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	
	var headers = document.getElementsByTagName('header');   
	if(headers.length == 0) return false;   
	
	var navs = headers[0].getElementsByTagName('nav');
	if(navs.length == 0) return false;

	var links = navs[0].getElementsByTagName("a");

	/*for(var i=0; i<links.length; i++){
		linkurl = links[i].getAttribute("href");
		links[i].setAttribute("href",linkurl);
		if(window.location.href.indexOf(linkurl) != -1)  //当前连接的URL与页面的URL是否匹配
			links[i].className = "here";
	}*/
	
	for(var i=0; i<links.length;i++){
		var linkurl;
		for(var i=0;i<links.length;i++){
			linkurl=links[i].getAttribute("href");
			if(window.location.href.indexOf(linkurl) != -1){
				links[i].className = "here";
				var linktext = links[i].lastChild.nodeValue.toLowerCase();
				document.body.setAttribute("id",linktext);  //为body元素添加id属性，为每个页面应用不同的样式
			}
		}
	}
}

function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top = "0px";
	}
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dist =0;
	if(xpos == final_x && ypos == final_y){
		return true;
	}
	if(xpos < final_x){
		dist = Math.ceil((final_x-xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos > final_x){
		dist = Math.ceil((xpos- final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos < final_y){
		dist = Math.ceil((final_y-ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos > final_y){
		dist = Math.ceil((ypos- final_y)/10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos+ "px";
	elem.style.top = ypos+"px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	//if(!document.getElementById("preview")) return false;

	//var preview = document.getElementById("preview");
	//preview.style.position = "absolute";
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.jpg");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);

	var links = document.getElementsByTagName("a");
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover = function(){
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html") != -1){
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html") != -1){
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html") != -1){
				moveElement("preview",-300,0,5);
			}	
			if(destination.indexOf("live.html") != -1){
				moveElement("preview",-450,0,5);
			}	
			if(destination.indexOf("contact.html") != -1){
				moveElement("preview",-600,0,5);
			}							
		}
	}
}

function showSection(id){
	var sections = document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id") != id){
			sections[i].style.display = "none";
		}else{
			sections[i].style.display = "block";
		}
	}
}

function prepareIntervalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}

	}
}

function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i=0; i<links.length; i++){
		links[i].onclick = function(){
			return showPic(this);
		}
	}
}



function showPic(whichpic){
	if(!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);

	if(document.getElementById("discription")){
		var text = whichpic.getAttribute("title");
		var placeholder_text = document.getElementById("discription");
		if(placeholder_text.firstChild.nodeType == 3)
			placeholder_text.firstChild.nodeValue = text;
	}
	return false;
}

function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/photos/mayday.jpg");
	placeholder.setAttribute("alt","my img gallery");
	var discription = document.createElement("p");
	discription.setAttribute("id","discription");
	var txt = document.createTextNode("Choose the pic.");
	discription.appendChild(txt);
	var gallery = document.getElementById("imagegallery");
	insertAfter(discription,gallery);
	insertAfter(placeholder,discription);
}

function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function() {
			try { return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch (e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch (e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP");}
				catch (e) {}	
			return false;		
		}
		return new XMLHttpRequest();
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareIntervalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);