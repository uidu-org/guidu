import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v1';
import { colors, manipulator } from '../../utils';
import Loader from '../Loader';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

const data01 = [
  {
    name: '18-24',
    uv: 31.47,
    pv: 2400,
    fill: colors[0],
  },
  {
    name: '25-29',
    uv: 26.69,
    pv: 4567,
    fill: colors[1],
  },
  {
    name: '30-34',
    uv: 15.69,
    pv: 1398,
    fill: colors[2],
  },
  {
    name: '35-39',
    uv: 8.22,
    pv: 9800,
    fill: colors[3],
  },
  {
    name: '40-49',
    uv: 8.63,
    pv: 3908,
    fill: colors[4],
  },
  {
    name: '50+',
    uv: 2.63,
    pv: 4800,
    fill: colors[5],
  },
  {
    name: 'unknow',
    uv: 6.67,
    pv: 4800,
    fill: colors[6],
  },
];

export default class RadialBlock extends PureComponent<any> {
  private chart: am4charts.PieChart;
  private id: string;

  constructor(props) {
    super(props);

    this.id = uuid();
  }

  inBin = amount => {
    const { bins } = this.props;
    const foo = bins.map((bin, index) => {
      if (amount >= bin[0] && amount <= bin[1]) {
        return true;
      }
      return false;
    });
    return foo.indexOf(true);
  };

  manipulate = data => {
    const { bins, groupBy, rollup: rollupper } = this.props;
    let manipulated = rollup(
      data,
      c => manipulator(c, rollupper),
      c => this.inBin(c.amount),
    );

    return Array.from(manipulated, ([key, value]) => ({
      key,
      value,
    }));
  };

  componentDidUpdate() {
    const { rowData, loaded, comparatorData, namespace } = this.props;
    //  const { showPrevious } = this.state;
    console.log(this.id);

    if (loaded) {
      if (!this.chart) {
        const chart = am4core.create(this.id, am4charts.PieChart);
        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;
        chart.legend = new am4charts.Legend();
        chart.legend.position = 'bottom';
        const pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = 'pv';
        pieSeries.dataFields.category = 'name';
        pieSeries.slices.template.propertyFields.fill = 'fill';
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        this.chart = chart;
      }

      //  const manipulated = this.manipulate(
      //    comparatorData && showPrevious
      //      ? comparatorData[namespace]
      //      : rowData[namespace],
      //  );
      this.chart.data = data01;
    }
  }

  render() {
    const { rowData, loaded, namespace } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    return (
      <div className="card h-100">
        <div className="card-header">Graph title</div>
        <div id={this.id} style={{ width: '100%', height: '100%' }}></div>
      </div>
    );
  }
}
