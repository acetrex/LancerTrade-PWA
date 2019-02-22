// Initialize your app
var myApp = new Framework7({
	  modalTitle: 'Trial',
  	init: true,
    pushState: true,

    onAjaxStart: function (xhr){
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr){
        myApp.hideIndicator();
    }
});
var selType=0;
var $$ = Dom7;
var gUser="NULL";
var gID="0";

////////////////////////////////////////////////////////////////////////////////
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
////////////////////////////////////////////////////////////////////////////////
myApp.onPageInit("index", function (page){
  console.log('welcome');
}).trigger();
////////////////////////////////////////////////////////////////////////////////

function signIn(){
  var user = $$('#username').val();
  var pass = $$('#password').val();

  if(user.length == 0 || pass.length == 0){
			document.getElementById('LoginInfoText').innerHTML = "Cannot Be left blank";
			return;
    }

  $$.post("php/login.php",{username:user, password:pass},function(data){
      var data = JSON.parse(data);
			console.log(data);
			if(data.check=="YES"){
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
	//console.log("success");
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

myApp.onPageInit("dashboard", function (page){
  console.log('aloha');
	$$('#dashboardRight').empty().append(gUser+" &nbsp;&nbsp;");
	$$('#panelLeft').empty().append("<p><a href = '#' onclick='openProfile()'>My Profile</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='openProfileEdit()'>Edit Profile</a></p>");
	$$('#panelLeft').append("<p><a href = '#' onclick='myApp.closePanel()'>Close Panel</a></p>");
});

function openLeftPanel()
{myApp.openPanel('left');}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function openProfile(){
	myApp.closePanel();
	mainView.router.loadPage( 'profile.html' );
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
	var signUpShowContact=$$('#signUpShowContact').is(":checked");
	var signUpBirthdate=$$('#signUpBirthdate').val();
	var signUpDesc=$$('#signUpDesc').val();

	/*
	$$.post("php/signup.php",{username:users, password:passs, email:emails, selection:selType},function(data){
      var data = JSON.parse(data);
      console.log(data);

  });*/

	console.log(signUpName,signUpEmail,signUpGender,signUpContact,signUpShowContact,signUpBirthdate,signUpDesc);

	for(i=1;i<numExp+1;i++){
		var str='#signUpE';
		var arr=[];
		arr.push($$(str+i+1).val());
		arr.push($$(str+i+2).val());
		arr.push($$(str+i+3).val());
		arr.push($$(str+i+4).is(":checked")+"");
		arr.push($$(str+i+5).val());
		console.log(arr);
	}
	mainView.router.loadPage( 'signup2.html' );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.onPageInit("cIndex", function (page){
	cFetch();
});

function cFetch(){
	var l=0;
	console.log("Triggered");
	$$.post("php/cFetch.php",{},function(data){
		var data = JSON.parse(data);
		console.log(data);
		$$('#cList').empty();
		for(i=0;i<data.length;i+=2)
		{
		var dispa="<li><label class=\"label-checkbox item-content\"><input type=\"checkbox\" name=\"my-checkbox\" value=\"";
		var dispb="\"><div class=\"item-media\"><i class=\"icon icon-form-checkbox\"></i></div><div class=\"item-inner\"><div class=\"item-title\">";
		var dispc="</div></div></label></li>";
		$$('#cList').append(dispa+data[i]+dispb+data[i+1]+dispc);
	}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
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
