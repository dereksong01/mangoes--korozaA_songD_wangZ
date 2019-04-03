/*  This visualization was made possible by modifying code provided by:

Ultimately this is a frustrating browser cache issue, which can be solved by forcing the browser to do a "hard refresh",
which is going to be a browser/OS dependent keystroke, but generally this works:
Windows: Ctrl+F5
Mac: Cmd+Shift+R
Linux: Ctrl+Shift+R

    Scott Murray, Choropleth example from "Interactive Data Visualization for the Web"
    https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html

    Malcolm Maclean, tooltips example tutorial
    http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

    Mike Bostock, Pie Chart Legend
    http://bl.ocks.org/mbostock/3888852

    https://bl.ocks.org/Fil/0bf58d23011ab244c657a1262bcbe4b2 color schemes
    */


//Width and height of map
var width = 960;
var height = 500;

// D3 Projection
var projection = d3.geo.albersUsa()
    .translate([width/2, height/2])    // translate to center of screen
    .scale([1000]);          // scale things down so see entire US

// Define path generator
var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
    .projection(projection);  // tell path generator to use albersUsa projection


// Define linear scale for output
var color = d3.scale.linear()
    .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);
//console.log(d3.schemeBlues[5]);
//defining color for cholorpleth effect
//var color = d3.scaleQuantize([1, 10], d3.schemeBlues[5])
//var color = d3.scale.ordinal(d3.schemeBlues[9]);
//console.log(d3.schemeBlues[5]);

//var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];

//Create SVG element and append map to the SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Append Div for tooltip to SVG
var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//legend creation
var w = 140, h = 400;
var key = d3.select("body").append("svg").attr("width", w).attr("height", h);
var legend = key.append("defs").append("svg:linearGradient")
  .attr("id", "gradient")
  .attr("x1", "100%")
  .attr("y1", "0%")
  .attr("x2", "100%")
  .attr("y2", "100%")
  .attr("spreadMethod", "pad");
legend.append("stop").attr("offset", "0%").attr("stop-color", "rgb(224,255,255)").attr("stop-opacity", 1);
legend.append("stop").attr("offset", "100%").attr("stop-color", "rgb(95,158,160)").attr("stop-opacity", 1);

key.append("rect").attr("width", w - 100).attr("height", h - 100).style("fill", "url(#gradient)").attr("transform", "translate(0,10)");
var y = d3.scale.linear().range([300, 0]).domain([1, 5]);
var yAxis = d3.svg.axis().scale(y).orient("right");

legend.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Total Revenue (Darker is more)");

// Load in my states data!
d3.csv("static/states_all_extended.csv", function(data) {

    //color.domain([0,1,2,3]); // setting the range of the input data

    // Load GeoJSON data and merge with states data
    d3.json("static/us-states.json", function(json) {
	var list = [];
	for (var i = 0; i < data.length; i++) {
	    list[i] = data[i].TOTAL_REVENUE;
	}

	//console.log(Math.min(...list));
	//console.log(Math.max(...list));
	//console.log(list.length);
        // Loop through each state data value in the .csv file
        for (var i = 0; i < 51; i++) {

       	    // Grab State Name
            var dataState = data[i].STATE;

	    // Grab data value
	    var dataValue = data[i].TOTAL_REVENUE;

	    // Find the corresponding state inside the GeoJSON
	    for (var j = 0; j < json.features.length; j++)  {
		  var jsonState = json.features[j].properties.name;
      var splt= jsonState.split(" ").join("_");
      //console.log(splt);
	        if (dataState.toLowerCase() == splt.toLowerCase()) {
		    //console.log(jsonState);
		    // Copy the data value into the JSON
		    json.features[j].properties.TOTAL_REVENUE = dataValue;

		    // Stop looking through the JSON
		    break;
		}
	    }
	}

        // Bind the data to the SVG and create one path per GeoJSON feature
        svg.selectAll("path")
	    .data(json.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
	    .style("stroke", "#fff")
	    .style("stroke-width", "1")
	    .style("fill", function(d) {
        //color(data.get(d.properties.TOTAL_REVENUE));
      //});
      //.attr("fill", d => color(data.get(d.properties.TOTAL_REVENUE)))

  	// Get data value
 		var value = d.properties.TOTAL_REVENUE;
		console.log(value);
		if (value < 900000) {
		    return "rgb(224,255,255)"
		}
		else if (value < 1800000) {
		    return "rgb(173,216,230)"
		}
		else if (value < 3000000) {
		    return "rgb(135,206,235)"
		}
		else if (value < 4500000) {
		    return "rgb(0,191,255)"
		}
		else if (value < 6000000) {
		    return "rgb(0,255,255)"
		}
		else if (value < 8000000) {
		    return "rgb(30,144,255)"
		}
		else if (value < 15000000) {
		    return "rgb(100,149,237)"
		}
		else if (value < 40000000) {
		    return "rgb(127,255,212)"
		}
		else if (value < 60000000) {
		    return "rgb(70,130,180)"
		}
		else if (value < 89217262) {
		    return "rgb(95,158,160)"
		}
		    //If value exists…
		    //return color(1);
        //return color;
		else {
		    //If value is undefined…
		    return "rgb(213,222,217)";
		}
  });
/*
        // Map the cities I have lived in!
      d3.csv("static/cities-lived.csv", function(data) {

	   svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
		    return projection([d.lon, d.lat])[0];
		})
		.attr("cy", function(d) {
		    return projection([d.lon, d.lat])[1];
		})
		.attr("r", function(d) {
		    return Math.sqrt(d.years) * 4;
		})
		.style("fill", "rgb(217,91,67)")
		.style("opacity", 0.85)

	    // Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks"
	    // http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
		.on("mouseover", function(d) {
    		    div.transition()
      			.duration(200)
			.style("opacity", .9);
		    div.text(d.place)
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})

	    // fade out tooltip on mouse out
		.on("mouseout", function(d) {
		    div.transition()
			.duration(500)
			.style("opacity", 0);
		});
	});
*/

/*
	// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
	var legend = d3.select("body").append("svg")
      	    .attr("class", "legend")
     	    .attr("width", 140)
    	    .attr("height", 200)
   	    .selectAll("g")
   	    .data(color.domain().slice().reverse())
   	    .enter()
   	    .append("g")
     	    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  	legend.append("rect")
   	    .attr("width", 18)
   	    .attr("height", 18)
   	    .style("fill", color);

  	legend.append("text")
  	    .data(legendText)
      	    .attr("x", 24)
      	    .attr("y", 9)
      	    .attr("dy", ".35em")
      	    .text(function(d) { return d; });
*/

});
});
