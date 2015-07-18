/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Submit Button
    $('#buttonSubmit').click(function(e) {
      e.preventDefault();
      var url = 'email/',
        inputEmail = $('#inputEmail').val(),
        inputName = $('#inputName').val(),
        inputSubject = $('#inputSubject').val(),
        inputMessage = $('#inputMessage').val(),
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
          $('#inputEmail').val('');
          $('#inputName').val('');
          $('#inputSubject').val('');
          $('#inputMessage').val('');
          //setTimeout(this.addHidden, 2000, '#formSuccess');
        }.bind(this),
        error: function(res){
          alert('Error: Message not Sent, Try Again.');
          //setTimeout(this.addHidden, 2000, '#formError');
        }.bind(this)        
      });
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict
