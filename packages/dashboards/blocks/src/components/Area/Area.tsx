import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { PureComponent } from 'react';
import CountUp from 'react-countup';
import uuid from 'uuid/v1';
import { format } from '../../utils';
import Comparator from './Comparator';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export default class SingleArea extends PureComponent<any> {
  private chart: am4charts.XYChart;
  private id: string;

  constructor(props) {
    super(props);
    this.id = uuid();
  }

  componentDidMount() {
    const {
      area,
      index,
      currentValue,
      comparatorData,
      namespace,
      color,
      data,
      timeFrameGrouping,
      previousData,
    } = this.props;
    console.log(data);

    if (!this.chart) {
      const chart = am4core.create(this.id, am4charts.XYChart);
      chart.paddingTop = 0;
      chart.paddingBottom = 0;
      chart.cursor = new am4charts.XYCursor();

      let categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
      categoryAxis.dataFields.date = 'key';
      categoryAxis.renderer.disabled = true;
      categoryAxis.renderer.grid.template.disabled = true;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = area.name;
      series.dataFields.dateX = 'key';
      series.fill = am4core.color(color);
      series.stroke = am4core.color(color);
      series.fillOpacity = 0.6;
      series.tensionX = 0.8;
      series.tensionY = 0.7;
      series.name = area.name;
      series.tooltipText = '{name}: [bold]{valueY}[/]';

      let comparator = chart.series.push(new am4charts.LineSeries());
      comparator.dataFields.valueY = area.name;
      comparator.dataFields.dateX = 'previousKey';
      comparator.fill = am4core.color(color);
      comparator.stroke = am4core.color(color);
      comparator.fillOpacity = 0.6;
      comparator.tensionX = 0.8;
      comparator.tensionY = 0.7;
      comparator.name = area.name;
      comparator.tooltipText = '{name}: [bold]{valueY}[/]';

      this.chart = chart;
    }

    this.chart.data = data;
  }

  componentDidUpdate() {
    const { data, previousData, area } = this.props;
    this.chart.data = data;
  }

  render() {
    const { area, index, currentValue, comparatorData, namespace } = this.props;
    return (
      <div className="list-group-item bg-transparent px-0 px-md-3">
        <div className="row align-items-center">
          <div className="col-sm-5 mb-3 mb-md-0">
            <h6 className="mb-1 text-muted font-weight-light">{area.label}</h6>
            <div className="row align-items-center text-nowrap">
              <div className="col-5">
                <h5 className="m-0">
                  <CountUp
                    start={0}
                    end={currentValue}
                    decimals={2}
                    formattingFn={value => format(value, area.formatter)}
                  />
                </h5>
              </div>
              <Comparator
                comparatorData={comparatorData[area.namespace || namespace]}
                currentValue={currentValue}
                area={area}
              />
            </div>
          </div>
          <div className="col-sm-7">
            <div style={{ width: '100%', height: '80px' }} id={this.id}></div>
          </div>
        </div>
      </div>
    );
  }
}
