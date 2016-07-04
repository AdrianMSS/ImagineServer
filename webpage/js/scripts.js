(function($){

	$(window).on('load', function(){
		$('.fade-in').css({ position: 'relative', opacity: 0, top: -14 });
		setTimeout(function(){
			$('#preload-content').fadeOut(400, function(){
				$('#preload').fadeOut(800);
				setTimeout(function(){
					$('.fade-in').each(function(index) {
						$(this).delay(400*index).animate({ top : 0, opacity: 1 }, 800);
					});
				}, 800);
			});
		}, 400);
	});

	$(document).ready( function(){

		// Create a countdown instance. Change the launchDay according to your needs.
		// The month ranges from 0 to 11. I specify the month from 1 to 12 and manually subtract the 1.
		// Thus the launchDay below denotes 7 December, 2014.
		var launchDay = new Date(2016, 7, 8);
		$('#timer').countdown({
			until: launchDay
		});

		// Add YouTube video background
		var bgVideo = $('#bg-video');
		if ( !device.tablet() && !device.mobile() ) {
			bgVideo.YTPlayer();
			$('#bg-video-volume').click(function(e){
				var bgVideoVol = $(this);
				e.preventDefault();
				if( bgVideoVol.hasClass('icon-mute') ) {
					bgVideoVol.removeClass('icon-mute').addClass('icon-sound').attr('title', 'Mute');
					bgVideo.YTPUnmute();
				} else {
					bgVideoVol.removeClass('icon-sound').addClass('icon-mute').attr('title', 'Unmute');
					bgVideo.YTPMute();
				}
			});
			$('#bg-video-play').click(function(e){
				var bgVideoPlay= $(this);
				e.preventDefault();
				if( bgVideoPlay.hasClass('icon-pause') ) {
					bgVideoPlay.removeClass('icon-pause').addClass('icon-play').attr('title', 'Play');
					bgVideo.YTPPause();
				} else {
					bgVideoPlay.removeClass('icon-play').addClass('icon-pause').attr('title', 'Pause');
					bgVideo.YTPPlay();
				}
			});
		} else {
			var posterUrl = bgVideo.data('poster');
			if ( posterUrl )
				$.backstretch(posterUrl);
			$('#bg-video-controls').hide();
		}

		// Invoke the Placeholder plugin
		$('input, textarea').placeholder();

		// Validate newsletter form
		$('<div class="loading"><span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span></div>').hide().appendTo('.form-wrap');
		$('<div class="success"></div>').hide().appendTo('.form-wrap');
		$('#newsletter-form').validate({
			rules: {
				newsletter_email: { required: true, email: true }
			},
			messages: {
				newsletter_email: {
					required: 'Email address is required',
					email: 'Email address is not valid'
				}
			},
			errorElement: 'span',
			errorPlacement: function(error, element){
				error.appendTo(element.parent());
			},
			submitHandler: function(form){
				$(form).hide();
				$('#newsletter .loading').css({ opacity: 0 }).show().animate({ opacity: 1 });
				$.post($(form).attr('action'), $(form).serialize(), function(data){
					$('#newsletter .loading').animate({opacity: 0}, function(){
						$(this).hide();
						$('#newsletter .success').show().html('<p>Thank you for subscribing!</p>').animate({opacity: 1});
					});
				});
				return false;
			}
		});

		// Contact Info Sent
		$('#contact-form').on('submit', function(e) {
			e.preventDefault();
			$( "body" ).css('cursor', 'progress');
			var name = $( "#name" ).val(),
				email = $( "#email" ).val(),
				textarea = $( "#text-area" ).val(),
				url = 'email/',
				data = {
	              'email': email, 
	              'name': name,
	              'message': textarea
	            };
			$.ajax({ 
	            url: url,
	            type: 'POST',
	            data: JSON.stringify(data),
	            beforeSend : function(req) { 
	              req.setRequestHeader('content-type', 'application/json'); 
	            },
	            success: function(res){
	            	$( "body" ).css('cursor', 'default');
		            alert('Thanks for messaging us. We will contact you soon.');
		            $('#name').val('');
		            $('#email').val('');
		            $('#text-area').val('');
	            }.bind(this),
	            error: function(res){
	              	alert('Message not sent. Please try Again.');
	            }.bind(this)        
	        });
		});

		// Open modal window on click
		$('#modal-open').on('click', function(e) {
			var mainInner = $('#main .inner'),
				modal = $('#modal');

			mainInner.animate({ opacity: 0 }, 400, function(){
				$('html,body').scrollTop(0);
				modal.addClass('modal-active').fadeIn(400);
			});
			e.preventDefault();

			$('#modal-close').on('click', function(e) {
				modal.removeClass('modal-active').fadeOut(400, function(){
					mainInner.animate({ opacity: 1 }, 400);
				});
				e.preventDefault();
			});
		});

	});
	
})(jQuery);