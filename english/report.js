	var data = document.getElementById('wpm');
	data.innerHTML = localStorage['wpm'];
	
	data = document.getElementById('nwpm');
	data.innerHTML = localStorage['nwpm'];
	
	data = document.getElementById('accuracy');
	data.innerHTML = localStorage['accuracy'];
	
	data = document.getElementById('errors');
	data.innerHTML = localStorage['errors'];
	
	data = document.getElementById('netspeed');
	data.innerHTML = "Net. Speed : "+localStorage['nwpm'];

	data = document.getElementById('timetaken');
	var second = localStorage['timetaken'];
	var min = Math.floor(second/60);
	second %=60;
	
	if(min<10)
		min="0"+min;
	if(second<10)
		second="0"+second;
	
	data.innerHTML = min+":"+second;

	var actualText = localStorage['actualText'];
	var wrongWords = localStorage['wrongWords'];
	var userText = localStorage['userText'];
	
	
	
	
	//var textlen = userText.split(" ").length;
	
	document.getElementById('actualText').innerHTML = actualText;
	//document.getElementById('wrongWords').innerHTML = data+" User Text Length = "+textlen;
	
	setText();
	//alert("Actual Word : -" +actualText+"<br>Wrong Words : "+wrongWords+"<br>User Text : "+userText.text);

function setText(){
	
	//document.getElementById('errorText').innerHTML = "<font color=\"red\">";
	var indices = wrongWords.split(" ");
	wrong = new Set(indices);
	var i;
	//alert(wrong.size);
	
	var splittedUserText = userText.split(" ");
	
	
	//alert(splittedUserText.length);
	for (i = 0; i < splittedUserText.length; i++) {
		if(wrong.has(i+""))
		document.getElementById('errorText').innerHTML += "<font color=\"red\">"+splittedUserText[i]+"] </font> ";
	}
	
	//document.getElementById('errorText').innerHTML += "</font>";
}
	
function home(){
	location.href = "https://dhruva011.github.io/english/";
}