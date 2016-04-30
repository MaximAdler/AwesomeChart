var margin = {top: 20, left: 150, bottom: 30, right: 0},
    width = 1200 - margin.left - margin.left,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse,
    formatDate = d3.time.format("%Y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(-height, 0)
    .tickPadding(6);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(width)
    .tickPadding(6);

var area = d3.svg.area()
    .interpolate("step-after")
    .x(function(d) { return x(d.date); })
    .y0(y(0))
    .y1(function(d) { return y(d.value); });

var line = d3.svg.line()
    .interpolate("step-after")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var zoom = d3.behavior.zoom()
    .on("zoom", draw);

// var gradient = svg.append("defs").append("linearGradient")
//      .attr("id", "gradient")
//      .attr("x2", "0%")
//      .attr("y2", "100%");
//
// gradient.append("stop")
//      .attr("offset", "0%")
//      .attr("stop-color", "#fff")
//      .attr("stop-opacity", .5);
//
// gradient.append("stop")
//      .attr("offset", "100%")
//      .attr("stop-color", "#999")
//      .attr("stop-opacity", 1);


svg.append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("x", x(0))
    .attr("y", y(1))
    .attr("width", x(1) - x(0))
    .attr("height", y(0) - y(1));

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + width + ",0)");

svg.append("path")
    .attr("class", "area")
    .attr("clip-path", "url(#clip)")
    .style("fill", "url(#gradient)");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

svg.append("path")
    .attr("class", "line")
    .attr("clip-path", "url(#clip)");

svg.append("rect")
    .attr("class", "pane")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);

d3.csv("q10.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.value = +d.value;
  });

  x.domain([new Date(2012, 0, 1), new Date(2016, 4, 0)]);
  y.domain([0, d3.max(data, function(d) { return d.value; })]);
  zoom.x(x);

  svg.select("path.area").data([data]);
  svg.select("path.line").data([data]);
  draw();
});

function draw() {
  svg.select("g.x.axis").call(xAxis);
  svg.select("g.y.axis").call(yAxis);
  svg.select("path.area").attr("d", area);
  svg.select("path.line").attr("d", line);
}




















































// var svg = dimple.newSvg("body", 1200, 900);
//
// d3.json("/stock.json", function(data) {
//
//
//   data.data.forEach(function(d) {
//     var parseDate = d3.time.format("%Y-%m-%d").parse,
//         formatDate = d3.time.format("%Y");
//         d.date = parseDate(d.date);
//         d.volume = +d.volume;
//
//     // d["Date"] = d["Date"].substring(0, d["Date"].length - 2);
//   }, this);
//
//
//   var chart = new dimple.chart(svg, data.data);
//
//   var x = chart.addCategoryAxis("x", "Date", "%d %b %Y", "%d %b ");
//
//
//   //x.timeField = "Date"; // to make a date form
//
//   var y = chart.addMeasureAxis("y", "Volume");
//
//   var s = chart.addSeries(null, dimple.plot.bubble);
//
//
//   chart.addColorAxis("Volume", ["red", "yellow", "green"]);
//   // chart.addLegend(180, 10, 360, 20, "right");
//
//
//   var lines = chart.addSeries(null, dimple.plot.line);
//   lines.lineWeight = 3;
//   lines.lineMarkers = true;
//
//   chart.draw();
//
// })
