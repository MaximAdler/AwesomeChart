var request = new XMLHttpRequest();
request.open("GET", "/stock.json", false);
request.send(null);
request.onreadystatechange = function() {
  if ( request.readyState === 4 && request.status === 200 ) {
    var data = JSON.parse(request.responseText);

  }
  data.forEach(function(d) {
    d["Date"] = d["Date"].substring(0, d["Date"].length - 2);
    d["Time of Day"] =
      "2000-01-01 " + d["Date"].substring(d["Date"].length - 5);
  }, this);
}
// data.forEach(function(d) {
//   d["Date"] = d["Date"].substring(0, d["Date"].length - 2);
//   d["Time of Day"] =
//     "2000-01-01 " + d["Date"].substring(d["Date"].length - 5);
// }, this);

var svg = dimple.newSvg("body", 1200, 900);

d3.json("/stock.json", function(data) {



var chart = new dimple.chart(svg, data.data);

var x = chart.addCategoryAxis("x", "Date", "%d %b %Y", "%d %b");


//x.timeField = "Date"; // to make a date form

var y = chart.addMeasureAxis("y", "Volume");

var s = chart.addSeries(null, dimple.plot.bubble);


chart.addColorAxis("Volume", ["red", "yellow", "green"]);
// chart.addLegend(180, 10, 360, 20, "right");


var lines = chart.addSeries(null, dimple.plot.line);
lines.lineWeight = 3;
lines.lineMarkers = true;

chart.draw();

})
