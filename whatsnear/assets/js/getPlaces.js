function getData(){  
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=9.854954,-83.909053&radius=200&key=AIzaSyBGuNB7PRusaF7JKSq-t_crKWKP6H3o3sg';
  //9.853764,-83.910259
  $.ajax({
    type: "GET",
    url: url,
    crossDomain: true,
    dataType: 'jsonp',
    success: function(res){
      //console.log(eval('(' + res + ')'));
      //console.log(res);
    }
  });
};
