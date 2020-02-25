import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import React, { PureComponent } from 'react';
import { v1 as uuid } from 'uuid';
import { colors } from '../../../utils';
import Loader from '../../Loader';

am4core.options.commercialLicense = true;

const data01 = [
  {
    value: 100,
    name: '展现',
    fill: colors[0],
  },
  {
    value: 80,
    name: '点击',
    fill: colors[1],
  },
  {
    value: 50,
    name: '访问',
    fill: colors[2],
  },
  {
    value: 40,
    name: '咨询',
    fill: colors[3],
  },
  {
    value: 26,
    name: '订单',
    fill: colors[4],
  },
];

export default class PieBlock extends PureComponent<any> {
  private chart: am4charts.SlicedChart;
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

  componentDidUpdate() {
    const { rowData, loaded } = this.props;
    if (loaded) {
      if (!this.chart) {
        const chart = am4core.create(this.id, am4charts.SlicedChart);

        let series = chart.series.push(new am4charts.FunnelSeries());
        series.dataFields.value = 'value';
        series.dataFields.category = 'name';
        series.sliceLinks.template.height = 0;
        series.slices.template.slice.propertyFields.fill = 'fill';
        series.alignLabels = true;
        this.chart = chart;
      }

      this.chart.data = data01;
    }
  }

  render() {
    const { rowData, loaded } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    return <div id={this.id} style={{ width: '100%', height: '100%' }}></div>;
  }
}
