import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v1';
import { colors, manipulator, resolve } from '../../../utils';
import Loader from '../../Loader';
import Switch from '../../Switch';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export default class PieBlock extends PureComponent<any, any> {
  private chart: am4charts.PieChart;
  private id: string;

  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = {
      showPrevious: false,
    };
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart = () => {
    const { rowData, loaded, comparatorData, namespace } = this.props;
    const { showPrevious } = this.state;

    if (loaded) {
      const manipulated = this.manipulate(
        comparatorData && showPrevious
          ? comparatorData[namespace]
          : rowData[namespace],
      );
      this.getChart().data = manipulated;
    }
  };

  getChart = () => {
    if (!this.chart) {
      const chart = am4core.create(this.id, am4charts.PieChart);
      chart.innerRadius = am4core.percent(40);
      chart.legend = new am4charts.Legend();
      chart.legend.position = 'right';

      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'value';
      pieSeries.dataFields.category = 'key';
      pieSeries.slices.template.propertyFields.fill = 'color';
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      this.chart = chart;
    }
    return this.chart;
  };

  manipulate = data => {
    const { groupBy, rollup: rollupper } = this.props;
    let manipulated = rollup(
      data,
      c => manipulator(c, rollupper),
      c => (groupBy ? resolve(groupBy, c) : c.id),
    );
    manipulated = Array.from(manipulated, ([key, value], index) => ({
      key: key,
      value,
      color: colors[index],
    })).sort((a, b) => b.value - a.value);

    return manipulated;
  };

  render() {
    const { loaded, label, comparatorData, timeRange, namespace } = this.props;

    const { showPrevious } = this.state;

    if (!loaded) {
      return <Loader />;
    }

    return (
      <div className="card h-100">
        <div className="card-header d-flex align-items-center">
          <span className="text-truncate">{label}</span>
          <Switch
            isPrevious={showPrevious}
            comparatorData={comparatorData[namespace]}
            onChange={e =>
              this.setState(prevState => ({
                showPrevious: !prevState.showPrevious,
              }))
            }
            range={
              comparatorData && showPrevious
                ? timeRange.previousRange
                : timeRange.range
            }
          />
        </div>
        <div className="card-body">
          <div id={this.id} style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>
    );
  }
}
