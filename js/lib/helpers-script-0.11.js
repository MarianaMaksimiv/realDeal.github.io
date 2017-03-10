var isTouch;
var clickevent;

var windowWidth = 0;
var windowHeight = 0;
var documentWidth = 0;
var	documentHeight = 0;


var javascriptBeaconInterval; 	

var javascriptBeaconFunctionArray = [];
var javascriptStateChangeFunctionArray = [];
var javascriptExecuteOnResizeFunctionArray = [];

function executeAsInterval(myFunction) {
	javascriptBeaconFunctionArray.push(myFunction);
}

function executeOnStateChange(myFunction) {
	javascriptStateChangeFunctionArray.push(myFunction);
}

function executeOnResize(myFunction){
	javascriptExecuteOnResizeFunctionArray.push(myFunction);
}

$(document).ready(function(){		
	javascriptBeaconInterval = setInterval(javascriptBeacon,300);	
	executeAsInterval('sampleFunction');
	executeOnStateChange('sampleFunction');
	//executeOnResize('runRowEqualHeight');
	setNavigationTrail();
});


var resizeWindowWith = -1;
var resizeWindowHeigth = -1;
$( window ).resize(function() {
	myTrace('resize event');
	if ($(window).width() != resizeWindowWith || $(window).heigth() != resizeWindowHeigth) {
		for (i = 0; i < javascriptExecuteOnResizeFunctionArray.length; i++) {
			eval(javascriptExecuteOnResizeFunctionArray[i] + '()');
		}
	}
});

// JavaScript Document
function myTrace(s) {
  try { console.log(s) } catch (e) {  }
}



function checkDevice() {	
	if (window.navigator.msPointerEnabled) {
		clickevent = "MSPointerDown"; 	// IE10 / Windows 8, mouse/touch/pen device
		if (window.navigator.msMaxTouchPoints) {
			isTouch = true;
		} else {
			isTouch = false;
		}
	} else if ("ontouchstart" in window) {
		clickevent = "touchstart";  	// touch device
		isTouch = true;
	} else {
		clickevent = "click";   		// mouse device
		isTouch = false;
	}		
}


checkDevice();


var responsiveState = 'desktop';

function javascriptBeacon() {
	//myTrace(javascriptBeaconFunctionArray);
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	
	documentWidth = $(document).width();
	documentHeight = $(document).height();
	
	//	
	for(i = 0; i < javascriptBeaconFunctionArray.length; i++){
		eval(javascriptBeaconFunctionArray[i]+'()');
	}
	
	
	
	
	var newResponsiveState = 'desktop';
	$(".css-states .css-state").each(function() {
			//myTrace($(this).attr('id')+'  '+$(this).css('font-size'));
			if($(this).css('float') == 'left'){				
				newResponsiveState = $(this).attr('id');
			}
				
	});	
	
	if(newResponsiveState != responsiveState){		
		responsiveState = newResponsiveState;
		responsiveStateChangeEvent();
	}
		
	$('#flags .label').html('w: '+windowWidth+' h: '+windowHeight+'<br>'+responsiveState);

}

function responsiveStateChangeEvent() {
	myTrace('responsiveStateChangeEvent: '+responsiveState);
	for(i = 0; i < javascriptStateChangeFunctionArray.length; i++){
		eval(javascriptStateChangeFunctionArray[i]+'()');
	}
		
}


function setNavigationTrail() {
	//myTrace('sampleFunction');
	$('nav li').each(function(){
		//myTrace(this);
			checkIfActiveSetTrail(this);
			
		}	
	)
	
}

function checkIfActiveSetTrail(node) {
	if($(node).hasClass('active') || $(node).hasClass('active-trail')){
		var parent = $(node).parent();
		parent.addClass('active-trail');
		checkIfActiveSetTrail(parent);		
	}
}

function sampleFunction() {
	//myTrace('sampleFunction');
	
	
}


function truncateTo(id,height){
	oldHeight = $('#'+id).css('height');
	myTrace(id+' '+oldHeight);
	//console.log(id+" "+parseFloat(height)+" "+parseFloat(oldHeight));
	$('#less-button-for-'+id).remove();
	
	if(parseFloat(height) < parseFloat(oldHeight)){			
	
		$('#'+id).css({'height':height,'overflow':'hidden'});		
		$('#'+id).after("<div id='more-button-for-"+id+"' class='trunc-button more-link' ><a  href='javascript:showMoreOfTruncated(\""+id+"\")' >more</a></div>");
		$('#'+id).after("<div id='less-button-for-"+id+"' class='trunc-button more-link hidden' ><a  href='javascript:truncateTo(\""+id+"\",\""+height+"\")' >less</a></div>");
		
	
	}

}
function scrollToTop(){
		lastScrollTop = $(window).scrollTop();
		//window.scrollTo(0,0);
		$("html, body").animate({ scrollTop: "1px" });	
	}


function showMoreOfTruncated(id){
	$('#more-button-for-'+id).remove();
	$('#less-button-for-'+id).fadeIn();
	$('#'+id).css({'height':'auto'});
	$('#'+id).delay(0).css({'overflow':'visible'});
}



function trackPageNotFound(request){
	//page-not-found
	try { 
		ga('send','event','page','PageNotFound',request);
	 	//_gaq.push(['_trackEvent','page','PageNotFound',request]);
	} catch (e) { 
	 
	}			
}

function trackPageSearch(request){
	//page-not-found
	try {
		ga('send','event','search','trackPageSearch',request); 
	 	//_gaq.push(['_trackEvent','search','trackPageSearch',request]);
	} catch (e) { 
	 
	}			
}

function trackRenderTime(request){
	/*
	try { 
	 	_gaq.push(['_trackEvent','debug','render-time','rt',request]);
	} catch (e) { 
	 
	}
	*/			
}





function truncatePager() {
	$('.truncate-pager').each(function(){
			//console.log('yo');
			 truncatePagerTruncte($(this));
			 
	})
	$('.truncate-pager').fadeIn();
	$('.truncate-pager .next').fadeIn();
	$('.truncate-pager .previous').fadeIn();
	
	truncateEmmPaginate()
}

function truncatePagerTruncte(pager) {
	//console.log(pager.find('li').length());
	var limitBefore = 2;
	var limitAfter = 2;
	var indexOfActive = 0;
	var pagerLength = 0;
	$(pager).find('.pager-element').each(function(index){
			//console.log('yo'+index);
			if($(this).hasClass('active')){
				//console.log('active'+index);
				indexOfActive = index;
			}
			 //truncatePagerTruncte($(this));
			pagerLength++;
	});
	//console.log('yo'+indexOfActive+' '+limitBefore);
	var beforeStartIndex = indexOfActive-limitBefore;
	var afterEndIndex = indexOfActive+limitAfter;
	
	if(beforeStartIndex <= 0){
		beforeStartIndex = 0;
		afterEndIndex = limitBefore+limitAfter;
	}
	
	//console.log('yo'+beforeStartIndex);
	//console.log('yo'+afterEndIndex);
	
	$(pager).find('.pager-element').each(function(index){
			//console.log('yo'+index);
			if(index >= beforeStartIndex && index < afterEndIndex){
				$(this).addClass('is-allowed');
			}else{
				$(this).hide();
				$(this).next().hide();
			}
			/*
			if(limitBefore <= indexOfActive){
				$(this).addClass('isAfter');
			}
			*/
			 //truncatePagerTruncte($(this));
	});
	
	
	
	if(afterEndIndex < pagerLength){
		$(pager).find('.is-allowed').last().next().append('...')
	}
	
	if(beforeStartIndex > 0){
		$(pager).find('.is-allowed').first().prepend('... / ')
	}
}

function truncateEmmPaginate() {
	$('.emm-paginate').each(function(){
			//console.log('yo');
			 truncateEmmTruncte($(this));
			 
	})
	$('.emm-paginate').fadeIn();
	$('.emm-paginate .emm-next').fadeIn();
	$('.emm-paginate .emm-prev').fadeIn();
}

function truncateEmmTruncte(pager) {
	//console.log(pager.find('li').length());
	var limitBefore = 2;
	var limitAfter = 2;
	var indexOfActive = 0;
	var pagerLength = 0;
	$(pager).find('.emm-page').each(function(index){
			//console.log('yo'+index);
			if($(this).hasClass('emm-current')){
				//console.log('active'+index);
				indexOfActive = index;
			}
			 //truncatePagerTruncte($(this));
			pagerLength++;
	});
	//console.log('yo'+indexOfActive+' '+limitBefore);
	var beforeStartIndex = indexOfActive-limitBefore;
	var afterEndIndex = indexOfActive+limitAfter;
	
	if(beforeStartIndex <= 0){
		beforeStartIndex = 0;
		afterEndIndex = limitBefore+limitAfter;
	}
	
	//console.log('yo'+beforeStartIndex);
	//console.log('yo'+afterEndIndex);
	
	$(pager).find('.emm-page').each(function(index){
			//console.log('yo'+index);
			if(index >= beforeStartIndex && index < afterEndIndex){
				$(this).addClass('is-allowed');
			}else{
				$(this).hide();
				$(this).next().hide();
			}
			/*
			if(limitBefore <= indexOfActive){
				$(this).addClass('isAfter');
			}
			*/
			 //truncatePagerTruncte($(this));
	});
	
	
	$('.emm-gap').hide();
	//$('.emm-page').before().hide();
	
	$(pager).find('.slash-slash').each(function(index){
			//console.log('yo'+index);
			if(index == 0){
				//$(this).hide();
			}
			
	});
	
	
	if(afterEndIndex < pagerLength){
		$(pager).find('.is-allowed').last().next().append('...')
	}
	
	if(beforeStartIndex > 0){
		$(pager).find('.is-allowed').first().prepend('... / ')
	}
}

var lastScrollTop = 0;
function scrollToTop(){
	console.log('scrollToTop');
	lastScrollTop = $(window).scrollTop();
	//window.scrollTo(0,0);
	$("html, body").animate({ scrollTop: "1px" });
}