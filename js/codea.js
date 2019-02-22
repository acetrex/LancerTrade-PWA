// Initialize your app
var myApp = new Framework7({
	  modalTitle: 'Trial',
  	init: true,
    pushState: true,

    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

var selType=0;
var $$ = Dom7;
var gUser="NULL";
var gID=1;
var gType="F";
var cf=0;
var gGender;
var qID=gID;
var qGen=0;

////////////////////////////////////////////////////////////////////////////////
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
////////////////////////////////////////////////////////////////////////////////
myApp.onPageInit("index", function (page){
  //console.log('welcome');
	$('#logo').fadeIn("slow");
}).trigger();
////////////////////////////////////////////////////////////////////////////////

function signIn(){
  var user = $$('#username').val();
  var pass = $$('#password').val();

  if(user.length == 0 || pass.length == 0){
			myApp.alert("ID or Password is Incorrect","Login Error");
			return;
    }

  $$.post("php/login.php",{username:user, password:pass},function(data){
      var data = JSON.parse(data);
			console.log(data);
			if(data.check=="YES"){
				gType=data.type;
				gUser=data.user;
				gID=data.id;
			openDashboard();
			}
			else {myApp.alert("ID or Password is Incorrect","Login Error");
		}
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function signUpUser(){
	myApp.closeModal();
  mainView.router.loadPage( 'aasignup.html' );
}

function freelanceSelection(){
	var hire=document.getElementById('HirerSelect');
	hire.style.backgroundColor="white";
	hire.style.color="#2196f3";
	var free=document.getElementById('FreelanceSelect');
	free.style.backgroundColor="#2196f3";
	free.style.color="white";
	selType=1;
}

function hirerSelection(){
	var hire=document.getElementById('HirerSelect');
	hire.style.backgroundColor="#2196f3";
	hire.style.color="white";
	var free=document.getElementById('FreelanceSelect');
	free.style.backgroundColor="white";
	free.style.color="#2196f3";
	selType=2;
}

function signUp(){
	var users = $$('#usernameSignUp').val();
  var passs = $$('#passwordSignUp').val();
  var emails = $$('#emailSignUp').val();
	if(users.length == 0)	{document.getElementById('signUpErr').innerHTML = "Username Cannot Be left blank";return;}
	if(passs.length == 0)	{document.getElementById('signUpErr').innerHTML = "Password Cannot Be left blank";return;}
	if(emails.length == 0)	{document.getElementById('signUpErr').innerHTML = "Email Cannot Be left blank";return;}
	if(selType == 0)	{document.getElementById('signUpErr').innerHTML = "Select one of the above";return;}
	$$.post("php/signup.php",{username:users, password:passs, email:emails, selection:selType},function(data){
      var data = JSON.parse(data);
      console.log(data);
			if(data==2){document.getElementById('signUpErr').innerHTML = "Username already taken";return;}
			if(data==3){document.getElementById('signUpErr').innerHTML = "Email already belongs to another account";return;}
			if(data==1){myApp.alert("Please Login To Continue","Account Created");}
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////

function openDashboard(){
	myApp.closeModal();
	mainView.router.loadPage( 'dashboard.html' );
}

function logOut(){
	myApp.closePanel();
	mainView.router.loadPage( 'index.html' );
}

myApp.onPageInit("dashboard", function (page){

if(gType=='F'){
	$$('#panelLeft').empty().append("<span style='color:grey;font-size:8vw;'>"+gUser+"<span><br>");
	$$('#panelLeft').append("<span style='color:grey;font-size:4vw;'>Freelancer<span>");
	$$('#panelLeft').append("<p><a href = '#' onclick='openProfile()'>My Profile</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='openProfileEdit()'>Edit Profile</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='openProps()'>Job Board</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='myApp.closePanel()'>Close Panel</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='logOut()'>Log Out</a></p>");

		$$.post("php/propFetch.php",{id:gID},function(data){
		var data=JSON.parse(data);
		//console.log(data);
		$$('#offers').append("<center> Your Offers </center>");
		for(i=0;i<data.length;i+=6)
		{
			htmla="<form class='list-block' onclick='openProfileH("+data[i+5]+")'><ul><li><div class='item-content'><div class='item-media'><i class='icon f7-icons'>box</i></div><div class='item-inner'><div class='item-title label'>Project</div><div class='item-after'><span >"+data[i]+"</span><span >&nbsp;&nbsp;</span>"
			htmla+="</div></div></div></li><li><div class='item-content'><div class='item-media'><i class='icon f7-icons'>timer</i></div><div class='item-inner'><div class='item-title label'>Duration</div><div class='item-after'><span>"+data[i+1]+"</span><span>&nbsp;&nbsp;</span>"
			htmla+="</div></div></div></li><li><div class='item-content'><div class='item-media'><i class='icon f7-icons'>money_dollar</i></div><div class='item-inner'><div class='item-title label'>Pay</div><div class='item-after'><span >"+data[i+2]+"</span><span >&nbsp;&nbsp;</span>"
			htmla+="</div></div></div></li><li class='align-top'><div class='item-content'><div class='item-media'><i class='icon f7-icons'>info</i></div><div class='item-inner'><div class='item-title label' style='overflow:visible;'>Description<br></div><div class='item-after'><p style='margin-top:0vw;'>"+data[i+4]+"</p><span >&nbsp;&nbsp;</span>"
			htmla+="</div></div></div></li></ul></form>";
			$$('#offers').append(htmla);
			//console.log(data[i])
		}
	});






	//$$('#panelLeft').append("<p><a href = '#' onclick='logOut()'>Log Out</a></p>");
}
if(gType=='H'){
	$$('#panelLeft').empty().append("<span style='color:grey;font-size:8vw;'>"+gUser+"<span><br>");
	$$('#panelLeft').append("<span style='color:grey;font-size:4vw;'>Hirer<span>");
	$$('#panelLeft').append("<p><a href = '#' onclick='openProfileH(gID)'>My Profile</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='openProfileEditx()'>Edit Profile</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='loadProfList()'>Search Freelancers</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='sendProp()'>Post Job</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='myApp.closePanel()'>Close Panel</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='logOut()'>Log Out</a></p>");
}
});

function openLeftPanel()
{myApp.openPanel('left');}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function openProfileH(){
	myApp.closePanel();
	qID=gID;
	mainView.router.loadPage( 'hprofile.html' );
}

function openProfileH(id){
	//myApp.closePanel();
	qID=id;
	mainView.router.loadPage( 'hprofile.html' );
}

myApp.onPageInit("profileHirerView", function (page){
  profileLoadH(qID);
});

function profileLoadH(xID)
{
	$$.post("php/hFetch.php",{id:xID},function(data){
		var data=JSON.parse(data);
		qGen=data.gender;
		if(data.gender=="F"){
			$$("#profImage").attr('src',"slides/img_avatar2.png");
			//$$("#profBack").css('background-image', 'linear-gradient(to bottom right, #66ccff , #3366ff)');
			$('#profBack').css({background: "-webkit-linear-gradient(-45deg, #8fc800 0%,#299a0b 100%)"});
		}
		gGender=data.gender;
		$$('#profName').empty().append(data.name);
		$$('#profEmail').empty().append(data.email);
		$$('#profContact').empty().append(data.contact);
		$$('#profAge').empty().append(data.location);
	});
}


//////////////////////////////////////////////////////////////////////////////////////////////////////

function openProfile(){
	myApp.closePanel();
	qID=gID;
	mainView.router.loadPage( 'profile.html' );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function openProfileEditx()
{
	myApp.closePanel();
	mainView.router.loadPage( 'signup3x.html' );
}

myApp.onPageInit("cSignupx", function (page){
  $$('#editProfileRight').empty().append("<button class='button' onclick='editProfilex()'>Save</button>");
});

function editProfilex(){
	var signUpName=$$('#signUpName').val();
	var signUpEmail=$$('#signUpEmail').val();
	var signUpContact=$$('#signUpContact').val();
	var signUpLocation=$$('#signUpLocation').val();

	$$.post("php/hDetails.php",{id:gID, sName:signUpName, sEmail:signUpEmail, sContact:signUpContact,sLoc:signUpLocation},function(){
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function openProfileEdit()
{
	myApp.closePanel();
	mainView.router.loadPage( 'signup3.html' );
}

var numExp=0;
myApp.onPageInit("cSignup", function (page){
  $$('#editProfileRight').empty().append("<button class='button' onclick='editProfile()'>Save</button>");
	$$('input[type="checkbox"]').prop('checked', true);
});

function hideOngoing(para){
	str="#s"+para.id;
	if ($$(str+4).is(":checked")==false){
		$(str+8).hide();
	}
	if ($$(str+4).is(":checked")==true){
		$(str+8).show();
	}
}

function addExp(){
	numExp++;
	console.log("num="+numExp);
	var shtmla="<form id='profileForm' class='list-block' style='margin-top:0vw;'>";
	var shtmlb="<ul><li><div class='item-content'><div class='item-media'><i class='icon f7-icons'>person</i></div>";
	var shtmlc="<div class='item-inner'><div class='item-title label'>Title</div><div class='item-input'><input type='text' placeholder='Title' id='signUpE"+numExp+"1'></div></div></div></li>";
	var shtmld="<li><div class='item-content'><div class='item-media'><i class='icon f7-icons'>calendar</i></div><div class='item-inner'><div class='item-title label'>Start</div><div class='item-input'><input type='date' placeholder='Birth day' value='2014-04-30' id='signUpE"+numExp+"2'></div></div></div></li>";
	var shtmle="<li><div class='item-content'><div class='item-media'><i class='icon f7-icons'>home</i></div><div class='item-inner'><div class='item-title label'>Company</div><div class='item-input'><input type='text' placeholder='Company Name' id='signUpE"+numExp+"3'></div></div></div></li>";
	var shtmlf="<li><div class='item-content'><div class='item-media'><i class='icon f7-icons'>check</i></div><div class='item-inner'><div class='item-title label'>Ongoing?</div><div class='item-input'><label class='label-switch'><input type='checkbox' id='signUpE"+numExp+"4'><div class='checkbox' id='ignUpE"+numExp+"' onclick='hideOngoing(this)'></div></label></div></div></div></li>";
	var shtmlg="<li id='signUpE"+numExp+"8'><div class='item-content'><div class='item-media'><i class='icon f7-icons'>calendar</i></div><div class='item-inner'><div class='item-title label'>End</div><div class='item-input'><input type='date' placeholder='Birth day' value='2000-01-01' id='signUpE"+numExp+"5'></div></div></div></li></ul></form>";
	$$('#Expholder').append(shtmla+shtmlb+shtmlc+shtmld+shtmle+shtmlf+shtmlg);
}

function editProfile(){
	var signUpName=$$('#signUpName').val();
	var signUpEmail=$$('#signUpEmail').val();
	var signUpGender=$$('#signUpGender').val();
	var signUpContact=$$('#signUpContact').val();
	var signUpLocation=$$('#signUpLocation').val();
	var signUpShowContact=($$('#signUpShowContact').is(":checked")+"");
	var signUpBirthdate=$$('#signUpBirthdate').val();
	var signUpDesc=$$('#signUpDesc').val();
	var signUpLinkedin=$$('#signUpLinkedin').val();

var expArr=[];
var str='#signUpE';
	for(i=1;i<numExp+1;i++){
		expArr.push($$(str+i+1).val()+" ");
		expArr.push($$(str+i+2).val());
		expArr.push($$(str+i+3).val()+" ");
		if ($$(str+i+4).is(":checked")){expArr.push(1);}
		else{expArr.push(0);}
		expArr.push($$(str+i+5).val());
	}
	var expArrJ = JSON.stringify(expArr);

	$$.post("php/sDetails.php",{id:gID, sName:signUpName, sEmail:signUpEmail, sGender:signUpGender,sContact:signUpContact,sShowC:signUpShowContact,sBirth:signUpBirthdate,sDesc:signUpDesc,sLink:signUpLinkedin,sLoc:signUpLocation},function(){
  });
if(numExp)
{
	$$.post("php/expDetails.php",{id:gID,expArr:expArrJ},function(data){
		var data=JSON.parse(data);
		console.log(data.arr);
		console.log(data.x);
  });
}
	mainView.router.loadPage( 'signup2.html' );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.onPageInit("cIndex", function (page){
	cFetch();
});

function cFetch(){
	var i=0;
	$$.post("php/cFetch.php",{},function(data){
		var data = JSON.parse(data);
		$$('#cList').empty();
		for(i=0;i<data.length;i+=2)
		{
		var dispa="<li><label class=\"label-checkbox item-content\"><input type=\"checkbox\" id='cFetch"+(i/2+1)+"' name=\"my-checkbox\" value=\"";
		var dispb="\"><div class=\"item-media\"><i class=\"icon icon-form-checkbox\"></i></div><div class=\"item-inner\"><div class=\"item-title\">";
		var dispc="</div></div></label></li>";
		$$('#cList').append(dispa+data[i]+dispb+data[i+1]+dispc);
	}
		cf=i/2;
});
}

function cFetchSave(){
	var cFetchArr=[];
	for(i=0;i<cf;i++)
	{
		if($$("#cFetch"+(i+1)).is(":checked")){
				cFetchArr.push(i+1);
		}
	}
	var cFetchArr = JSON.stringify(cFetchArr);

	$$.post("php/cSkills.php",{id:gID,cArr:cFetchArr},function(data){
		var data=JSON.parse(data);
		console.log(data.x);
		//console.log(data.x);
  });
	qID=gID;
	mainView.router.loadPage( 'profile.html' );
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.onPageInit("profileView", function (page){
  profileLoad(qID);
});

function profileLoad(xID)
{
	$$.post("php/pFetch.php",{id:xID},function(data){
		var data=JSON.parse(data);
		qGen=data.gender;
		if(data.gender=="F"){
			$$("#profImage").attr('src',"slides/img_avatar2.png")
			//$$("#profBack").css('background-image', 'linear-gradient(to bottom right, #66ccff , #3366ff)');
			$('#profBack').css({background: "-webkit-linear-gradient(-45deg, #8fc800 0%,#299a0b 100%)"});
		}
		gGender=data.gender;
		$$('#profName').empty().append(data.name);
		$$('#profDescription').empty().append(data.desc);
		$$('#profEmail').empty().append(data.email);
		$$('#profContact').empty().append(data.contact);
		$$('#profAge').empty().append(data.bday+"");
	});
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

function profExpPage(){
mainView.router.loadPage( 'profileb.html' );
}

myApp.onPageInit("profileb", function (page){
	profileExpLoad();
});

function profileExpLoad(){
	if(qGen=="F"){
		$('#profBackB').css({background: "-webkit-linear-gradient(-45deg, #8fc800 0%,#299a0b 100%)"});
	}
	$$.post("php/pFetchExp.php",{id:qID},function(data){
		var data=JSON.parse(data);
		for(i=0;i<data.length;i+=5)
		{
			var chx=0;
			if(data[i+3]==1){
				chx='Ongoing';}
			else chx=data[4+i];
			htmla="<br><div style='background-color:rgba(255, 255, 255, 0.56);width:87vw;border-radius:1vw;'><span style='text-align:left;font-size:5vw;line-height:-10vw;'>&nbsp;Worked at :"+data[0+i];
			htmla+="<br>&nbsp;As :"+data[1+i]+"<br>&nbsp;From :"+data[2+i]+"<br>&nbsp;To :"+chx+"</span></div>";
			$$('#expDiv').append(htmla);
		}
	});
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function profEduPage(){
mainView.router.loadPage( 'profilec.html' );
}

myApp.onPageInit("profilec", function (page){
	if(qGen=="F"){
		$$('#profBackC').css({background: "-webkit-linear-gradient(-45deg, #8fc800 0%,#299a0b 100%)"});
	}
	if (gType=="F"){
		$$('#profNext').css("display","none");
	}

	$$.post("php/sFetch.php",{id:qID},function(data){
		var data=JSON.parse(data);
		console.log(data);
		for(i=0;i<data.length;i++)
		{
			htmla="<br><div style='background-color:rgba(255, 255, 255, 0.56);width:80vw;border-radius:1vw;'><span style='font-size:5vw;margin:1vw;'>"+data[i]+"</span></div>";
			$$('#skillDiv').append(htmla);
		}
	});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
function profContPage(){
mainView.router.loadPage( 'profiled.html' );
}

function sendConnectR(){
$$("#sendConnect").empty().append("Request Sent");
$$("#sendConnect").attr('class','button disabled');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function openMyProp(){
	myApp.closePanel();
	mainView.router.loadPage( 'proplist.html' );
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
function loadProfList(){
	myApp.closePanel();
	mainView.router.loadPage( 'proflist.html' );
}

myApp.onPageInit("profileList", function (page){
  profList();
});

function profList(){
	console.log("hey");

	$$.post("php/profList.php",{id:qID},function(data){
		var data=JSON.parse(data);
		$$("#profList").empty();
		for(i=0;i<data.length;i+=6){
			iLink="slides/img_avatar.png";
			cLink="profBackM";

			if(data[i+3]=="F"){
				iLink='slides/img_avatar2.png';
				cLink="profBackF";
			}

			htmly="<div class='"+cLink+"' onclick='openProfileList("+data[i+5]+")'><div style='margin-left:5vw;'><div class='row'><div class='col-20'><img class='profImage' style='height:13vh;margin-top:5vw;clip-path: circle(50% at 50% 50%);' src='"+iLink+"'></img>";
			htmly+="</div><div class='col-55'><div><ul><li> Name: <span>"+data[i]+"</span> </li><li> Location: <span>"+data[i+1]+"</span> </li>";
			htmly+="<li> Rating: <span> ";
			console.log(data[i+4]);
			for(j=1;j<=(data[i+4]/2);j++){
				htmly+="<img src='res/star.svg' style='height:2vh;'></img>";
			}
			if(data[i+4]%2) htmly+="<img src='res/star-half.svg' style='height:2vh;'></img>";
			htmly+="</span></li>";
			/*
			<li> Skills: <span id="profListSkills">ABC</span> </li>
			htmlx="<li> Name: <span>"+data[i]+"</span> </li>";
			htmlx+="<li> Location: <span>"+data[i]+"</span> </li>";
			htmlx+="<li> Email: <span>"+data[i]+"</span> </li>";
			htmlx+="<li> Rating: <span></span></li>";*/
			htmly+="</ul></div></div><div class='col-25'></div></div></div>";
			$$("#profPage").append(htmly);
		}
	});
}

function openProfileList(xID){
	myApp.closePanel();
	qID=xID;
	mainView.router.loadPage( 'profile.html' );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function sendPropFile(){
	$$("#proptext1").empty().append("Request Sent");
	$$("#sendPropX").attr('class','button disabled');

	var propTitle = $$('#propTitle').val();
	var propDuration = $$('#propDuration').val();
	var propPay = $$('#propPay').val()+"";
	var propNeg =($$('#propNeg').is(":checked")+0);
	var propDesc = $$('#propDesc').val();
	console.log(propTitle);
	console.log(propDuration);
	console.log(propPay);
	console.log(propNeg);
	console.log(propDesc);
	//ptitle:propTitle, dur:propDuration, pay:propPay, neg:propNeg, desc:propDesc
	$$.post("php/propNAdd.php",{id:qID,Hid:gID,ptit:propTitle,dur:propDuration,pay:propPay, neg:propNeg, desc:propDesc},function(data){
		var data=JSON.parse(data);
		console.log(data.x);
	});
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
function sendProp(){
	myApp.closePanel();
	mainView.router.loadPage( 'propN.html' );
}

myApp.onPageInit("propN", function (page){
  //propN();
});

function sendPropN(){
var propTitle = $$('#propTitle').val();
var propDuration = $$('#propDuration').val();
var propPay = $$('#propPay').val()+"";
var propNeg =($$('#propNeg').is(":checked")+0);
var propDesc = $$('#propDesc').val();

$$("#sendProp").empty().append("Request Sent");
$$("#sendProp").attr('class','button disabled');

console.log(propTitle);
console.log(propDuration);
console.log(propPay);
console.log(propNeg);
console.log(propDesc);
//ptitle:propTitle, dur:propDuration, pay:propPay, neg:propNeg, desc:propDesc
$$.post("php/propAdd.php",{id:gID,ptit:propTitle,dur:propDuration,pay:propPay,neg:propNeg, desc:propDesc},function(data){
	var data=JSON.parse(data);
	console.log(data.x);
});

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function openProps()
{
	myApp.closePanel();
	mainView.router.loadPage( 'propV.html' );
}

myApp.onPageInit("propListV", function (page){
  propListLoad();
});

function propListLoad(){
	$$.post("php/propLoad.php",{id:gID},function(data){
		var data=JSON.parse(data);
		console.log(data);

		for(i=0;i<data.length;i+=6)
		{
			htmla="<form class='list-block' onclick='openProfileH("+data[i+5]+")'><ul><li><div class='item-content'><div class='item-media'><i class='icon f7-icons'>box</i></div><div class='item-inner'><div class='item-title label'>Project</div><div class='item-after'><span >"+data[i]+"</span><span >&nbsp;&nbsp;</span>"
			htmla+="</div></div></div></li><li><div class='item-content'><div class='item-media'><i class='icon f7-icons'>timer</i></div><div class='item-inner'><div class='item-title label'>Duration</div><div class='item-after'><span>"+data[i+1]+"</span><span>&nbsp;&nbsp;</span>"
			htmla+="</div></div></div></li><li><div class='item-content'><div class='item-media'><i class='icon f7-icons'>money_dollar</i></div><div class='item-inner'><div class='item-title label'>Pay</div><div class='item-after'><span >"+data[i+2]+"</span><span >&nbsp;&nbsp;</span>"
			htmla+="</div></div></div></li><li class='align-top'><div class='item-content'><div class='item-media'><i class='icon f7-icons'>info</i></div><div class='item-inner'><div class='item-title label' style='overflow:visible;'>Description<br></div><div class='item-after'><span>"+data[i+4]+"</span><span >&nbsp;&nbsp;</span>"
			htmla+="</div></div></div></li></ul></form>";
			$$('#propListBlock').append(htmla);
			console.log(data[i])
		}
	});

}

//////////////////////////////////////////////////////////////////////////////////////////////////////
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady: function() {
		initPushwoosh();
		document.addEventListener("backbutton", CallbackFunction(), false);
	}
};
////////////////////////////////////////////////////////////////////////////////
myApp.init();
