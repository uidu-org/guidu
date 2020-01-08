import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { rollup } from 'd3-array';
import moment from 'moment';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v1';
import { format, manipulator } from '../../utils';
import Header from './Header';
import { labelByTimeframeGroup } from './Tooltip';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export default class SingleArea extends PureComponent<any> {
  private chart: am4charts.XYChart;
  private id: string;

  constructor(props) {
    super(props);
    this.id = uuid();
  }

  manipulate = (data, { range }) => {
    const { timeFrameGrouping, rollup: rollupper, formatter } = this.props;
    // let manipulated = data;
    const listWithKeys = [
      ...range.map(l => ({
        fake: true,
        createdAt: moment(l)
          .startOf(timeFrameGrouping)
          .format(),
      })),
      ...data,
    ];

    const manipulated = rollup(
      listWithKeys,
      c => {
        return manipulator(c, rollupper);
      },
      c =>
        moment(c.createdAt)
          .startOf(timeFrameGrouping)
          .format(),
    );
    console.log(manipulated);

    return Array.from(manipulated, ([key, value]) => ({
      key,
      value,
    }));
  };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart = () => {
    const {
      rowData,
      loaded,
      comparatorData,
      comparatorRange,
      namespace,
      range,
    } = this.props;
    // const { showPrevious } = this.state;

    if (loaded) {
      const manipulated = this.manipulate(rowData[namespace], {
        range,
      });
      let data = manipulated;
      if (comparatorData[namespace]) {
        const manipulatedPrevious = this.manipulate(comparatorData[namespace], {
          range: comparatorRange,
        });
        data = manipulated.reduce((acc, item, index) => {
          acc.push({
            ...item,
            previousKey: manipulatedPrevious[index].key,
            previousValue: manipulatedPrevious[index].value,
          });
          return acc;
        }, []);
      }

      this.getChart().data = data;
    }
  };

  getChart = () => {
    const { formatter, rowData, name, timeFrameGrouping, color } = this.props;
    console.log(rowData);

    if (!this.chart) {
      const chart = am4core.create(this.id, am4charts.XYChart);
      // chart.paddingTop = 0;
      chart.paddingBottom = 0;
      // chart.paddingLeft = 0;
      // chart.paddingRight = 0;
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true;
      chart.cursor.lineX.disabled = true;
      chart.cursor.behavior = 'none';

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dataFields.date = 'key';
      dateAxis.renderer.disabled = true;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.cursorTooltipEnabled = false;

      let comparatorDateAxis = chart.xAxes.push(new am4charts.DateAxis());
      comparatorDateAxis.renderer.opposite = true;
      comparatorDateAxis.dataFields.date = 'previousKey';
      comparatorDateAxis.renderer.disabled = true;
      comparatorDateAxis.renderer.grid.template.disabled = true;
      comparatorDateAxis.cursorTooltipEnabled = false;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.min = 0;

      let comparator = chart.series.push(new am4charts.LineSeries());
      comparator.dataFields.valueY = 'previousValue';
      comparator.dataFields.dateX = 'previousKey';
      comparator.strokeWidth = 2;
      comparator.fill = am4core.color('#f3f3f3');
      comparator.stroke = am4core.color('#f3f3f3');
      comparator.fillOpacity = 0.6;
      comparator.tensionX = 0.8;
      comparator.name = name;
      comparator.xAxis = comparatorDateAxis;
      comparator.tooltipText = '{name}: [bold]{valueY}[/]';

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = 'value';
      series.dataFields.dateX = 'key';
      series.fill = am4core.color(color);
      series.stroke = am4core.color(color);
      series.strokeWidth = 2;
      series.fillOpacity = 0.6;
      series.tensionX = 0.8;
      // series.tensionY = 0.8;
      series.name = name;
      series.tooltipText = `{dateX}\n[bold]{valueY}[/]`;

      this.chart = chart;
    }

    this.chart.series.getIndex(0).adapter.remove('tooltipText');
    this.chart.series
      .getIndex(0)
      .adapter.add('tooltipText', (text, target, key) => {
        let data: any = target.tooltipDataItem.dataContext;
        return `[bold]${labelByTimeframeGroup(
          data.key,
          timeFrameGrouping,
        )}[/]\n${format(data.value, formatter)}`;
      });
    return this.chart;
  };

  render() {
    const {
      label,
      formatter,
      comparatorData,
      namespace,
      rollup,
      rowData,
    } = this.props;

    return (
      <div className="card h-100">
        <Header
          label={label}
          rowData={rowData}
          comparatorData={comparatorData}
          namespace={namespace}
          rollup={rollup}
          formatter={formatter}
        />

        <div
          style={{ width: '100%', height: `calc(100% - 7px)` }}
          id={this.id}
        />
      </div>
    );
  }
}
