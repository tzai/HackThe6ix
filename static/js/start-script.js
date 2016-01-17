$(function() { 
	var animationSpeed = 500;
	var animationSpeedTwo = 400;
	var started = false;
	
	// Call resize to position the objects
	resize();
	$('#title').fadeOut(0);
	$('#startBtn').fadeOut(0);
	$('#prompt').fadeOut(0);
	$('#leftDiv').fadeOut(0);
	$('#rightDiv').fadeOut(0);
	$('#title').fadeIn(animationSpeed);
	$('#startBtn').fadeIn(animationSpeed);
	
	// Calls resizeEnd after a 100ms delay so that calls are made after html changes by default
	$(window).on('resizePage', function(){
		if(this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 100);
	});
	
	// Starts the begining animation
	$('#startBtn').click( function(){
		started = true;
		$('#content').css('background', 'rgba(32, 53, 86, 0.9)');
		$('#header').animate({'padding-top': 0}, {animationSpeed});
		$('#startBtn').fadeOut(animationSpeedTwo);
		
		$('#prompt').delay(animationSpeed).fadeIn(animationSpeedTwo);
		$('#leftDiv').delay(animationSpeed).fadeIn(animationSpeedTwo);
		$('#rightDiv').delay(animationSpeed).fadeIn(animationSpeedTwo);
		
		$('#leftDiv').css('padding-top', ($(window).height() - $('#header').height() - $('#leftDiv').height() * 2) / 2);
		$('#rightDiv').css('padding-top', ($(window).height() - $('#header').height() - $('#rightDiv').height() * 2) / 2);
	});
	
	$('#leftButton').click(function(){
		$('#prompt').delay(140).fadeOut(animationSpeed);
		$('#leftDiv').fadeOut(animationSpeed);
		$('#rightDiv').delay(70).fadeOut(animationSpeed);
		setTimeout(findTopic, 640);
	});
	
	$('#rightButton').click(function(){
		$('#prompt').delay(140).fadeOut(animationSpeed);
		$('#leftDiv').delay(70).fadeOut(animationSpeed);
		$('#rightDiv').fadeOut(animationSpeed);
		setTimeout(startBlog, 640);
	});
	
	// Switch to the topic picker html file
	function findTopic() {
		window.location = 'choose';
	}
	
	// Switch to the main blog html file
	function startBlog() {
		window.location = 'main';
	}
	
	// Binds the resizeEnd function to the window
	$(window).bind('resizeEnd', function() {
		resize();
	});
	
	// Resizes the screen elements, no mobile friendly version 
	function resize() {
		if(!started){ // just the display banner
			$('#header').css('padding-top', ($(window).height() - $('#header').height()) / 2 + 20 + "px");
		} else {
			$('#header').css('padding-top', 0);
		}
	}
});