//bar chart which shows the stars of the languages
import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "bar3d", //chart type
    width: "100%",
    height: "400",
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Forked",
        yAxisName: "Forks", //Y axis name in the chart
        xAxisName: "Repos", //X axis name in the chart
        xAxisNameFontSize: "16px", //X axis font
        yAxisNameFontSize: "16px", //Y axis font
      },
      data, 
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
