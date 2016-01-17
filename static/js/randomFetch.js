$(document).ready(function() {
	$('#img-container-active .img-card').each(function () {
		$(this).children('h3').hide();
		$(this).hide();
	});
	
	$('body').css('overflow-y', 'scroll');
	convertRandom();
});

function convertRandom() {
	$("#img-container-active .img-card").each(function (index) {
		var current = $(this);
		if(!current.is(':visible')) {
			current.fadeIn('slow');
		}
		current.removeClass('deactivated');
		current.children('img.img-content').css('visibility', 'hidden');
		current.children('img.spinner').fadeIn('fast');
		current.off();
		$(this).children('h3').slideUp();
		$.get('process/image', { url: 'https://unsplash.it/400/?random' })
		.done(function (data) {
			current.on({
				mouseenter: function() {
					$(this).children('h3').slideDown();
				}, 
				mouseleave: function() {
					$(this).children('h3').slideUp();
				}
			});
			
			current.on('click', function() {
				selectImage(index);
			});
			
			current.children('img.spinner').fadeOut('fast');
			current.children('img.img-content').attr('src', 'data:image/png;base64, ' + data.uri);
			current.children('img.img-content').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1}, 500);
			var keywords = "";
			var addComma = false;
			$.each(data.keywords, function(k, v) {
				if(addComma) {
					keywords += ', ';
				} else {
					addComma = true;
				}
				keywords += k;
			});
			current.children('h3').text(keywords);
		});
	});
}

function selectImage(selectIndex) {
	$("#img-container-active .img-card").each(function (index) {
		var current = $(this);
		if(selectIndex != index) {
			current.addClass('deactivated');
		} else {
			current.removeClass('deactivated');
			$('#img-container-active > .page-header > h1').fadeIn();
			$('#img-container-active > .page-header > h1').text(current.children('h3').text());
		}
		current.off();
		if(current.children('h3').is(':visible')) {
			current.children('h3').slideUp();
		}
	});
	
	$('#img-container-active').clone().insertAfter('#img-container-active');
	$('#img-container-active').first().removeAttr('id');
	
	$('#img-container-active > .page-header > h1').text("");
	
	
	convertRandom();
}