import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v1';
import { manipulator, resolve } from '../../utils';
import Loader from '../Loader';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export default class BarBlock extends PureComponent<any> {
  private chart: am4charts.XYChart;
  private id: string;

  constructor(props) {
    super(props);
    this.id = uuid();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  manipulate = data => {
    const { bars, groupBy } = this.props;
    let manipulated = rollup(
      data,
      c =>
        bars.reduce((acc, area) => {
          acc[`${area.name}`] = manipulator(c, area.rollup);
          return acc;
        }, {}),
      c => (groupBy ? resolve(groupBy, c) : c.id),
    );

    manipulated = Array.from(manipulated, ([key, value]) => {
      return {
        key,
        ...value,
      };
    });
    return manipulated;
  };

  componentDidUpdate() {
    const {
      rowData,
      loaded,
      bars,
      range,
      timeFrameGrouping,
      namespace,
    } = this.props;

    if (loaded) {
      if (!this.chart) {
        const chart = am4core.create(this.id, am4charts.XYChart);
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'key';
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'donationsAmount';
        series.dataFields.categoryX = 'key';
        this.chart = chart;
      }

      const manipulated = this.manipulate(rowData[namespace]);
      this.chart.data = manipulated;
    }
  }

  render() {
    const {
      rowData,
      loaded,
      bars,
      range,
      timeFrameGrouping,
      namespace,
    } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    return (
      <div className="card h-100">
        <div className="card-header">Graph title</div>
        <div className="card-body">
          <div id={this.id} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    );
  }
}
