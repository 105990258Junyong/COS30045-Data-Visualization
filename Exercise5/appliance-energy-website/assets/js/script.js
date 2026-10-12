document.addEventListener("DOMContentLoaded", function () {
  setFooterYear();
  initFaqAccordion();
  initEnergyCalculator();
  initEnergyChart();
});

function setFooterYear() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function initFaqAccordion() {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const answer = button.nextElementSibling;
      const isOpen = button.classList.contains("open");

      button.classList.toggle("open", !isOpen);
      answer.classList.toggle("open", !isOpen);

      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

function initEnergyCalculator() {
  const form = document.getElementById("energy-calculator-form");
  if (!form) return;

  const wattageInput = document.getElementById("wattage");
  const hoursInput = document.getElementById("hours-per-day");
  const priceInput = document.getElementById("price-per-kwh");
  const errorText = document.getElementById("calc-error");
  const resultsPanel = document.getElementById("results-panel");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const wattage = parseFloat(wattageInput.value);
    const hoursPerDay = parseFloat(hoursInput.value);
    const pricePerKwh = parseFloat(priceInput.value);

    if (
      isNaN(wattage) || wattage <= 0 ||
      isNaN(hoursPerDay) || hoursPerDay < 0 || hoursPerDay > 24 ||
      isNaN(pricePerKwh) || pricePerKwh < 0
    ) {
      errorText.textContent =
        "Please enter a valid wattage (>0), hours per day (0-24), and electricity price (0 or more).";
      errorText.classList.add("show");
      resultsPanel.innerHTML = "";
      return;
    }

    errorText.classList.remove("show");
    errorText.textContent = "";

    const dailyKwh = (wattage * hoursPerDay) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const yearlyKwh = dailyKwh * 365;

    const pricePerKwhDollars = pricePerKwh / 100;
    const dailyCost = dailyKwh * pricePerKwhDollars;
    const monthlyCost = monthlyKwh * pricePerKwhDollars;
    const yearlyCost = yearlyKwh * pricePerKwhDollars;

    resultsPanel.innerHTML = `
      <h3>Estimated Energy Consumption</h3>
      <div class="result-row">
        <span>Daily energy use</span>
        <span class="result-value">${dailyKwh.toFixed(2)} kWh</span>
      </div>
      <div class="result-row">
        <span>Monthly energy use</span>
        <span class="result-value">${monthlyKwh.toFixed(2)} kWh</span>
      </div>
      <div class="result-row">
        <span>Yearly energy use</span>
        <span class="result-value">${yearlyKwh.toFixed(2)} kWh</span>
      </div>
      <div class="result-row">
        <span>Estimated daily cost</span>
        <span class="result-value">$${dailyCost.toFixed(2)}</span>
      </div>
      <div class="result-row">
        <span>Estimated monthly cost</span>
        <span class="result-value">$${monthlyCost.toFixed(2)}</span>
      </div>
      <div class="result-row">
        <span>Estimated yearly cost</span>
        <span class="result-value">$${yearlyCost.toFixed(2)}</span>
      </div>
    `;
  });
}

function initEnergyChart() {
  const container = document.querySelector(".responsive-svg-container");
  if (!container) return;

  const width  = 800;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const innerWidth  = width  - margin.left - margin.right;
  const innerHeight = height - margin.top  - margin.bottom;

  const svg = d3.select(container)
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid black");

  const chart = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("data/BrandCount.csv", d3.autoType).then(rawData => {
  const data = rawData.slice(0, 10);
  console.log("Loaded first 10 rows:", data);

    const xScale = d3.scaleBand()
      .domain(data.map(d => d["Brand_Reg"]))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d["Count(SoldIn)"])])
      .nice()
      .range([innerHeight, 0]);

    const groups = chart.selectAll("g.bar-group")
      .data(data, d => d["Brand_Reg"])
      .join("g")
        .attr("class", "bar-group")
        .attr("transform", d => `translate(${xScale(d["Brand_Reg"])}, 0)`);

    groups.append("rect")
      .attr("class", "bar")
      .attr("y", d => yScale(d["Count(SoldIn)"]))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d["Count(SoldIn)"]))
      .attr("fill", "steelblue");

    groups.append("text")
      .attr("class", "label-value")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", d => yScale(d["Count(SoldIn)"]) - 6)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#333")
      .text(d => d["Count(SoldIn)"]);

    groups.append("text")
      .attr("class", "label-brand")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", innerHeight + 18)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#666")
      .text(d => d["Brand_Reg"]);
  });
}