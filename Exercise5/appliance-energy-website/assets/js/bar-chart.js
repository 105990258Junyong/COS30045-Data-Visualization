const drawBarChart = (data) => {
  const margin = { top: 20, right: 20, bottom: 60, left: 70 };
  const width = 800;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "1px solid black");

  const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.2);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Energy_consumption)])
    .range([innerHeight, 0]);

  innerChart.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => xScale(d.Screen_Tech))
    .attr("y", d => yScale(d.Energy_consumption))
    .attr("width", xScale.bandwidth())
    .attr("height", d => innerHeight - yScale(d.Energy_consumption))
    .attr("fill", "green");

  innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));

  innerChart.append("g")
    .call(d3.axisLeft(yScale));

  innerChart.append("text")
    .attr("x", -margin.left + 10)
    .attr("y", -10)
    .text("Energy Consumption (kWh)")
    .attr("text-anchor", "start")
    .style("font-size", "12px")
    .style("fill", "#333");
};

d3.csv("data/TV_Energy_55inch.csv", d3.autoType).then(data => {
  console.log("5.1 data loaded:", data);
  drawBarChart(data);
});