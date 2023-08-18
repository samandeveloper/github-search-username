//pie chart

import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"; // Include fusion theme
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "Pie3d", //chart type
    width: "100%", //the pie chart image become in the middle of it's border
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Languages",
        theme: "fusion",
        decimal: 0,
        pieRadius: "45%",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
