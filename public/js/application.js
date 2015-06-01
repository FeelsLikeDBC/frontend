var lineChart = (function(){
  var initChart = function(fkData){
    var vis = d3.select("#visualisation"),
      WIDTH = parseInt(d3.select('#things').style('width'),10),
      HEIGHT = 500,
      MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(fkData, function (d) {
          return d.date;
        }),
        d3.max(fkData, function (d) {
          return d.date;
        })
      ]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(fkData, function (d) {
        return 0;
      }),
      d3.max(fkData, function (d) {
        return d.high_apparent_temp;
      })
    ]),
    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);

    vis.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);
    vis.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);
    var cloudCovLine = d3.svg.line()
    .x(function (d) {
      return xRange(d.date);
    })
    .y(function (d) {
      return yRange(d.high_apparent_temp);
    })
    .interpolate('linear');
    vis.append("svg:path")
      .attr("d", cloudCovLine(fkData))
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    var humidityLine = d3.svg.line()
    .x(function (d) {
      return xRange(d.date);
    })
    .y(function (d) {
      return yRange(d.high_apparent_temp);
    })
    .interpolate('linear');
    vis.append("svg:path")
      .attr("d", humidityLine(fkData))
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .on('mouseover',function(d){
        d3.select(this)
          .attr('stroke-width',5);
      })
      .on('mouseout',function(d){
        d3.select(this)
          .attr('stroke-width',2);
      });
    };
  var initChart2 = function(fkData){
    var vis = d3.select("#visualisation"),
      WIDTH = parseInt(d3.select('#things').style('width'),10),
      HEIGHT = 500,
      MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(fkData, function (d) {
          return d.date;
        }),
        d3.max(fkData, function (d) {
          return d.date;
        })
      ]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(fkData, function (d) {
        return 0;
      }),
      d3.max(fkData, function (d) {
        return d.high_apparent_temp;
      })
    ]),
    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);

    vis.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);
    vis.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);
    var cloudCovLine = d3.svg.line()
    .x(function (d) {
      return xRange(d.date);
    })
    .y(function (d) {
      return yRange(d.high_apparent_temp);
    })
    .interpolate('linear');
    vis.append("svg:path")
      .attr("d", cloudCovLine(fkData))
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    var humidityLine = d3.svg.line()
    .x(function (d) {
      return xRange(d.date);
    })
    .y(function (d) {
      return yRange(d.high_apparent_temp);
    })
    .interpolate('linear');
    vis.append("svg:path")
      .attr("d", humidityLine(fkData))
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .on('mouseover',function(d){
        d3.select(this)
          .attr('stroke-width',5);
      })
      .on('mouseout',function(d){
        d3.select(this)
          .attr('stroke-width',2);
      });
    };
  return {
    initChart: initChart,
    initChart2: initChart2,
  }

})();

var size = (function(){
  var resize = function(ele) {
    d3.select(window).on('resize', function(){
      d3.select(ele).style('width',parseInt(d3.select('#things').style('width'),10))
    })
  }
  return {
    resize: resize,
  }
})();


$(document).ready(function() {
  $('body').on('click','#compare',function(event){
    event.preventDefault();
    $.get("/sf").done(function(data){
      var fk_resp = JSON.parse(data).weather["2011"];


      $('<svg id="visualisation" width="'+parseInt(d3.select('#things').style('width'),10)+'" height="500"></svg>').appendTo('#things');
      size.resize('#visualisation');
      lineChart.initChart(fk_resp);
    });

    $.get("/rich").done(function(data){
      var fk_resp = JSON.parse(data).weather["2012"];
      lineChart.initChart2(fk_resp);
    });
  })
});
