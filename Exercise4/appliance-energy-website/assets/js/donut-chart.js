const drawDonutChart = (data) => {
  const width = 500;
  const height = 500;
  const radius = Math.min(width, height) / 2 - 40;

  const svg = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "1px solid black");

  const innerChart = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.screensize_category))
    .range(d3.schemeSet2);

  const pie = d3.pie()
    .value(d => d.Count)
    .sort(null);

  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius);

  innerChart.selectAll("path")
    .data(pie(data))
    .join("path")
    .attr("d", arcGenerator)
    .attr("fill", d => color(d.data.screensize_category))
    .attr("stroke", "white")
    .attr("stroke-width", 2);

  innerChart.selectAll("text")
    .data(pie(data))
    .join("text")
    .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .style("fill", "white")
    .text(d => d.data.screensize_category);
};

d3.csv("data/TV_ScreenSize.csv", d3.autoType).then(data => {
  console.log("5.3 donut chart data:", data);
  drawDonutChart(data);
});