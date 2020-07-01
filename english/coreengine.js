if(!localStorage['isValid'])
	location.href = "https://dhruva011.github.io/english/";

//These values are coming from last page
var TIME_LIMIT=localStorage['timer'];
var DIFFICULTY=localStorage['difficulty'];
var PARAGRAPH_NO=localStorage['paragraph'];
var countdownTimer = null;

let timeLeft=0;
let timeElapsed=0;
let totalWordTyped=0;
let correctWordTyped=0;
let wrongWordTyped=0;
let wpm=0;
let nwpm=0;
let accuracy=0;
var index = 0;
var wrong = new Set();
let input_area = document.querySelector(".input_area");
var str = getParagraph().split(" ");
setText();
var dfirst = document.getElementById("0");
dfirst.innerHTML="<mark>"+dfirst.innerHTML+"</mark>";
var isLastWordWrong=false;


function setText(){
	var d = document.getElementById('timer');
    d.innerHTML = "Time : "+(TIME_LIMIT/60)+" minute";
	formattedText();
	//var d = document.getElementById("matter");
	//d.innerHTML=getParagraph();
}

function formattedText(){
	//Here lets divide the entire text into different div tags
	
	var frmText = str;
	var data = "";
	var i;
	for (i = 0; i < str.length; i++) {
		data += "<span id="+i+">"+str[i]+" </span>";
	}
	var d = document.getElementById("matter");
	d.innerHTML=data;
}

function highlight(){
	var d = document.getElementById(index+"");
	if(d==null)
		return;
	
	d.innerHTML="<mark>"+d.innerHTML+"</mark>";
	d = document.getElementById((index-1)+"");
	if(d==null)
		return ;
	
	
	if(isLastWordWrong)
		d.innerHTML="<strike>"+"<font color=\"red\">"+str[index-1]+"</font>"+"</strike> ";
	else
		d.innerHTML=str[index-1]+" ";
	
	//Scroll
	var toppos = d.offsetTop;
	document.getElementById('matter').scrollTop = toppos-296;
	
	//var d = document.getElementById("label");
	//d.innerHTML="Index="+index+" Top Pos = "+toppos;
}

function getLastWord(){
	word = input_area.value;
	word = word.split(" ");
	return word[word.length-1];
}

function getWpm(){
	if(timeElapsed==0)
		return 0.00;
	wpm = totalWordTyped/(timeElapsed/60);
	return wpm.toFixed(2);;
}

function getNwpm(){
	if(timeElapsed==0)
		return 0.00;
	nwpm = correctWordTyped/(timeElapsed/60);
	return nwpm.toFixed(2);;
}

function getAccurary(){
	if(totalWordTyped==0)
		return 0.00;
	accuracy = (correctWordTyped/totalWordTyped)*100;
	return accuracy.toFixed(2);;
}

function getErrors(){
	return wrongWordTyped;
}

function submit(){
	var d = document.getElementById("matter");
	localStorage.setItem( 'wpm', getWpm());
	localStorage.setItem( 'nwpm', getNwpm());
	localStorage.setItem( 'accuracy', getAccurary());
	localStorage.setItem( 'errors', getErrors());
	localStorage.setItem( 'actualText', d.innerHTML);
	localStorage.setItem( 'userText' , input_area.value);
	localStorage.setItem( 'timetaken' , timeElapsed );
	
	var wrongValues = wrong.values(); 
	
	var wrongData = "";
	for( let data of wrongValues){
		wrongData += data+" ";
	}
	
	//alert(wrongData);
	localStorage.setItem('wrongWords',wrongData);
	
	location.href = "https://dhruva011.github.io/english/report.html";
}

function startClock(){
	timeLeft=TIME_LIMIT;
	countDownController(TIME_LIMIT);
}

function reset(){
	localStorage.setItem( 'difficulty', DIFFICULTY );
	localStorage.setItem( 'paragraph', PARAGRAPH_NO );
	localStorage.setItem( 'timer', TIME_LIMIT );
	localStorage.setItem( 'isValid', true);
	clearInterval(countdownTimer);
	location.href = "https://dhruva011.github.io/english/demo.html";
}

function myKeyDown(e){
	var keynum;
  if(window.event) { // IE          
   keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera          
   keynum = e.which;
  }
	
	//Back Space is pressed 
	if(keynum==8){
		var d = document.getElementById('txtbox');
		//alert("Space pressed : "+ d.value);
		if(d.value.endsWith(" ")){
			d.value+=" ";
			return ;
		}
	}
}


function myKeyPress(e){
  var keynum;
  if(window.event) { // IE          
   keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera          
   keynum = e.which;
  }
	
	
	//Space is pressed
	if(keynum==32){
		totalWordTyped++;
		
		if(index+1>=str.length){
			//alert("Finished value of index :"+index+" Size of array = "+str.length);
			clearInterval(countdownTimer);
			submit() ;
		}
		word = getLastWord();
		//var data = document.getElementById('out');
		//data.innerHTML = word+" ";
		
		//Wrong word typed
		if(word!=str[index]){
			//alert("mismatch between "+word+" and index = "+ index);
			wrong.add(index);
			//data.style.setProperty("text-decoration", "line-through");
			wrongWordTyped++;		
			isLastWordWrong=true;
		}
		else{
			correctWordTyped++;
			isLastWordWrong=false;
		}
		
		//lastWord=word;
		
		index++;
		highlight();
		//setText();
	}
}

//Count down timer 
var countDownController = function(seconds){
 countdownTimer = setInterval(startTimer, 1000);


 function startTimer(){
  var days    = Math.floor(seconds/24/60/60);
  var hoursLeft  = Math.floor((seconds) - (days*86400));
  var hours    = Math.floor(hoursLeft/3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
  var minutes   = Math.floor(minutesLeft/60);
  var remainingSeconds = seconds % 60;
  if(minutes<10){
    minutes = "0"+ minutes;
  }
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

	var d = document.getElementById('timer');
  d.innerHTML = "Time Remaining : "+minutes + ":"+remainingSeconds;
	
	var d = document.getElementById('wpm');
  d.innerHTML = "WPM<br>"+getWpm();
	
	var d = document.getElementById('nwpm');
  d.innerHTML = "NWPM<br>"+getNwpm();
	
	var d = document.getElementById('accuracy');
  d.innerHTML = "Accuracy<br>"+getAccurary()+ "%";
	
	var d = document.getElementById('errors');
  d.innerHTML = "Errors<br>"+getErrors();


  if (seconds == 0) {
    clearInterval(countdownTimer);

    //state for end timing
    alert('time is up');
		
		submit();
  } else {
    seconds--;
		 // decrease the current time left
		timeLeft--;

		// increase the time elapsed
		timeElapsed++;
  }
}
};

function getParagraph(){
	var originalText="No Text";
	if(DIFFICULTY=="Easy"){
		if(PARAGRAPH_NO=="0"){
			originalText = "Courses include computer architecture, processor design, operating systems, computer networks, parallel processing, embedded systems, circuit analysis, analog and digital electronics, computer graphics, cloud, web and mobile computing, software engineering, database systems, digital signal processing, virtualization, computer simulations and games programming. CSE programs also include core subjects of theoretical computer science such as theory of computation, design and analysis of algorithms, data structures, numerical analysis, machine learning, information theory, programming language theory and paradigms. The program aims at designing, developing and troubleshooting computing devices and systems (such as personal computers, supercomputers, robots, smartphones, networking devices, embedded devices), focusing the underlying fundamental issues (like processor architecture design, operating system design, memory management, digital system design, communication protocol design, system software development, application software development, database management, high-performance and scientific computing) in the most efficient and effective way. Emerging computing technologies like image processing, artificial intelligence, deep learning and data science are also covered under these programs. Most of the above CSE areas require initial mathematical knowledge, hence the first year of study is dominated by mathematical courses, primarily discrete mathematics, mathematical analysis, linear algebra, probability theory and statistics, as well as the basics of physics - field theory and electromagnetism.";
		}
		else if(PARAGRAPH_NO=="1"){
			originalText = "Pure computer science programs lectured on non-technical universities typically centers primarily around theory and software, with only some hardware;[1] upper division courses tend to allow much freedom to specialize in software and theory related areas (e.g. algorithms, artificial intelligence, cryptography/security, graphics/visualization, numerical and symbolic computing, operating systems/distributed processing, software engineering). In contrast, pure computer engineering programs tend to resemble computer science at the lower division with similar introductory programming and math courses, but diverges from computer science at the upper division with heavy electrical engineering requirements (e.g. metrology, digital and analog circuits, integrated circuit design, VLSI design and control systems). Despite the overlap with computer science at the lower division level, computer engineering skews much more heavily toward the electronics side that it has more in common with electrical engineering. Computer Science & Engineering program integrates all of the above and is intended to develop a solid understanding of the entire machine (computer hardware and software).[2] The higher unit count required to complete the program often means that a CSE student will need to spend an extra year in university.";
		}
	}
	return originalText;
}