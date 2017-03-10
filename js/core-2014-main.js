function setBrightcoveVideoPlayer(target,id){
	$(target).html('<object id="myExperience'+id+'" class="BrightcoveExperience resonsive-video"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="960" /><param name="height" value="540" /><param name="playerID" value="746572032001" /><param name="playerKey" value="AQ~~,AAAArZYDl4E~,M5Bc2Fsm8mvmDoDeRkOXN--iUXAOF38s" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="@videoPlayer" value="'+id+'" /><param name="autoStart" value="true" /></object>');
	brightcove.createExperiences();
}


function setVimeoVideoPlayer(target,id){
	$(target).html('<iframe data-width="960"  data-height="540"  class="vimeo-player responsive-video" src="//player.vimeo.com/video/'+id+'"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
}

//?autoplay=true
function setVideoPlayer(target,videocode){
	myTrace(videocode);
	$(target).html(videocode);
	//brightcove.createExperiences();
}


var isTouch;
var isPhone;
var clickevent;

$(document).ready(function(){
	checkDevice();
	scrollToFixNav();
	if ($('.listing-single #slideshow').length > 0) {
		initListingSlideshow();	
	}
	
	if ($('.tab-menu').length > 0) {
		initTabs();
	}
	
	//showNavLevel2();
	buildNavLevel2();
	setTimeout("$('body').animate({'opacity':1})",800);

	executeAsInterval('scaleVideos');
	executeAsInterval('scaleImageFrames');
	bindMainHoverMenu();
	//executeOnStateChange('unsetMiniNav');
});



function scaleVideos() {
	
	$('.responsive-video').each(function(){

		var width = $(this).width();
		var ratio =  540/960;
		//myTrace(ratio);
		if("" != $(this).attr('data-ratio') && undefined != $(this).attr('data-ratio')){
			ratio = $(this).attr('data-ratio');
			console.log(ratio);
		}
		$(this).height(width*ratio);

		/*
		if(windowWidth < 960){
			$(this).width(windowWidth-30);
			var ratio =  540/960;
			myTrace(ratio);
			$(this).height((windowWidth-30)*ratio);			
		}else{
			$(this).width(960);	
			$(this).height(540);
		}
		*/
	});
	
	
	// videos in blog
	$('.post-content iframe, .post-content object').each(function(){
		var targetWidth = $('.blog-content').width();
		//myTrace(targetWidth);
		//if(targetWidth < 700){
			$(this).width(targetWidth);
			var ratio =  540/960;
			//myTrace(ratio);
			$(this).height((targetWidth)*ratio);			
		//}
	});
	
	// videos in blog
	$('.mirco-video').each(function(){
		var targetWidth = $(this).parent().find('.img-content').width();
		var targetHeight = $(this).parent().find('.img-content').height();
		
		$(this).find('iframe').width(targetWidth);			
		$(this).find('iframe').height(targetHeight);
		$(this).show();
		//$(this).parent().find('.player-player-button-img');	
	});
	
	
	
	$('#film-video').css({'min-height':0});	
}


function scaleImageFrames() {

	$('.img-frame').each(function(){

		if($(this).hasClass('img-frame4x2')){
			var width = $(this).width();
			$(this).css({'min-height':+parseInt(width/2)+'px'});
		}


	});

}


function buildNavLevel2() {
	
	$('#main-nav ul.level-2').each(function(){
		
		if($(this).parent().hasClass('active') || $(this).hasClass('active-trail') || $(this).attr('id') == uId+'-node'){
				$(this).show()
		}
		$('#secondary-nav').append($(this));  
	});
}

function showNavLevel2() {
	//myTrace('sampleFunction');
	$('#main-nav ul.level-2').each(function(){
		//myTrace(this);
			if($(this).parent().hasClass('active') || $(this).hasClass('active-trail')){
				$(this).show()
			}
			
		}	
	)
	
}

var subnavOpen = false;
function openSubNav(key){
	myTrace(key);
	if(subnavOpen == false){
		$('nav.main-nav ul.level-2 ').hide();
		$('nav.main-nav #'+key).find('ul').fadeIn();

		//$('#search-site').hide();
		subnavOpen = true;
	}else{
		closeSubnav();
	}
}

function closeSubnav(){
	$('nav.main-nav ul.level-2 ').hide();
	//$('#search-site').show();
	subnavOpen = false;
}

function bindMainHoverMenu(){
	$('nav.main-nav > ul > li').each(function(){

		var subnavNode = $(this).find('ul.level-2');
		if(subnavNode.length > 0){
			$(this).find('> a').attr('href','javascript:openSubNav("'+$(this).attr('id')+'")');

			if($('html').hasClass('no-touch')){

				subnavNode.parent().hover(function() {
						openSubNav(subnavNode.parent().attr('id'));
					},
					function() {
						closeSubnav();
					});
			};
		}
	});

	$('nav.main-nav ul.level-2').find('.menu-span').remove();
	closeSubnav();
}



function addPlayerButtonsToVideos(){
	$('.player-player-button').each(function(){
		var button = 'playbutton_443_248.png';
		if($(this).hasClass('button-type-dark')){
			button= 'playbutton_443_248_dark.png';
		}
		$(this).find('.img-content').append('<img class="player-player-button-img" src="public/app-assets/img/'+button+'" >');


	});



	$('.large-player-player-button ').each(function(){

		var button = 'playbutton_960_540.png';
		if($(this).hasClass('button-type-dark')){
			button= 'playbutton_960_540_dark.png';
		}
		$(this).find('.img-content').append('<img class="player-player-button-img" src="public/app-assets/img/'+button+'" >');

	});
	
}




var miniStatus = 'out';

function toggleMiniNav(){
	myTrace('miniNav '+miniStatus);
	if(miniStatus == 'out'){
				
		$('#search-site').hide();
		$('#mobile-nav > ul').slideDown();
		miniStatus = 'in';
	}else{
		$('#mobile-nav > ul').slideUp( "slow", function() {
			$('#search-site').show();
		});
		
		
		miniStatus = 'out';
	}
}


function unsetMiniNav(){
	/*
    myTrace('unsetMiniNav '+responsiveState);
	if('max-width320px' == responsiveState || 'max-width520px' == responsiveState || 'max-width600px' == responsiveState){		
			miniStatus = 'in';
			toggleMiniNav();
	}else{
		//if(miniStatus == 'in'){
			$('#main-nav').slideDown();
			$('#search-site').show();
			//miniStatus = 'in';
		//}
	}*/
}

function initTabs() {
	$('.tab-menu li').bind(clickevent, function() {
		/*
		$(this).parent().parent().children('.tab-content').hide();
		$(this).parent().parent().children('.tab-content-' + $(this).attr('ID').substr(9)).show();
		$(this).parent().children('.active').removeClass('active');
		$(this).addClass('active');
		*/
	});
}


function playVideo(id){
	scrollToTop();
	var videoObj = eval('videoInfo'+id);
	//myTrace(videoObj);
	$('#film-text').html(videoObj.textdata1); 
	$('#film-title strong').html(videoObj.name);
	$('#film-date').html(videoObj.date);
	//myTrace(videoObj.bcPlayerId);
	if(videoObj.vimeoPlayerId != ''){
		setVimeoVideoPlayer('#film-video',videoObj.vimeoPlayerId);
	}else{
		setVideoPlayer('#film-video',videoObj.videocode);
	}
}

function scrollToAnchor(anchorName){
	// offSet negative value to account for fixed headers	
	
	var offSet = parseInt($('header').css('height')+$('header').css('margin-bottom')+160);
	offSet = 290;
	myTrace('scrollToAnchor offest: '+offSet);
	if($(window).width() < 500){
		//return false;
	}
		
	
    var aTag = $("a[name='"+ anchorName +"']");
	$('html,body').animate({scrollTop: aTag.offset().top-offSet},'slow');
	    
}



function initListingSlideshow() {	
	for(var i = 0; i < photoOrder.length; i++){
			//myTrace(photoOrder[i]);
			$('#slideshow').append($('#slide-'+photoOrder[i]));	
	}
	
	
	$('#slideshow').cycle({
		fx: 'scrollHorz',
		speed: 600,
		manualSpeed: 400,
		paused: true,
		slides: '.slide',
		pagerEvent: 'mouseover', // load image on mouseover instead of click
		swipe: true,
		prev: '.slideshow-prev',
		next: '.slideshow-next',
	});
	myTrace('Init listing slideshow '+$('.cycle-slide').length)

	if($('.cycle-slide').length <= 1){
		$('.slideshow-prev').remove();
		$('.slideshow-next').remove();
	}

	$('#slideshow').on('cycle-post-initialize', function( event, opts ) {
		updatePinterest();
	});

	$('#slideshow').on('cycle-after', function( event, opts ) {
		updatePinterest();
	});
	
	if(isTouch){
		//$('.slideshow-prev').hide();
		//$('.slideshow-next').hide();
	}
	updatePinterest();
}

function updatePinterest(){
	myTrace('updatePinterest');
	var current = $('#slideshow').data("cycle.opts").currSlide;
	var url = $('#slide-'+current+' img').attr('src');
	$('.pin-target > a').attr('href','http://pinterest.com/pin/create/button/?url='+baseUrl+currentUrl+'&media='+baseUrl+url);

}



function scrollToFixNav(){
	$(window).scroll(function() {
		setHeaderNavTugging();
	});
}

function setHeaderNavTugging(){
	var myScrollTop = $(window).scrollTop();
	//scrollGetSlidePos();
	if(myScrollTop > 50){
		$('body').addClass('tugged');
		//$('header #logo').slideDown();
		//$('header').animate({'top':'0px'},'slow');
		//logoState = 'out';
	}else {
		$('body').removeClass('tugged');
	}
}