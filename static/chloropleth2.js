// GRADES CODE

var currYear = 2017;
var toolTipWidth = 150;
var toolTipBarWidth = 150;
var toolTipYearCount = 3;
var barHeight = 15;

// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");


// Map and projection
//useful: https://d3indepth.com/geographic/
// uses new version D3 5.0 https://github.com/d3/d3/blob/master/CHANGES.md#geographies-d3-geo
// http://bl.ocks.org/palewire/d2906de347a160f38bc0b7ca57721328
//var path = d3.geoPath();
var projection = d3.geoAlbersUsa()
    .translate([width / 1.7, height / 2])    // translate to center of screen
    .scale([1000]);

// Define path generator
var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
    .projection(projection);  // tell path generator to use albersUsa projection


// Data and color scale
var data = d3.map();
var colorScheme = d3.schemeBlues[5];
colorScheme.unshift("#eee")
var colorScale = d3.scaleThreshold()
    .domain([260,270,275,280,290,300])
    .range(colorScheme);

// Legend
var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,20)");
g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("NAEP Score (out of 500)");
var labels = ['0-260', '260-270', '270-275', '275-280', '280-290', '290-300'];
var legend = d3.legendColor()
    .labels(function (d) {
        return labels[d.i];
    })
    .shapePadding(4)
    .scale(colorScale);
svg.select(".legendThreshold")
    .call(legend);

// Load external data and boot
d3.queue()
//.defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.json, "static/us-states.json")
    //used to be name,total,percent,code
    .defer(d3.csv, "static/states_all_extended.csv", function (d) {
        data.set(d.STATE.toLowerCase()+d.YEAR, +d.AVG_MATH_8_SCORE);
        //console.log(d);
        //console.log(data);
    })
    .await(ready);

function toKey(state) {
    return state.split(" ").join("_").toLowerCase();
}

function ready(error, topo) {
    if (error) throw error;

    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([20, 120])
        .html(function (d) {
            var x = 'xxx';//+d.properties.value;
            //x = x.toPrecision(2);
            return "State: " + d.properties.name + "<br>"
                //+ "Revenue (past 3 years):" + "<br>"
                + "<div id='tipDiv'></div><br>"
        });
    svg.call(tip);

    // Draw the map
    //.data is just collection of states and their geometries
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
        .attr("fill", function (d) {
            //console.log(data);
            //console.log(d.properties.name.toLowerCase());
            //console.log(data.get(d.id));
            d.AVG_MATH_8_SCORE = data.get(toKey(d.properties.name)+currYear) || 0;
            //console.log(d.AVG_MATH_8_SCORE);
            // Set the color
            return colorScale(d.AVG_MATH_8_SCORE);
        })
        //giving the map mouseover func
        // https://bl.ocks.org/maelafifi/ee7fecf90bb5060d5f9a7551271f4397 reference code!!! men vs women pay
        .on("mouseover", function (d) {
            var state  = toKey(d.properties.name);
            //console.log(d.properties.name);
            //console.log(d.AVG_MATH_8_SCORE);
            tip.show(d);

            var tipSVG = d3.select("#tipDiv")
                .append("svg")
                .attr("width", toolTipWidth)
                .attr("height", barHeight * toolTipYearCount);

            var dataset = new Array(toolTipYearCount);
            for (let i = 0; i < toolTipYearCount; i++) {
                var revenue = data.get(state + (currYear - i));
                dataset[i] = [(currYear - i), revenue, 0]
            }
            // add max for the data set as last param
            for (let i = 0; i < toolTipYearCount; i++) {
                dataset[i][2] = d3.max(dataset[1])
            }
            console.log(dataset);

            var bar = tipSVG.selectAll("g")
                .data(dataset)
                .enter().append("g")
                .attr("transform", function (d, i) {
                    return "translate(0," + i * barHeight + ")";
                });

            bar.append("text")
                .attr("x", 2)
                .attr("y", barHeight / 2)
                .attr("dy", ".35em")
                .style("font-size", "10px")
                .text(function (d) {
                    return d[0] + " score: " + d[1];
                });

            bar.append("rect")
                .attr("width", 0)
                //.attr("height", bar)
                .attr("opacity", 0.5)
                .transition()
                .duration(1000)
                //.attr("width", w)
                .attr("width", function (d) {
                    var w = toolTipBarWidth * (d[1]/d[2]) * 5;
                    //console.log("w: "+w);
                    return w;
                })
                .attr("height", barHeight - 1)
                .attr("fill", function (d) {
                    return '#008080';
                });
        })
        .on("mouseout", tip.hide)
        .attr("d", path);
}
