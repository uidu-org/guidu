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

export default class TreemapBlock extends PureComponent<any, any> {
  private chart: am4charts.TreeMap;
  private id: string;

  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = {
      showPrevious: false,
    };
  }

  manipulate = data => {
    const { groupBy, rollup: rollupper } = this.props;
    let manipulated = data;
    manipulated = rollup(
      data,
      c => manipulator(c, rollupper),
      c => (groupBy ? resolve(groupBy, c) : c.id),
    );

    manipulated = Array.from(manipulated).reduce(
      (arr: Array<any>, item, index) => {
        arr.push({
          name: item[0],
          value: item[1],
          color: colors[index],
        });
        return arr;
      },
      [],
    );
    return manipulated;
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
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
      const chart = am4core.create(this.id, am4charts.TreeMap);
      let level1 = chart.seriesTemplates.create('0');
      let level1_column = level1.columns.template;
      level1_column.column.cornerRadius(10, 10, 10, 10);
      level1_column.fillOpacity = 0.8;
      level1_column.stroke = am4core.color('#fff');
      level1_column.strokeWidth = 5;
      level1_column.strokeOpacity = 1;

      let level1_bullet = level1.bullets.push(new am4charts.LabelBullet());
      level1_bullet.locationY = 0.5;
      level1_bullet.locationX = 0.5;
      level1_bullet.label.text = '{name}';
      level1_bullet.label.fill = am4core.color('#fff');

      chart.dataFields.value = 'value';
      chart.dataFields.name = 'name';
      chart.dataFields.color = 'color';

      this.chart = chart;
    }
    return this.chart;
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
        <div id={this.id} style={{ width: '100%', height: '100%' }} />
      </div>
    );
  }
}
