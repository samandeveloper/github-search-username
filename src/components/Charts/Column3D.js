//column chart
import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "column3d", //chart type
    width: "100%",
    height: "400",
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Popular",
        yAxisName: "Stars", //Y axis name in the chart
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
