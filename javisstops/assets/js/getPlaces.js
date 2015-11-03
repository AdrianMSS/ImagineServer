function getData(){  
  var setHeader = function (req) {
    req.setRequestHeader('content-type', 'application/json'); 
    req.setRequestHeader('accept', 'application/json'); 
  }; 
  $.ajax({
    type: "GET",
    url: "pos",
    beforeSend: setHeader,
    success: function(res){
      drawVisualization();
    }
  });
};
google.load("visualization", "1", {packages:["corechart"]});
//google.setOnLoadCallback(drawChart);

  function drawVisualization() {
    var data = new google.visualization.DataTable();

   data.addColumn('number', 'Lat');                                
   data.addColumn('number', 'Long');
   data.addColumn('number', 'Value'); 
   data.addColumn({type:'string', role:'tooltip'});                        

  data.addRows([[9.854650133333333,-83.90846178333334,14,'Escuela de Ingeniería Electrónica']]);
  data.addRows([[10.625046,-85.44285083333334,2,'Parque de Liberia']]);
  data.addRows([[9.931462633333334,-84.04534116666666,9,'Muñoz y Nanne']]);
                                 
   
   var options = {
   region: 'CR', // Africa
   colorAxis:  {minValue: 0, maxValue: 15,  colors: ['#00853f', '#F0E922', '#e31b23']},  
   backgroundColor: {fill:'transparent',stroke:'#FFF' ,strokeWidth:0 },    
   datalessRegionColor: '#DEDEDE',
   displayMode: 'markers', 
   enableRegionInteractivity: 'true', 
   resolution: 'provinces',
   sizeAxis: {minValue: 1, maxValue:1,minSize:5,  maxSize: 5},
   keepAspectRatio: true,
   tooltip: {textStyle: {color: '#444444'}}    
   };
    var chart = new   google.visualization.GeoChart(document.getElementById('chart_div')); 
       
   chart.draw(data, options);
 }