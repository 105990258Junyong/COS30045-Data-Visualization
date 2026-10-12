const drawLineChart = (data) => {
  const margin = { top: 20, right: 30, bottom: 50, left: 70 };
  const width = 800;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "1px solid black");

  const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])
    .range([innerHeight, 0]);

  innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

  innerChart.append("g")
    .call(d3.axisLeft(yScale));

  innerChart.append("text")
    .attr("x", -margin.left + 10)
    .attr("y", -10)
    .text("Average Price (cents per kWh)")
    .attr("text-anchor", "start")
    .style("font-size", "12px");

  innerChart.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.averagePrice))
    .attr("r", 3)
    .attr("fill", "#333");

  const lineGenerator = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice));

  innerChart.append("path")
    .datum(data)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2);
};

d3.csv("data/ARE_Spot_Prices.csv", d3.autoType).then(rawData => {
  rawData.forEach(d => {
    const rowArray = Object.values(d);
    d.year = +rowArray[0];
    d.averagePrice = +rowArray[7];
  });

  const cleanData = rawData.filter(d => 
    !isNaN(d.year) && 
    !isNaN(d.averagePrice) && 
    d.averagePrice !== null
  );

  cleanData.sort((a, b) => a.year - b.year);

  console.log("Final data used for the chart:", cleanData);
  drawLineChart(cleanData);
});