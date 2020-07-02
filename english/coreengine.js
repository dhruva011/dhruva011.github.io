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
			originalText = "Met. Set., rat cat bat ,,fat map, ., ,. Day, can, dog, cub, fog, log. Pen. Den, tap , may set, rat, fog,. Nod. Hit, sit. Bit. Lit., can. Map’ hat” tip now? Hot, lip, tin, box, rod, sin, boy, hit. Say, pay. May, had. Has, sum. Let. Bet, sun., end but., him get, add, new, yes. Her. Him. His, ant, car, bed.cow. dye dog. Key.key, net’set. Fog’ ten, map, win, set, mat, pig, mug, bug?, Dot, bag, hat., jam ant.. fox,? Ban man” fat, den, ran, van, man, cap ?  met net set” bee see’ bus car, war fan. Cab.";
		}
		else if(PARAGRAPH_NO=="1"){
			originalText = "Once. next ,time warm time, next .once, tame ,farm ,from sick, love, bare ,read, ring, nest, from, time, once, tame, farm, hill into Whom?game, male. Whom? Hail, some, moon. Most, rose. Rise rare’ rome ,more .must ,come, mock ,rule, here, rare, body baby. Gone, stop lock ,love long, coin, dove, fark, horn, back pick,. Dock. Whom? Hack. Jack. Wide, ride. Side, life. Size, dive. Five, like., read, nest, rose. Gone, coin. Game, take’ Whom? huge”. Hand: fish,: drum:book. Bank, list , frog, star. Girl, clam. Cake., cool roof . cook, give, gold good gone, find, best. Bill, fear,. Cash dash land.’ dare.  When? Whom?";
		}
	}
	else if(DIFFICULTY=="Medium"){
		if(PARAGRAPH_NO=="0"){
			originalText = "Once ,there was a young boy. This boy had problems controlling his anger. When he got angry, he would say the first thing that came to mind, even if it affected people. One day, his father gifted him a hammer and a bundle of nails, then said, \"Whenever you get man, hammer a nail into the backyard fence.\" In the first days, the boy used up half of the nails. Over the next weeks, he used up fewer nails, until his temper was under control. Then his father asked the young boy to remove a nail for each day he didn't lose his temper. On the day when the boy removed his last nail, his father told him, \"You have done good, boy. But, can you see the holes in the wall? The fence is never going to be the same. Likewise, when you say mean things in anger, you'll leave a scar.";
		}
		else if(PARAGRAPH_NO=="1"){
			originalText = "A lion was once sleeping in the jungle when a mouse started running up and down his body just for fun. This disturbed the lion's sleep, and he woke up quite angry. He was about to eat the mouse when the mouse desperately requested the lion to set him free. \"I promise you, I will be of great help to you someday if you save me.\" The lion laughed at the mouse's confidence and let him go. One day a few hunters came into the forest and took the lion with them. They tied him up against a tree. The lion was struggling to get out and started to whimper. Soon, the mouse walked past and noticed the lion in trouble. Quickly, he ran and gnawed on the ropes to set the lion free. Both of them sped off into the jungle.";
		}
		else if(PARAGRAPH_NO=="2"){
			originalText = "One day, king Akbar asked a question in his court that left everyone in the courtroom puzzled. As they all tried to figure out the answer. Birbal walked in and asked what the matter was. They repeated the question to him. The question was, \"How many crows are there in the city?\" Birbal immediately smiled and went up to akbar. He announced the answer; he said there were twenty-one thousand, five hundred and twenty-three crows in the city. When asked how he knew the answer, birbal replied, \"Ask your men to count the number of crows. If there are more, then the relatives of the crows must be visiting them from nearby cities. If there are fewer, then the crows from our city must be visiting their relatives who live outside the city,\" Pleased with the answer, Akbar presented birbal with a ruby and pearl chain.";
		}
		else if(PARAGRAPH_NO=="3"){
			originalText = "This is a story that explains how adversity is met differently by different people. There was a girl named Asha who lived with her mother and father in a village. One day, her father assigned her a simple task. He took three vessels filled with boiling water. He placed an egg in in vessel, a potato in the second vessel, and some tea leaves in the third vessel. He asked Asha to keep an eye on the vessels for about ten to fifteen minutes while the three ingredients in three separate vessels boiled. After the said time, he asked Asha to peel the potato and egg, and strain the tea leaves. Asha was left puzzled – she understood her father was trying to explain her something, but she didn't know what it was. Her father explained, \"All three items were put in the same circumstances. See how they've responded differently.\" He said that the potato turned soft, the egg turned hard, and the tea leaves changed the colour and taste of the water. He further said, \"We are all like one of these items. When adversity calls, we respond exactly the way they do. Now, are you a potato, and egg, or tea leaves?\"";
		}
		else if(PARAGRAPH_NO=="4"){
			originalText = "There was once a woodcutter, working hard in the forest, getting wood to sell for some food. As he was cutting a tree, his axe accidentally fell into the river. The river was deep and was flowing really fast – he lost his axe and could not find it again. He sat at the bank of the river and wept. While he wept, the God of the river arose and asked him what happened The woodcutter told him the story. The God of the river offered to help him by looking for his axe. He disappeared into the river and retrieved a golden axe. But the woodcutter said it was not his. He disappeared again and came back with a silver axe, but the woodcutter said that was not his either. The God disappeared into the water again and came back with an iron axe – the woodcutter smiled and said it was his. The God was impressed with the woodcutter’s honesty and gifted him both the golden and silver axes.";
		}
	}
	else if(DIFFICULTY=="Hard"){
		if(PARAGRAPH_NO=="0"){
			originalText = "Discipline is the most essential quality of life. It is in fact the greatest law of nature. It is necessary  not only in Army but it is equality important in schools, colleges and homes. It is necessary in the personal life of everybody. The nature is very disciplined as the sun rises in the East and sets I the West. The earth continues moving around the sun. Discipline is necessary for health and also for progress in life. One should be regular in one's habit of food, study and sleep. It is the only key to success. To succeed in life a student should follow school discipline. Morning assembly in schools is very important for discipline in students. He should obey his teachers and elders. The importance of discipline has increased due to progress in civilization. Discipline means a traning that teaches self-control, obedience, cooperation and punctuality. Indian Army is famous for its discipline The students of India should be disciplined like our soldiers. Then only India can become a strong nation. In short, discipline makes us better citizens.";
		}
		else if(PARAGRAPH_NO=="1"){
			originalText = "'Work is Worship' said Carlyle, and a greater truth was never uttered. Many are the blessings of work. All that humanity has achieved during the course of generation was a result of hard work over long period of time. Man-to-day boasts that he is the highest of all creatures, that he the roof and crown of all created beings. He owes all his greatness to hard work, it is the unique privilege of man to change and master his environment through hard and constant work. Man is human because he is capable of hard work, while the animal is not. However, it should be remembered that when we say that \"work is worship\" we mean work which is useful and wholesome for society. It should lead to the well being for society. It should lead to the well being of society, to its prosperity, and freedom from pain and poverty. Work which is harmful for society is not a blessing, but a curse. Waging war, manufacture of poisonous drugs and weapons of destruction, smuggling, and other such anti-social activities, can never be a blessing for mankind, If such work is at all worship, it is worship of the Devil and not the God.";
		}
		else if(PARAGRAPH_NO=="2"){
			originalText = "The old scheme of values is now falling into pieces. Looking around a man now easily finds that dishonest and corrupt people are making steady progress and are materially prosperous. Naturally, a question arises for him – what is the necessity of maintaining strict honesty or following an honest course of life? The answer is, however, not far to seek. Some people may gain some high post or score a spectacular success by questionable means but that is all in the short run. Ultimately, it is the honest and upright man that wins the palm(glory). So Swami vivekanada used to say – no noble deed can be performed by clever tricks. Devotion and diligence are called for to accomplish every work, great or small.";
		}
		else if(PARAGRAPH_NO=="3"){
			originalText = "Education in India is provided by the public sector as well as the private sector, with control and funding coming from three levels: federal, state and local. Child education is compulsory. The Nalanda University was the oldest university-system of education in the world. Western education became ingrained into Indian society with the establishment of the British Raj. India has made progress in terms of increasing primary education attendance rate and expanding literacy to approximately two thirds of the population. India's improved education system is often cited as one of the main contributors to the economic rise of India. Much of the progress especially in Higher education, Scientific research has been credited to various public institutions. The private education market in India is merely 5% although in terms of value is estimated to be worth $40 billion in 2008 and will increase to $68 billion by 2012. However, India continues to face stern challenges. Despite growing investment in education, 25% of its population is still illiterate; only 15% of Indian students reach high school, and just 7% graduate. As of 2008, India's post-secondary high schools offer only enough seats for 75% of India's college-age population, 25% of teaching positions nationwide are vacant, and 57% of college professors lack either a master's or PhD degree. As of 2011, there are 1522 degree-granting engineering colleges in India with an annual student intake of 582,000, plus 1,244 polytechnics with an annual intake of 265,000. However, these institutions face shortage of faculty and concerns have been raised over the quality of education.";
		}
		else if(PARAGRAPH_NO=="4"){
			originalText = "One of the main characteristics of self-discipline is the ability to forgo instant and immediate gratification and pleasure, in favour of some greater gain or more satisfying results, even if this requires effort and time. Self discipline gives you the power to stick to your decisions and follow them through, without changing your mind, and is therefore one of the important requirements for achieving goals. The possession of self discipline enables you to choose, and then persevere with actions, thoughts and behaviour which lead to improvement and success. It also gives you the power and inner strength to overcome addictions, procrastination and laziness and to follow through whatever you do. This is a very useful and needed skill in everyone's life, and though most people acknowledge its importance, yet very few do anything to develop and strengthen it. Contrary to common belief, self-discipline is not a severe and limited behaviour or a restrictive lifestyle. It is a very important ingredient for success, any form of success. It expresses itself as perseverance, the ability not to give up despite failure and setbacks, as self control, and as the ability to resist temptations and distractions that tend to stand in the way of attaining aims and goals. In fact, it is one of the most important pillars of real and stable success. This ability leads to self confidence, self esteem and inner strength, and consequently to happiness and satisfaction. On the other hand, lack of self discipline may lead to failure, loss, health and relationships problems, and obesity and to other troubles. Life often presents challenges and problems on the path to success and achievement, and in order to rise above them you have to act with perseverance and persistence, and this requires self discipline. You also this skill to cure and overcome eating disorders, addictions, smoking, drinking and other negative habits. Self discipline is vital for overcoming eating disorders, addictions, smoking, drinking and other negative habits. It is also an important requirement for studying and learning, for developing any skill, and for success in self improvement, spiritual growth and meditation.";
		}
	}
	return originalText;
}