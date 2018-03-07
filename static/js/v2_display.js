function v2(filepath,svg,desc){
    // TO-DO: to combine all different display for v2
    // have to create button within display
    
    // for now only heatmap
    v2_heatmap(filepath,svg,desc);
    // For each individual days, plot something
    
}

function v2_heatmap(filepath,diagram,desc){
    // Reference from: http://bl.ocks.org/tjdecke/5558084
    var gridSize = Math.floor(width / 24),
        legendElementWidth = gridSize*1.5,
        buckets = 9,
        colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
        times = ["8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"];

    d3.json(filepath, function(error, data) {
        // title for the diagram
        var title = diagram.append("text")
            .attr("class", "plot-title")
            .text("Total Number of commits per working hour (8am - 6pm) for each day");
        // labels for days
        var days = d3.map(data, function(d){return d.day;}).keys();
        var dayLabels = diagram.append("g")
            .attr("class", "day-axis")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        dayLabels.selectAll(".dayLabels")
            .data(days)
            .enter().append("text")
                .text(function (d) {return d; })
                .attr("x", 0)
                .attr("y", function (d, i) {return i * gridSize; })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + gridSize / 1.5 + ")");
        // labels for time
        var timeLabels = diagram.append("g")
            .attr("class", "time-axis")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        timeLabels.selectAll(".timeLabel")
            .data(times)
            .enter().append("text")
                .text(function(d) { return d; })
                .attr("x", function(d, i) { return i * gridSize; })
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 1.5 + ", -6)");
        // for heatmap (rect) colour
        var colorScale = d3.scaleQuantile()
            .domain([0, buckets - 1, d3.max(data, function (d) { return d.commits; })])
            .range(colors);
        var cards = diagram.append("g")
            .attr("class", "heat-map")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // define each grid on the heatmap
        var cardsall = cards.selectAll(".rect")
            .data(data, function(d) {return d.day+':'+d.time;})
            .enter().append("rect")
                .attr("x", function(d) { return (d.time - 8) * gridSize; })
                .attr("y", function(d,i) { 
                    v=days.map(function(e) { return e; }).indexOf(d.day);
                    return v * gridSize; 
                })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("class", "hour bordered")
                .attr("width", gridSize)
                .attr("height", gridSize)
                .style("fill", colors[0]);
        // add rollover text (to replace with mouse over later)
        cardsall.append("title").text(function(d){return "Commits: "+d.commits;});
        
        // for transistion of dataset
        cardsall.transition().duration(1000)
            .style("fill", function(d) {return colorScale(d.commits); });

        // legend for the heatmap
        var legend = diagram.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var legend_all = legend.selectAll(".legend")
            .data([0].concat(colorScale.quantiles()), function(d) { return d; })
            .enter().append("rect")
                .attr("x", function(d, i) { return legendElementWidth * i; })
                .attr("y", height)
                .attr("width", legendElementWidth)
                .attr("height", gridSize / 2)
                .style("fill", function(d, i) { return colors[i]; });

        legend.selectAll(".legend")
            .data([0].concat(colorScale.quantiles()), function(d) { return d; })
            .enter().append("text")
                .attr("class", "mono")
                .text(function(d) { return "≥ " + Math.round(d); })
                .attr("x", function(d, i) { return legendElementWidth * i+5; })
                .attr("y", height+gridSize);

        heatmap_desc(desc);
  });
}

function heatmap_desc(desc){
    var text_desc = desc.append("text")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .text("Description of diagram here...");
}