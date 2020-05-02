import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import am4themes_patterns from '@amcharts/amcharts4/themes/patterns';
import React, { PureComponent } from 'react';
import { v1 as uuid } from 'uuid';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_patterns);
am4core.useTheme(am4themes_material);
am4core.options.commercialLicense = true;

export default class SingleArea extends PureComponent<any> {
  private chart: am4charts.XYChart;
  private id: string;

  constructor(props) {
    super(props);
    this.id = uuid();
  }

  // manipulate = (data, { range }) => {
  //   const { timeFrameGrouping, rollup: rollupper, formatter } = this.props;
  //   // let manipulated = data;
  //   const listWithKeys = [
  //     ...range.map((l) => ({
  //       fake: true,
  //       createdAt: moment(l).startOf(timeFrameGrouping).format(),
  //     })),
  //     ...data,
  //   ];

  //   const manipulated = rollup(
  //     listWithKeys,
  //     (c) => {
  //       return manipulator(c, rollupper);
  //     },
  //     (c) => moment(c.createdAt).startOf(timeFrameGrouping).format(),
  //   );

  //   return Array.from(manipulated, ([key, value]) => ({
  //     key,
  //     value,
  //   }));
  // };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    console.log(this.props);
    this.drawChart();
  }

  componentWillUnmount() {
    console.log('unmount?');
    if (this.chart) {
      this.chart.dispose();
    }
  }

  drawChart = () => {
    const { resultSet } = this.props;
    // const { showPrevious } = this.state;

    if (resultSet) {
      // if (comparatorData[namespace]) {
      //   const manipulatedPrevious = this.manipulate(comparatorData[namespace], {
      //     range: comparatorRange,
      //   });
      //   data = manipulated.reduce((acc, item, index) => {
      //     acc.push({
      //       ...item,
      //       previousKey: manipulatedPrevious[index].key,
      //       previousValue: manipulatedPrevious[index].value,
      //     });
      //     return acc;
      //   }, []);
      // }

      this.getChart().data = resultSet.chartPivot();
    }
  };

  getChart = () => {
    const { name, color, resultSet } = this.props;

    if (!this.chart) {
      const chart = am4core.create(this.id, am4charts.XYChart);
      chart.paddingBottom = 24;
      chart.paddingLeft = 24;
      chart.paddingRight = 24;
      chart.paddingTop = 32;
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true;
      chart.cursor.lineX.disabled = true;
      // chart.cursor.behavior = 'none';

      const legend = (chart.legend = new am4charts.Legend());
      legend.labels.template.fillOpacity = 0.3;
      legend.labels.template.fontSize = 14;

      chart.numberFormatter.numberFormat = '#a';

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dataFields.date = 'category';
      // dateAxis.renderer.disabled = true;
      // dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.grid.template.strokeOpacity = 0.04;
      dateAxis.renderer.fillOpacity = 0.3;
      dateAxis.cursorTooltipEnabled = false;
      dateAxis.renderer.fontSize = 14;

      // let comparatorDateAxis = chart.xAxes.push(new am4charts.DateAxis());
      // comparatorDateAxis.renderer.opposite = true;
      // comparatorDateAxis.dataFields.date = 'previousKey';
      // comparatorDateAxis.renderer.disabled = true;
      // comparatorDateAxis.renderer.grid.template.disabled = true;
      // comparatorDateAxis.cursorTooltipEnabled = false;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.renderer.disabled = true;
      // valueAxis.renderer.grid.template.disabled = true;
      // valueAxis.renderer.baseGrid.disabled = true;
      // valueAxis.renderer.opposite = true;
      // valueAxis.renderer.grid.template.stroke = am4core.color('#ccc');
      valueAxis.renderer.grid.template.strokeOpacity = 0.04;
      valueAxis.renderer.fillOpacity = 0.3;
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.min = 0;
      valueAxis.renderer.fontSize = 14;

      // let comparator = chart.series.push(new am4charts.LineSeries());
      // comparator.dataFields.valueY = 'previousValue';
      // comparator.dataFields.dateX = 'previousKey';
      // comparator.strokeWidth = 2;
      // comparator.fill = am4core.color('#f3f3f3');
      // comparator.stroke = am4core.color('#f3f3f3');
      // // comparator.fillOpacity = 0.6;
      // comparator.tensionX = 0.8;
      // comparator.name = name;
      // comparator.xAxis = comparatorDateAxis;
      // comparator.tooltipText = '{name}: [bold]{valueY}[/]';

      resultSet.series().map((line) => {
        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = line.key;
        series.dataFields.dateX = 'category';
        // series.fill = am4core.color(color);
        // series.stroke = am4core.color(color);
        series.strokeWidth = 1;
        series.fillOpacity = 0.6;
        series.tensionX = 0.8;
        // series.columns.template.column.cornerRadius(4, 4, 0, 0);
        series.name = line.title;
        series.tooltipText = `{dateX}\n[bold]{valueY}[/]`;
      });

      this.chart = chart;
    }

    // this.chart.series.getIndex(0).adapter.remove('tooltipText');
    // this.chart.series
    //   .getIndex(0)
    //   .adapter.add('tooltipText', (text, target, key) => {
    //     let data: any = target.tooltipDataItem.dataContext;
    //     return `[bold]${labelByTimeframeGroup(
    //       data.key,
    //       timeFrameGrouping,
    //     )}[/]\n${format(data.value, formatter)}`;
    //   });
    return this.chart;
  };

  render() {
    return <div style={{ width: '100%', height: '100%' }} id={this.id} />;
  }
}
