# Exercise 0.2 & 0.3 — Appliance Energy Website

## About this website
This website explores the energy consumption of household appliances, 
with Exercise 3 focusing specifically on TV energy consumption data, 
helping consumers compare energy efficiency across brands before purchase.

## Data Story

### About the data

*Data source:*
The dataset used is the Australian Government's Equipment Energy 
Efficiency (E3) Register, containing labelled energy consumption data 
for televisions, including brand, screen size (cm), and labelled 
energy consumption (kWh/year).

*Data processing:*
- Converted screen size from centimetres to inches for consumer readability
- Calculated energy use per inch (kWh/inch/year) to enable fair comparison 
  across different screen sizes
- Grouped TVs into three size categories: Small (<40in), Medium (40-55in), 
  Large (>55in)
- Aggregated data by brand and size group, calculating mean, min, and max 
  energy use per inch
- Filtered out brand/size-group combinations with fewer than 10 records 
  to ensure statistical reliability
- Estimated annual electricity cost assuming a 55-inch TV, using Malaysia's 
  Tenaga Nasional Berhad (TNB) base energy charge of RM0.2703/kWh 
  (domestic tariff, ≤1,500 kWh/month tier)

*Privacy:*
This dataset contains only product-level energy efficiency data (brand, 
model, screen size, energy consumption). It does not contain any personal 
or identifiable information.

*Accuracy and limitations:*
- The annual cost estimate is based on a fixed assumed screen size (55in) 
  and only accounts for the base energy charge, excluding capacity charge, 
  network charge, and fuel adjustment costs. Actual electricity bills will 
  vary.
- Some brands were excluded from the final visualisation due to insufficient 
  sample size (fewer than 10 records), which may not fully represent all 
  brands available in the Malaysian market.
- Energy labels reflect standardised test conditions and may not perfectly 
  reflect real-world usage patterns.

*Ethics:*
Brands with very small sample sizes were filtered out to avoid misleading 
comparisons based on limited data. The visualisation aims to present an 
objective, data-driven comparison rather than favouring or disadvantaging 
any specific brand.

### AI Declaration
Generative AI (Claude) was used to help draft an initial template/structure 
for parts of this website and to assist in planning the data processing 
workflow (e.g. structuring the KNIME pipeline for grouping and aggregating 
energy data). All AI-generated content was reviewed and modified by me to 
fit the specific dataset, requirements, and design choices for this exercise.