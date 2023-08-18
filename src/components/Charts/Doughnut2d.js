//doughnut chart
import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy"; //change .fusion to .candy theme
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d", //chart type
    width: "100%", //doughnut chart image become in the middle of it's border
    height: "400", // Height of the chart
    dataFormat: "json", //Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Stars Per Language",
        theme: "candy",
        decimal: 0,
        doughnutRadius: "45%",
        showPercentValues: 0, //we want to see the values on label when we hover over the languages
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
