function getData(){  
  var setHeader = function (req) {
    req.setRequestHeader('content-type', 'application/json'); 
    req.setRequestHeader('accept', 'application/json'); 
  }; 
  $.ajax({
    type: "GET",
    url: "Imagine/",
    beforeSend: setHeader,
    success: function(res){
      drawChart(res);
      drawChart2(res);
    }
  });
};
google.load("visualization", "1", {packages:["corechart"]});
//google.setOnLoadCallback(drawChart);

function drawChart(dataJson) {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Fecha');
  var teamsArray = ['ElectronicsSolutionDevices','Bulldozer','OvejasElectricas','SmarTicos','InnovationSourceCode',
    'Envitech','Neotronic','InfotronicCircuits','Float','InDePro','LaNaranjaMecanica','FrozenbyteKnights','Iwa',
    'TeamCR','NovaMakers','A','WIN','X','Y','Z'];

  teamsArray.forEach(function(obj){
    data.addColumn('number', obj);
  });

  _.each(dataJson[0].logs.post, function(obj, key){
    data.addRow([new Date(key),  obj.ElectronicsSolutionDevices, obj.Bulldozer, obj.OvejasElectricas, obj.SmarTicos, 
      obj.InnovationSourceCode, obj.Envitech, obj.Neotronic, obj.InfotronicCircuits, obj.Float, obj.InDePro, 
      obj.LaNaranjaMecanica, obj.FrozenbyteKnights, obj.Iwa, obj.TeamCR, obj.NovaMakers, obj.A, obj.WIN, obj.X
      , obj.Y, obj.Z]);
  });

  var options = {
    title: 'Cantidad de POST de los equipos',
    hAxis: {title: 'Fecha',  titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function drawChart2(dataJson) {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Fecha');
  var teamsArray = ['ElectronicsSolutionDevices','Bulldozer','OvejasElectricas','SmarTicos','InnovationSourceCode',
    'Envitech','Neotronic','InfotronicCircuits','Float','InDePro','LaNaranjaMecanica','FrozenbyteKnights','Iwa',
    'TeamCR','NovaMakers','A','WIN','X','Y','Z'];

  teamsArray.forEach(function(obj){
    data.addColumn('number', obj);
  });

  _.each(dataJson[0].logs.get, function(obj, key){
    data.addRow([new Date(key),  obj.ElectronicsSolutionDevices, obj.Bulldozer, obj.OvejasElectricas, obj.SmarTicos, 
      obj.InnovationSourceCode, obj.Envitech, obj.Neotronic, obj.InfotronicCircuits, obj.Float, obj.InDePro, 
      obj.LaNaranjaMecanica, obj.FrozenbyteKnights, obj.Iwa, obj.TeamCR, obj.NovaMakers, obj.A, obj.WIN, obj.X
      , obj.Y, obj.Z]);
  });

  var options = {
    title: 'Cantidad de GETS de los equipos',
    hAxis: {title: 'Fecha',  titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
  chart.draw(data, options);
}