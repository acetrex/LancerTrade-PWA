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

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
//////////////////////////////////////////////////////////////////////////////////////////////////////
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

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.onPageInit("cIndex", function (page){
	//$$('#navbarRight').empty().append("<button onclick=\"msgGet()\">R</button>");
	cFetch();
	console.log("welx");
});
//////////////////////////////////////////////////////////////////////////////////////////////////////
function rsu3()
{

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
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
