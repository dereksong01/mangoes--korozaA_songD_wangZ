// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");


// Map and projection
//useful: https://d3indepth.com/geographic/
// uses new version D3 5.0 https://github.com/d3/d3/blob/master/CHANGES.md#geographies-d3-geo
// http://bl.ocks.org/palewire/d2906de347a160f38bc0b7ca57721328
var path = d3.geoPath();
var projection = d3.geoAlbersUsa()
    .translate([width/2, height/2])    // translate to center of screen
    .scale([1000]);

// Define path generator
var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
    .projection(projection);  // tell path generator to use albersUsa projection


// Data and color scale
var data = d3.map();
var colorScheme = d3.schemeReds[5];
colorScheme.unshift("#eee")
var colorScale = d3.scaleThreshold()
    .domain([0, 100, 200, 300, 400, 500])
    .range(colorScheme);

// Legend
var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,20)");
g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Average Scores");
var labels = ['0', '1-100', '101-200', '201-300', '301-400', '401-500'];
var legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(4)
    .scale(colorScale);
svg.select(".legendThreshold")
    .call(legend);

// Load external data and boot
d3.queue()
    //.defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.json, "static/us-states.json")
    //used to be name,total,percent,code
    .defer(d3.csv, "static/states_all_extended.csv", function(d) {
      if(d.YEAR==2016){
        data.set(d.STATE.toLowerCase(), +d.AVG_MATH_8_SCORE);
        //console.log(d.STATE.toLowerCase());
        //console.log(data);
      }
      //console.log(d);
      //console.log(data);
    })
    .await(ready);

function ready(error, topo) {
    if (error) throw error;

    // Draw the map
    //.data is just collection of states and their geometries
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
              //console.log(data);
                console.log(d.properties.name.toLowerCase());
                //console.log(data.get(d.id));
                d.AVG_MATH_8_SCORE = data.get(d.properties.name.split(" ").join("_").toLowerCase()) || 0;
                console.log(d.AVG_MATH_8_SCORE);
                // Set the color
                return colorScale(d.AVG_MATH_8_SCORE);
            })
            .attr("d", path);
}
