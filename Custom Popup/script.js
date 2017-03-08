var btn = document.getElementById("btn");
var mask = document.getElementById("win-mask");
var content = document.getElementById("win-content");
var foot = document.getElementById("footer");

btn.onclick = function (){
	mask.style.display = "block";
	content.style.display = "block";
};


foot.onclick = function(){
	mask.style.display = "none";
	content.style.display = "none";
}
function closeDiv(){
	mask.style.display = "none";
	content.style.display = "none";
}


