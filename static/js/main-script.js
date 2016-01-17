$(function() {
	var animationSpeed = 600;
	var animationSpeedTwo = 1200;
	var informed = false;
	var wordCountHit = false;
	var motivate = false;
	var wordCount = 0;
	var charCount = 0;
	var tempWordCount = 0;
	
	
	$('#message').fadeOut(0);
	$('#divOne').fadeOut(0);
	$('#divTwo').fadeOut(0);
	$('#divThree').fadeOut(0);
	$('#message').fadeIn(animationSpeed * 2);
	$('#divOne').fadeIn(animationSpeed);
	$('#divTwo').delay(70).fadeIn(animationSpeed);
	$('#divThree').delay(140).fadeIn(animationSpeed);
	
	// Sets the first word in the box to be wizard
	// search Wizard
	
	// Initalizes the text field if it existed before
	if(sessvars.myObj != null && sessvars.myObj.msg != null){
		$('#txtArea').val(sessvars.myObj.msg);
	}
	
	// Activated when the bulb image is clicked
	$('#bulbImage').click(function(){
		$('#message').fadeOut(animationSpeed);
		$('#divOne').delay(100).fadeOut(animationSpeed);
		$('#divTwo').delay(50).fadeOut(animationSpeed);
		$('#divThree').fadeOut(animationSpeed);
		setTimeout(switchToChoose, 710);
	});
	
	// Chooses a random smart word for the word wizard
	function chooseRandomWord(txt) {
		$.post('process/text', {text: txt}).done(function(data) {
			$('#wordWizard').val(data.keywords[0]);
			
		});
		
	}
	
	$('#bulbImage').mouseover(function(){
		$('#bulbImage').attr('src', "static/img/pic1.png");
	});
	
	$('#bulbImage').mouseleave(function(){
		$('#bulbImage').attr('src', "static/img/pic0.png");
	});
	
	$('#head').click(function(){
		if(informed){
			chooseRandomWord($('#txtArea').val());
			$('#message').css("color", "rgba(255, 255, 255, 0.8)");
			$('#message').html("Click Creafly again to generate a random related topic. Otherwise click the lightbulb or use the manually search if you can't think of anything to write.");
		}
		else if(wordCountHit){
			informed = true;
			$('#message').html("Creafly is great for generating relatable topics. Click Creafly once more to write a random topic in the word wizard!");
			$('#message').css("color", "rgba(76, 217, 100, 1)");
		}
	});
	
	// Submit a word for PyDictionary
	$('#submit').click(function() {
		$.get('process/word', {word: $('#wordWizard').val()}).done(function(data) {
			var definition = "";
			if(data.meaning == null) {
				definition = "Improper word!";
			} else {
				$.each(data.meaning, function(key, val) {
					definition += "<b>" + key + ":</b> " + val + "; ";
				});
			}
			$('#definition').html(definition);
			
			var synonym = "";
			$.each(data.synonym, function(i, val) {
				if(i > 0) {
					synonym += ", ";
				}
				synonym += val;
			});
			$('#synonym').html(synonym);
		});
	});
	
	// Counts the text every time a keystroke is made	
	$(document).on("keypress", function () {
		countText($('#txtArea').val());
		
		// Update the text for the word and char count
		$('#wordCount').html("There are " + wordCount + " words in the text.");
		$('#charCount').html("There are " + charCount + " characters in the text.");
	}).on('keydown', function(e) {
	if (e.keyCode==8)
		$(document).trigger('keypress');
	});
	
	// Sets the word count and char count found in the text txt
	function countText(txt){
		var i = 0;
		sessvars.myObj = {msg: txt};
		
		if(wordCount != txt.replace(/^[\s,.;]+/, "").replace(/[\s,.;]+$/, "").split(/[\s,.;]+/).length) {
			tempWordCount -= Math.abs(txt.replace(/^[\s,.;]+/, "").replace(/[\s,.;]+$/, "").split(/[\s,.;]+/).length - wordCount);
		} if(tempWordCount <= 0 ) {
			tempWordCount = 5;
			
			$.post('process/text', {text: txt}).done(function(data) {
			$('#psychology').css('width', data.text_tags.psychology * 600 + "%")
			$('#art').css('width', data.text_tags.art * 600 + "%")
			$('#comedy').css('width', data.text_tags.comedy * 600 + "%")
			$('#politics').css('width', data.text_tags.political_discussion * 600 + "%")
			$('#business').css('width', data.text_tags.business * 600 + "%")
			$('#technology').css('width', data.text_tags.technology * 600 + "%")
			$('#sports').css('width', data.text_tags.sports * 600 + "%")
		});
		}
		wordCount = txt.replace(/^[\s,.;]+/, "").replace(/[\s,.;]+$/, "").split(/[\s,.;]+/).length;
		charCount = txt.length;
		
		if(!motivate && wordCount >= 10) {
			motivate = true;
			$('#message').html("Keep it up!! Write a few more lines and try to hit a word count of at least 30.");
		} else if(!wordCountHit && wordCount >= 30){
			wordCountHit = true;
			$('#message').html("Nice work! Now try clicking the title to see what happens.");
			$('#head').css('color', 'rgba(76, 217, 100, 1)');
			$('#message').css('color', 'rgba(76, 217, 100, 1)');
			setTimeout(animateTitle, 800);
		}
	}
	
	// Shakes the head to catch the users attention
	function animateTitle() {
		$('#head').css('color', 'white');
		$('#message').css('color', 'rgba(255, 255, 255, 0.8)');
	}
	
	// Change screen to choose topic
	function switchToChoose() {
		window.location = 'choose';
	}
});