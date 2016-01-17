$(function() {
	var animationSpeed = 500;
	var animationSpeedTwo = 400;
	
	// Call resize to position the objects
	resize();
	$('#par').fadeOut(0);
	$('#leftDiv').fadeOut(0);
	$('#rightDiv').fadeOut(0);
	$('#return').fadeOut(0);
	$('#par').fadeIn(animationSpeed);
	$('#leftDiv').fadeIn(animationSpeed);
	$('#rightDiv').fadeIn(animationSpeed);
	$('#return').delay(50).fadeIn(animationSpeed);
	
	$('#topicsButton').click(function(){
		$('#par').delay(140).fadeOut(animationSpeed);
		$('#leftDiv').fadeOut(animationSpeed);
		$('#rightDiv').delay(70).fadeOut(animationSpeed);
		$('#return').delay(70).fadeOut(animationSpeed);
		setTimeout(findTopic, 640);
	});
	
	$('#builderButton').click(function(){
		$('#par').delay(140).fadeOut(animationSpeed);
		$('#leftDiv').delay(70).fadeOut(animationSpeed);
		$('#rightDiv').fadeOut(animationSpeed);
		$('#return').delay(70).fadeOut(animationSpeed);
		setTimeout(startBuilder, 640);
	});
	
	$('#return').click(function(){
		$('#par').delay(140).fadeOut(animationSpeed);
		$('#leftDiv').delay(70).fadeOut(animationSpeed);
		$('#rightDiv').delay(70).fadeOut(animationSpeed);
		$('#return').fadeOut(animationSpeed);
		$('#title').delay(140).fadeOut(animationSpeed)
		$('#content').css('background', 'rgba(55, 53, 86, 0.8)');
		setTimeout(returnToMain, 640);
	});
	
	// Switch to the topic picker html file
	function findTopic() {
		window.location = 'topics';
	}
	
	// Switch to the main blog html file
	function startBuilder() {
		window.location = 'builder';
	}
	
	// Return to the first page
	function returnToMain() {
		window.location = '/';
	}
	
	// Calls resizeEnd after a 100ms delay so that calls are made after html changes by default
	$(window).on('resizePage', function(){
		if(this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 100);
	});
	
	// Binds the resizeEnd function to the window
	$(window).bind('resizeEnd', function() {
		resize();
	});
	
	// Resizes the screen elements, no mobile friendly version 
	function resize() {
		$('#leftDiv').css('padding-top', ($(window).height() - $('#header').height()) / 2 - $('#return').height() * 8  + 20 + "px");
		$('#rightDiv').css('padding-top', ($(window).height() - $('#header').height()) / 2 - $('#return').height() * 8 + 20 + "px");
	}
});