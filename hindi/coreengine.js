if(!localStorage['isValid'])
	location.href = "https://dhruva011.github.io/hindi/";

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
	
	location.href = "https://dhruva011.github.io/hindi/report.html";
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
	location.href = "https://dhruva011.github.io/hindi/demo.html";
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
			originalText = "Jhen~Hkxon~xhrk iksLV vkjrh laxzg oØrqaM egkdk; lw;ZdksfV leizHkaA fufoZ?ua dqeZsnso loZdk;ZsZ’kq loZnkAA deZ.;sokf/kdkjLrs ek Qys’kq dnkpuA ek deZQygsrqHkwZek rs lXMk•RodeZf.kAA • lR;ekxZ bl osclkbV esa izkphu Hkkjr ds vusd rF;ksa dks lekfgr fd;k x;k gSA gekjk iwjk iz;kl ;g jgk gS fd ge lHkh okafNr rF;ksa dks iznf”kZr dj ldsaA ;fn dksbZ =qfV ;k Hkwy gksrh gS rks ge blds fy, {kek izkFkhZ gSaA [kkstsa gekjk iz;kl Hkkjrh; laLd`fr dk izpkj ,oa izlkj djuk gSA /keZ{ks=s dq#{ks=s leosrk ;q;qRlo% A Ekkedk% ik.MoPJSo fdedqoZr la¥; AA1AA HkkokFkZ& /k`rjk’Vª us lat; ls dgk] dq#{ks= esa ;q) dh bPNk ls ,d= gq, esjs rFkk ik.Mq iq=ksa us D;k fd;kA Lkkjka”k& dkSjoksa dk firk /k`rjk’Vª vius iq=ksa dh fot; ds fy, lafnX/k Fkk blh ds dkj.k mlus vius lfpo lat; ls iwaNk ßmUgksaus D;k fd;k gSAÞ n`’V~ok rq ik.Mkuhda O;w nq;ksZ/kuLrnk A vkpk;Zeqilx~³E; jktk opueczohr~ AA2AA HkkokFkZ& lat; us /k`rjk’Vª ls dgk] ik.Mqiq=ksa }kjk lsuk dh jpuk ns[kdj nq;ksZ/ku us vius xq# ds le{k tkdj ;s “kCn dgsA Lkkjka”k& lat; us jktk dks crk;k fd mldk iq= nq;kZs/ku ik.Moksa dh lsuk dks ns[kdj rqjar gh vius lsukifr o xq# nzks.kkpk;Z dks ;FkkfLFkfr dh lwpuk nsus igq¡p x;kA Ik”;Srka ik.Mqiq=k.kkekpk;Z egrha pewe~ A O;wka nzqiniq=s.k ro f”k’;s.k /kherk AA3AA HkkokFkZ& nq;kZs/ku us vius xq# nzks.kkpk;Z ls dgk fd gs vkpk;Z ik.Mqiq=ksa dh fo”kky lsuk dks ns[ksa] ftls vkids f”k”; nzqin ds iq= us cM+s dkS”ky ls lqO;ofLFkr fd;k gSA Lkkjka”k& nq;kZs/ku us vius xq# nzks.kkpk;Z ls dgk] vkpk;Z ik.Mqiq=ksa dh lsuk ftldh O;wg jpuk nzqin iq= }kjk dh xbZ gS mls vki ns[ksa] og vius xq# dks ;g crkuk pkg jgk Fkk fd dgha os vius fiz; f”k’; ik.Moksa ds izfr ;q) esa mnkjrk u fn[kk,aA v= Jwjk egs’oklk HkhektqZulek ;qf/k A ;q;q/kkuks fojkVPJ egkjFk% AA4AA HkkokFkZ& nq;kZs/ku vius xq# nzks.kkpk;Z ls dgrk gS fd gs vkpk;Z bl lsuk esa Hkhe rFkk vtqZu tSls ;q) djus okys vusd ohj ;ks)k gSa tSls egkjkFkh ;q;q/kku] fojkV rFkk nzqinA Lkkjka”k& nq;kZs/ku vius xq# ds le{k viuk Hk; fn[kkrs gq, dgrk gS fd gs vkpk;Z ik.Moksa dh lsuk esa izR;sd ohj ;ks)k Hkhe rFkk vtqZu ds leku vts; gSaA /k`’VdsrqPJsfdrku% dkf”kjktPJ oh;Zoku~A Ikq#ftRdqfUrHkkstPJ “kSC;PJ ujiqx~³o% AA5A HkkokFkZ& nq;kZs/ku vius xq# nzks.kkpk;Z ls vU; ;ks)kvksa dk o.kZu djrs gq, dgrk gS fd /k`’Vdsrq] psfdrku] dkf”kjkt] iq#ftr~] dqfUrHkkst rFkk “kSC; tSls vusd egku “kfDr”kkyh ;ks)k Hkh ik.Mqiq=ksa dh lsuk esa gSaA Lkkjka”k& nq;kZs/ku ik.Mqiq=ksa dh lsuk ls viuk Hk; iznf”kZr djrs gq, vius xq# ls dgrk gS fd gs xq# nzks.k ik.Mqiq=ksa dh lsuk esa Hkhe o vtZqu tSls egku ;ks)kvksa ds lkFk gh /k`’Vdsrq] psfdrku] dkf”kjkt] iq#ftr~] dqfUrHkkst rFkk “kSC; vkfn egku “kfDr”kkyh ;ks) Hkh mifLFkr gSa] ftudk vkidks lkeuk djuk gSA";
		}
		else if(PARAGRAPH_NO=="1"){
			originalText = "dkSjoksa dk firk /k`rjk’Vª vius iq=ksa dh fot; ds fy, lafnX/k Fkk blh ds dkj.k mlus vius lfpo lat; ls iwaNk ßmUgksaus D;k fd;k gSAÞ";
		}
	}
	return originalText;
}