(function($) {
    "use strict"; // Start of use strict

    $( document ).ready(function() {
	    $('html').removeClass();
	});

    // Contact Button
    $('#menu-contact-1').click(function(e) {
    	$('#closeButton').click();
    	var altura = $('#contact-us').offset().top - 250;
    	$('body').scrollTop( altura );
    });
    
    $('#menu-contact-2').click(function(e) {
    	$('#closeButton').click();
    	var altura = $('#contact-us').offset().top - 50;
    	$('body').scrollTop( altura );
    });

    $('#menu-contact-3').click(function(e) {
    	$('#closeButton').click();
    	var altura = $('#contact-us').offset().top - 300;
    	console.log(altura);
    	$('body').scrollTop( altura );
    });

    $('#sendButton').click(function(e) {
    	if($('#fields-emailAddress')[0].checkValidity() && $('#fields-message')[0].checkValidity()){	
	    	e.preventDefault();
	    	$('#sendButton').prop('disabled', true);

	    	var url = 'email/',
	        inputEmail = $('#fields-fullName').val(),
	        inputName = $('#fields-emailAddress').val(),
	        inputSubject = $('#fields-subject').val(),
	        inputMessage = $('#fields-message').val(),
	        data = {
	          'email': inputEmail, 
	          'name': inputName,
	          'subject': inputSubject,
	          'message': inputMessage
	        };
	      $.ajax({ 
	        url: url,
	        type: 'POST',
	        data: JSON.stringify(data),
	        beforeSend : function(req) { 
	          req.setRequestHeader('content-type', 'application/json'); 
	        },
	        success: function(res){
	          	alert('Message Sent.');
	          	$('#fields-fullName').val('');
	          	$('#fields-emailAddress').val('');
	          	$('#fields-subject').val('');
	          	$('#fields-message').val('');
	          	$('#sendButton').prop('disabled', false);
	        }.bind(this),
	        error: function(res){
	          	alert('Error: Message not Sent, Please Try Again.');
	          	$('#sendButton').prop('disabled', false);
	        }.bind(this)        
	      });
    	}
	});

	$('#mc-embedded-subscribe').click(function(e) {
    	if($('#mce-EMAIL')[0].checkValidity()){
    		e.preventDefault();	
	    	$('#mc-embedded-subscribe').prop('disabled', true);

	    	var url = 'susbscribe/',
	        inputEmail = $('#mce-FNAME').val(),
	        inputName = $('#mce-EMAIL').val(),
	        data = {
	          'email': inputEmail, 
	          'name': inputName
	        };
	      $.ajax({ 
	        url: url,
	        type: 'POST',
	        data: JSON.stringify(data),
	        beforeSend : function(req) { 
	          req.setRequestHeader('content-type', 'application/json'); 
	        },
	        success: function(res){
	          	alert('Message Sent.');
	          	$('#mce-FNAME').val('');
	          	$('#mce-EMAIL').val('');
	          	$('#mc-embedded-subscribe').prop('disabled', false);
	        }.bind(this),
	        error: function(res){
	          	alert('Error: Message not Sent, Please Try Again.');
	          	$('#mc-embedded-subscribe').prop('disabled', false);
	        }.bind(this)        
	      });
    	}
	 });





})(jQuery); // End of use strict
