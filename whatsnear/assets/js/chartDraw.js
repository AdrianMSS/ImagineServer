//Módulo de google que hay que cargar para graficar
google.load("visualization", "1", {packages:["corechart"]});

//Variable de distancia recorrida
var distance = 0;

//Función para darle formato a los números (18.215.215,05)
function formatNumber(num){
      if(isNaN(num) || num===null)num=0;
  var numReturn = num.toFixed(2).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
  return numReturn;
}

//Función para obtener la posición de la base de datos
function getPositions(){  
  var setHeader = function (req) {
    req.setRequestHeader('content-type', 'application/json'); 
  }; 
  $.ajax({
    type: "GET",
    url: "pos",
    beforeSend: setHeader,
    success: function(res){
      directionsMap(res);//Función para iniciar el mapa con el recorrido
    }
  });
};

//Función para iniciar el proceso de dibujar el mapa con el recorrido
function directionsMap(placesDB){  
  
  //Variables para iniciar el servicio de Google Maps
  var startPoint = {lat: parseFloat(placesDB[0].lat), lng: parseFloat(placesDB[0].lon)},
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: false, suppressInfoWindows:false});

  //Instancia del mapa
  var map = new google.maps.Map(document.getElementById('chart_div1'), {
    center: startPoint,
    scrollwheel: false,
    zoom: 9
  });

  //Mostrar el mapa inicial
  directionsDisplay.setMap(map);

  //Función recursiva para dibujar la ruta
  calculateAndDisplayRoute(directionsService, 0, false, placesDB);
};

//Función recursiva para dibujar la ruta (instancia Google, posición arreglo, bool markers, arreglo de posiciones)
function calculateAndDisplayRoute(directionsService, num, markersShow, placesDB) {
  var waypts = [], //Arreglo de paradas
    whileStop = true, //Condición de parada
    whileNum = 0, //Cantidad de iteración (el servicio de Google solo permite 8 paradas)
    numInit = num; //Posición inicial

  //Ciclo para el manejo de las paradas
  while(whileStop){

    //Condición para sumar distancia o no
    if(num == placesDB.length-1){
    }
    else {
      var latLngA = new google.maps.LatLng(parseFloat(placesDB[num].lat), parseFloat(placesDB[num].lon)); //Punto A
      var latLngB = new google.maps.LatLng(parseFloat(placesDB[num+1].lat), parseFloat(placesDB[num+1].lon)); //Punto B
      var d = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB); //Distancia entre los puntos
      distance += d; //Sumar a la distancia total
    }

    //Añadir posiciones de paradas al arreglo a mostrar
    waypts.push({
      location: new google.maps.LatLng(placesDB[num].lat, placesDB[num].lon),
      stopover: false
    });

    //Incremento de la posición y condición de parada
    num++;
    whileNum++;

    //Condiciones de paradas para el ciclo
    if(whileNum==8) whileStop=false;
    if(placesDB.length-1==num){ whileStop=false; markersShow=false}
  }

  //Posiciones inicial y final del mapa
  var origin = {lat: parseFloat(placesDB[numInit].lat), lng: parseFloat(placesDB[numInit].lon)},
    destination = {lat: parseFloat(placesDB[num].lat), lng: parseFloat(placesDB[num].lon)};
  
  //Servicio de Google para obtener las rutas
  directionsService.route({
    origin: origin, //Inicio de la ruta
    destination: destination, //Final de la ruta
    waypoints: waypts, //Paradas
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.WALKING
  }, function(response, status) {
    //Consulta de la respuesta del servicio de Google
    if (status === google.maps.DirectionsStatus.OK) {
      //Dibujar la ruta
      renderDirections(response, false, placesDB);
      
      //Si no se llegó al final del arreglo dibuja la siguiente parte del mapa (se debe hacer cada 2 segundos debido a restricciones del servicio de Google)
      if(num<placesDB.length-1) setTimeout(calculateAndDisplayRoute, 2000, directionsService, num, true, placesDB);
      
      //En caso de llegar al final modifica el texto de distancia y procede a dibujar el mapa de calor 
      else{
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  })
};

//Función para dibujar la ruta
function renderDirections(result, markersShow, placesDB) {
 
  //Instancias para el punto inicial, el servicio de Google y el mapa
  var startPoint = {lat: parseFloat(placesDB[0].lat), lng: parseFloat(placesDB[0].lon)};
  var directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: false, suppressInfoWindows:false});
  var map = new google.maps.Map(document.getElementById('chart_div1'), {
    center: startPoint,
    scrollwheel: false,
    zoom: 9
  });

  //Servicios de Google para dibujar el mapa
  directionsRenderer.setMap(map);
  directionsRenderer.setDirections(result);
};

