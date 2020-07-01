function setPara(){
	var card = document.getElementById("difficuty").value;
	var x = document.getElementById("paragraph");
	var option = document.createElement("option");
	var option1 = document.createElement("option");
	
	//Remove all the element from paragraph drop down
	var select = document.getElementById("paragraph");
	var length = select.options.length;
	for (i = length-1; i >= 0; i--) {
	  select.options[i] = null;
	}
		if (card == "Easy") {
			option.text = "Easy Text1";
			option1.text = "Easy Text2";
		}
		if (card == "Medium") {
			option.text = "Medium Text1";
			option1.text = "Medium Text2";
		}
		if (card == "Hard") {
			option.text = "Hard Text1";
			option1.text = "Hard Text2";
		}
		if (card == "Editorial") {
			option.text = "Editorial Text1";
			option1.text = "Editorial Text2";
		}
	
	x.add(option);
	x.add(option1);
}

function proceed(){
	var e = document.getElementById("difficuty");
	var dif = e.options[e.selectedIndex].text;
	
	var f = document.getElementById("paragraph").selectedIndex;
	//var para = f.options[f.selectedIndex].text;
	
	var g = document.getElementById("time");
	var time = g.options[g.selectedIndex].value;
	//var time=g;
	
	localStorage.setItem( 'difficulty', dif );
	localStorage.setItem( 'paragraph', f );
	localStorage.setItem( 'timer', time*60 );
	localStorage.setItem( 'isValid', true);
	
	location.href = "https://dhruva011.github.io/english/demo.html";
}

function reset(){
	location.href = "https://dhruva011.github.io/english/";
}