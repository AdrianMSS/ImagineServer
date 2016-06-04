/******* Imagine XYZ Functions *******/
//Sprite Carousell
function moveSprite(num){
	var newPosition = num + "% 0%";
	$("#partnersCarousell").css("background-position", newPosition);
	num+=10;
	setTimeout(moveSprite, 2000, num);
};

//Window Listener
$(function(){
	var contactName = false,
		contactEmail = false,
		contactPhone = false,
		contactMessage = false,
		nameVal = '',
		emailVal = '',
		phoneVal = '',
		messageVal = '';

    $(".contactButton").click(function(){
        if(contactName && contactEmail && contactPhone && contactMessage){
	        var url = 'email/',
	            data = {
	              'email': emailVal, 
	              'name': nameVal,
	              'message': messageVal,
	              'phone': phoneVal
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
		            $('.contactName').val('');
		            $('.contactEmail').val('');
		            $('.contactPhone').val('');
		            $('.contactMessage').val('');
		            contactName = false,
					contactEmail = false,
					contactPhone = false,
					contactMessage = false,
					nameVal = '',
					emailVal = '',
					phoneVal = '',
					messageVal = '';
		    		$(".contactName").css("border-left", "black 1px solid");
		    		$(".contactName").css("border-bottom", "black 1px solid");
		    		$(".contactPhone").css("border-left", "black 1px solid");
		    		$(".contactPhone").css("border-bottom", "black 1px solid");
		    		$(".contactEmail").css("border-left", "black 1px solid");
		    		$(".contactEmail").css("border-bottom", "black 1px solid");
		    		$(".contactMessage").css("border", "black 2px solid");
	            }.bind(this),
	            error: function(res){
	              	alert('Error: Message not Sent, Try Again.');
	            }.bind(this)        
	        });
        }
    });

    $(".contactName").change(function(){
    	var name = $( this ).val();
    	if(name === ''){
    		$(".contactName").css("border-left", "red 1px solid");
    		$(".contactName").css("border-bottom", "red 1px solid");
    		contactName = false;
    	}
    	else if(/[0-9]/.test(name)){
    		$(".contactName").css("border-left", "red 1px solid");
    		$(".contactName").css("border-bottom", "red 1px solid");
    		contactName = false;
    	}
    	else {
    		$(".contactName").css("border-left", "green 1px solid");
    		$(".contactName").css("border-bottom", "green 1px solid");
    		contactName = true;
    		nameVal = name;
    	}
    });

    $(".contactEmail").change(function(){
    	var mail = $( this ).val();
    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if(mail === ''){
    		$(".contactEmail").css("border-left", "red 1px solid");
    		$(".contactEmail").css("border-bottom", "red 1px solid");
    		contactEmail = false;
    	}
    	else if(re.test(mail)){
    		$(".contactEmail").css("border-left", "green 1px solid");
    		$(".contactEmail").css("border-bottom", "green 1px solid");
    		contactEmail = true;
    		emailVal = mail;
    	}
    	else {
    		$(".contactEmail").css("border-left", "red 1px solid");
    		$(".contactEmail").css("border-bottom", "red 1px solid");
    		contactEmail = false;
    	}
    });

    $(".contactPhone").change(function(){
    	var phone = $( this ).val();
    	var re = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    	if(phone === ''){
    		$(".contactPhone").css("border-left", "red 1px solid");
    		$(".contactPhone").css("border-bottom", "red 1px solid");
    		contactPhone = false;
    	}
    	else if(re.test(phone)){
    		$(".contactPhone").css("border-left", "green 1px solid");
    		$(".contactPhone").css("border-bottom", "green 1px solid");
    		contactPhone = true;
    		phoneVal = phone;
    	}
    	else {
    		$(".contactPhone").css("border-left", "red 1px solid");
    		$(".contactPhone").css("border-bottom", "red 1px solid");
    		contactPhone = false;
    	}
    });

    $(".contactMessage").change(function(){
    	var message = $( this ).val();
    	if(message === ''){
    		$(".contactMessage").css("border-left", "red 1px solid");
    		$(".contactMessage").css("border-bottom", "red 1px solid");
    		contactMessage = false;
    	}
    	else {
    		$(".contactMessage").css("border", "green 2px solid");
    		contactMessage = true;
    		messageVal = message;
    	}
    });

    //Subscribe Events
    var susbscribeEmail = false,
        emailVal2 = '';
    $(".susbscribeEmail").change(function(){
        var mail = $( this ).val();
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(mail === ''){
            $(".susbscribeEmail").css("border", "red 1px solid");
            susbscribeEmail = false;
        }
        else if(re.test(mail)){
            $(".susbscribeEmail").css("border", "green 1px solid");
            susbscribeEmail = true;
            emailVal2 = mail;
        }
        else {
            $(".susbscribeEmail").css("border", "red 1px solid");
            susbscribeEmail = false;
        }
    });

    $(".susbscribeButton").click(function(){
        if(susbscribeEmail){
            var url = 'susbscribe/',
                data = {
                  'email': emailVal2
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
                    $('.susbscribeEmail').val('');
                    susbscribeEmail = false,
                    emailVal2 = '',
                    $(".susbscribeEmail").css("border", "black 1px solid");
                }.bind(this),
                error: function(res){
                    alert('Error: Message not Sent, Try Again.');
                }.bind(this)        
            });
        }
    });
});