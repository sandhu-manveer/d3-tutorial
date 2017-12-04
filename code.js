/* 
Declaring scales

var shape_color = function (shape) {
    if (shape == 'triangle') {
      return 'red';
    }else if (shape == 'line') {
      return 'yellow';
    }else if (shape == 'pacman') {
      return 'green';
    }else if (shape == 'square') {
      return 'red';
    }
};

var scale = d3.scale.ordinal()
.domain(['triangle', 'line', 'pacman', 'square'])
.range(['red', 'yellow', 'green', 'red']);
 */

// create drawing area
var width = 800,
  height = 600,
   svg = d3.select('#graph')
       .append('svg')
       .attr({width: width,
             height: height});

// declare scale
var data = d3.range(30),
colors = d3.scale.category10(),
points = d3.scale.ordinal().domain(data)
               .rangePoints([0, height], 1.0),
bands = d3.scale.ordinal().domain(data)
               .rangeBands([0, width], 0.1);

var paths = svg.selectAll('path')
  .data(data)
  .enter()
  .append('path')
  .attr({
      d: d3.svg.symbol().type('circle').size(20),
      transform: function (d) { 
        return 'translate('+(width/2)+', '+points(d)+')'; }
    })
  .style('fill', function (d) { return colors(d); });

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr({x: function (d) { return bands(d); },
     y: height/2,
     width: bands.rangeBand(),
     height: 10})
  .style('fill', function (d) { return colors(d); });
