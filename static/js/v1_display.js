function v1(filepath,svg,desc){
    // for visualization 1 display
    // TO-DO
    // for now only heatmap
    v1_line(filepath,svg,desc);
}

function v1_line(filepath,diagram,desc){
	// Reference from: https://bl.ocks.org/mbostock/3884955
    var x = d3.scaleLinear().range([0, width]),
    	y = d3.scaleLinear().range([height, 0]),
    	z = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3.line()
    	.x(function(d) { return x(d.week); })
    	.y(function(d) { return y(d.commits); });

    d3.json(filepath, function(error, data) {
    	// convert data for line graph
    	var users = d3.nest()
			.key(function(d) { return d.user; })
  			.entries(data);
  		console.log(users);
        // title for the diagram
        var title = diagram.append("text")
            .attr("class", "plot-title")
        	.text("Weekly commits by repository owner(s) and non-repository owner(s).");
        // labels for weeks (x-axis)
        x.domain(d3.extent(data, function(d) { return d.week; }));
        var weekLabels = diagram.append("g")
            .attr("class", "week-axis")
            .attr("transform", "translate(0," + (height+margin.top) + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .attr("x", width-80)
            .attr("dx", "0.71em")
      		.attr("fill", "#000")
            .text("n week before current week");

        // labels for number of commits (y-axis)
        y.domain([0,d3.max(data, function(d) { return d.commits; })]);
        var commitsLabels = diagram.append("g")
            .attr("class", "commits-axis")
            .attr("transform", "translate(0," + margin.top + ")")
            .call(d3.axisLeft(y))
    		.append("text")
      		.attr("transform", "rotate(-90)")
      		.attr("y", 6)
      		.attr("dy", "0.71em")
      		.attr("fill", "#000")
      		.text("Number of commits");
        // line for each user
        var lines = diagram.selectAll(".plot")
        	.data(users)
        	.enter().append("g")
			.attr("class", "plot")
			.attr("transform", "translate(0," + margin.top + ")");

        lines.append("path")
			.attr("class", "line")
			.attr("d", function(d) {return line(d.values); })
			.style("stroke", function(d) { return z(d.key);});

  		lines.append("text")
			.datum(function(d) {return {id: d.key, value: d.values[d.values.length - 1]}; })
			.attr("transform", function(d) {return "translate(" + (x(d.value.week)-50) + "," + y(d.value.commits) + ")"; })
			.attr("x", 3)
			.attr("dy", "0.85em")
			.style("font", "10px sans-serif")
			.text(function(d) {return d.id; });


        line_desc(desc);
  });
}

function line_desc(desc){
    var text_desc = desc.append("text")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .text("Description of diagram here...");
}