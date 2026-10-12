const drawScatterplot = (data) => { 
    const svg = d3.select("#scatterplot") 
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`); 
    innerChartS = svg.append("g") 
        .attr("transform", `translate(${margin.left},${margin.top})`); 
    const maxStar = d3.max(data, d => d.star); 
    const maxEnergy = d3.max(data, d => d.energyConsumption); 
    
    xScaleS.domain([0, maxStar]).range([0, innerWidth]); 
    yScaleS.domain([0, maxEnergy]).range([innerHeight, 0]).nice(); 
    
    colorScale 
        .domain(["LED", "LCD", "OLED"]) 
        .range(d3.schemeCategory10); 
        
    innerChartS.selectAll("circle") 
        .data(data) 
        .join("circle") 
            .attr("r", 3) 
            .attr("cx", d => xScaleS(d.star)) 
            .attr("cy", d => yScaleS(d.energyConsumption)) 
            .attr("fill", d => colorScale(d.screenTech)) 
            .attr("opacity", 0.5); 
            
    innerChartS.append("g") 
        .attr("transform", `translate(0,${innerHeight})`) 
        .call(d3.axisBottom(xScaleS)); 
            
    innerChartS.append("g") 
        .call(d3.axisLeft(yScaleS)); 
            
    innerChartS.append("text")
        .attr("class", "axis-label") 
        .attr("x", innerWidth) 
        .attr("y", innerHeight + 40) 
        .attr("text-anchor", "end") 
        .text("Star Rating"); 
        
    innerChartS.append("text") 
        .attr("class", "axis-label") 
        .attr("x", 0) 
        .attr("y", -15) 
        .attr("text-anchor", "start") 
        .text("Labeled Energy Consumption (kWh/year)"); 
    const legend = svg .
    append("g") 
    .attr("transform", `translate(${width - 100}, ${margin.top})`); 
    
    colorScale.domain().forEach((screenTech, i) => { 
        const legendRow = legend 
        .append("g") 
        .attr("transform", `translate(0, ${i * 20})`); 
        
    legendRow.append("rect") 
        .attr("width", 10) 
        .attr("height", 10) 
        .attr("fill", colorScale(screenTech)); 
        
    legendRow
        .append("text") 
        .attr("x", 20) 
        .attr("y", 10) 
        .attr("text-anchor", "start") 
        .style("alignment-baseline", "middle") 
        .style("font-size", "12px") 
        .text(screenTech); 
    }); 
};