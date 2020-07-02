function setPara(){
	var diff = document.getElementById("difficuty").value;
	var x = document.getElementById("paragraph");
	
	//Remove all the element from paragraph drop down
	var select = document.getElementById("paragraph");
	var length = select.options.length;
	for (i = length-1; i >= 0; i--) {
	  select.options[i] = null;
	}
	
		if(diff == "NA"){
			var option1 = document.createElement("option");
			option1.text = "--Select--";
			option1.value = "NA";
			x.add(option1);
		}
		else if (diff == "Easy") {
			var option1 = document.createElement("option");
			var option2 = document.createElement("option");
			option1.text = "Easy Text1";
			option2.text = "Easy Text2";
			x.add(option1);
			x.add(option2);
		}
		else if (diff == "Medium") {
			var option1 = document.createElement("option");
			var option2 = document.createElement("option");
			var option3 = document.createElement("option");
			var option4 = document.createElement("option");
			var option5 = document.createElement("option");

			option1.text = "Medium Text1";
			option2.text = "Medium Text2";
			option3.text = "Medium Text3";
			option4.text = "Medium Text4";
			option5.text = "Medium Text5";
			
			x.add(option1);
			x.add(option2);
			x.add(option3);
			x.add(option4);
			x.add(option5);
		}
		else if (diff == "Hard") {
			var option1 = document.createElement("option");
			var option2 = document.createElement("option");
			var option3 = document.createElement("option");
			var option4 = document.createElement("option");
			var option5 = document.createElement("option");

			option1.text = "Hard Text1";
			option2.text = "Hard Text2";
			option3.text = "Hard Text3";
			option4.text = "Hard Text4";
			option5.text = "Hard Text5";
			
			x.add(option1);
			x.add(option2);
			x.add(option3);
			x.add(option4);
			x.add(option5);
		}
		else if (diff == "Editorial") {
			var option1 = document.createElement("option");
			option1.text = "--Select--";
			option1.value = "NA";
			x.add(option1);
		}
	
}

function proceed(){
	//Validate if there are any improper selection
	if(!validate())
		return ;
	
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
	//location.href = "file:///C:/Users/Punit/Desktop/Profile/dhruva011.github.io/english/demo.html";
}

function reset(){
	location.href = "https://dhruva011.github.io/english/";
}

function validate(){
	var diff = document.getElementById("difficuty").value;
	if(diff=="NA"){
		alert("Please select appropriate difficulty");
		return false;
	}
	var diff = document.getElementById("paragraph").value;
	if(diff=="NA"){
		alert("Please select appropriate paragraph");
		return false;
	}
	var diff = document.getElementById("time").value;
	if(diff=="NA"){
		alert("Please select appropriate time");
		return false;
	}
	return true;
}