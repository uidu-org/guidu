import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { PureComponent } from 'react';
import { v1 as uuid } from 'uuid';
import Loader from '../../Loader';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export default class PieBlock extends PureComponent<any, any> {
  private chart: am4charts.PieChart;
  private id: string;

  constructor(props) {
    super(props);
    this.id = uuid();
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  drawChart = () => {
    const { resultSet } = this.props;
    if (resultSet) {
      this.getChart().data = resultSet.chartPivot();
    }
  };

  getChart = () => {
    const { resultSet } = this.props;

    if (!this.chart) {
      const chart = am4core.create(this.id, am4charts.PieChart);
      chart.innerRadius = am4core.percent(40);
      chart.legend = new am4charts.Legend();
      chart.legend.position = 'right';

      resultSet.series().map((line) => {
        const pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = line.key;
        pieSeries.dataFields.category = 'category';
        pieSeries.slices.template.propertyFields.fill = 'color';
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
      });

      this.chart = chart;
    }
    return this.chart;
  };

  render() {
    const { resultSet } = this.props;

    if (!resultSet) {
      return <Loader />;
    }

    return (
      <>
        {/* <div className="card-header d-flex align-items-center">
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
        </div> */}
        <div className="card-body">
          <div id={this.id} style={{ width: '100%', height: '100%' }}></div>
        </div>
      </>
    );
  }
}
