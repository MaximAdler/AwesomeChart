var chart = angular.module('chart')

chart.controller('googleController', ['$scope', function($scope) {
    $scope.message = 'Stock Data Of Google inc.';


    var margin = {top: 0, left: 150, bottom: 20, right: 0},
        width = 1200 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var panExtent = {x: [new Date(2000, 0, 1),new Date(2020, 0, 1)]};

    var parseDate = d3.time.format("%Y-%m-%d").parse,
        formatDate = d3.time.format("%Y");
        // bisectDate = d3.bisector(function(d) { return d.date; }).left,
        // formatValue = d3.format(",.2f"),
        // formatCurrency = function(d) { return "$" + formatValue(d); };

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
        .tickPadding(10);

    var color = d3.scale.category10();

    var area = d3.svg.area()
        .interpolate(interpolateSankey)
        .x(function(d) { return x(d.date); })
        .y0(y(0))
        .y1(function(d) { return y(d.value); });

    var line = d3.svg.line()
        .interpolate(interpolateSankey)
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

    var svg = d3.select("#main").append("svg")
        .attr("width", width + margin.left + margin.left)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 50])
        .on("zoom", draw);

    d3.csv("./GOOGLstock.csv", function(error, data) {
        if (error) throw error;


    var gradient = svg.append("linearGradient")
            .attr("id","gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", "0%").attr("y1","0%")
            .attr("x2", "0%").attr("y2","100%");

    gradient.append("stop")
            .attr("offset","0%")
            .attr("stop-color","green");

    gradient.append("stop")
            .attr("offset","80%")
            .attr("stop-color"," rgba(227, 177, 0, 0.8)");

    gradient.append("stop")
            .attr("offset","100%")
            .attr("stop-color","red");



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
        .style("fill","url(#gradient)");

    svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

    svg.append("path")
        .attr("class", "line")
        .attr("clip-path", "url(#clip)");

    // var focus = svg.append("g")
    //       .attr("class", "focus")
    //       .style("display", "none");
    //
    //   focus.append("circle")
    //       .attr("r", 3.5);
    //
    //   focus.append("text")
    //       .attr("x", 9)
    //       .attr("dy", ".35em");


    svg.append("rect")
        .attr("class", "pane")
        .attr("width", width)   // something with this stroke(limit width in zoomming)
        .attr("height", height)

        // .on("mouseover", function() { focus.style("display", null); })
        // .on("mouseout", function() { focus.style("display", "none"); })
        // .on("mousemove", mousemove)

    //dots with information

        .call(zoom);






      // var focus = svg.append("g")
      //     .attr("class", "focus");

      // focus.append("line")
      //     .attr("class", "x")
      //     .attr("y1", y(0) - 6)
      //     .attr("y2", y(0) + 6);
      //
      // focus.append("line")
      //     .attr("class", "y")
      //     .attr("x1", width - 6)
      //     .attr("x2", width + 6);
      //
      // focus.append("circle")
      //     .attr("r", 3.5);


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


      // function mousemove() {
      //   var x0 = x.invert(d3.mouse(this)[0]),
      //       i = bisectDate(data, x0, 1),
      //       d0 = data[i - 1],
      //       d1 = data[i],
      //       d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      //   focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
      //   focus.select("text").text(formatCurrency(d.close));
      // }

    });

    function draw() {
      svg.select("g.x.axis").call(xAxis);
      svg.select("g.y.axis").call(yAxis);
      svg.select("path.area").attr("d", area);
      svg.select("path.line").attr("d", line);

      // var d = offsets[Math.round((x.invert(d3.mouse(this)[0]) - start) / step)];
      // focus.select("circle").attr("transform", "translate(" + x(d[0]) + "," + y(d[1]) + ")");
      // focus.select(".x").attr("transform", "translate(" + x(d[0]) + ",0)");
      // focus.select(".y").attr("transform", "translate(0," + y(d[1]) + ")");
      // svg.selectAll(".x.axis path").style("fill-opacity", Math.random()); // Chrome redraw bug
    // }





      // var divisor = {h: height / ((y.domain()[1]-y.domain()[0])*zoom.scale()), w: width / ((x.domain()[1]-x.domain()[0])*zoom.scale())},
      // 	minX = -(((x.domain()[0]-x.domain()[1])*zoom.scale())+(panExtent.x[1]-(panExtent.x[1]-(width/divisor.w)))),
      // 	minY = -(((y.domain()[0]-y.domain()[1])*zoom.scale())+(panExtent.y[1]-(panExtent.y[1]-(height*(zoom.scale())/divisor.h))))*divisor.h,
      // 	maxX = -(((x.domain()[0]-x.domain()[1]))+(panExtent.x[1]-panExtent.x[0]))*divisor.w*zoom.scale(),
      // 	maxY = (((y.domain()[0]-y.domain()[1])*zoom.scale())+(panExtent.y[1]-panExtent.y[0]))*divisor.h*zoom.scale(),
      //
      // 	tx = x.domain()[0] < panExtent.x[0] ?
      // 			minX :
      // 			x.domain()[1] > panExtent.x[1] ?
      // 				maxX :
      // 				zoom.translate()[0],
      // 	ty = y.domain()[0]  < panExtent.y[0]?
      // 			minY :
      // 			y.domain()[1] > panExtent.y[1] ?
      // 				maxY :
      // 				zoom.translate()[1];
      //
      // return [tx,ty];

    }


    function interpolateSankey(points) {
      var x0 = points[0][0], y0 = points[0][1], x1, y1, x2,
          path = [x0, ",", y0],
          i = 0,
          n = points.length;
      while (++i < n) {
        x1 = points[i][0], y1 = points[i][1], x2 = (x0 + x1) / 2;
        path.push("C", x2, ",", y0, " ", x2, ",", y1, " ", x1, ",", y1);
        x0 = x1, y0 = y1;
      }
      return path.join("");
    }
}]);
