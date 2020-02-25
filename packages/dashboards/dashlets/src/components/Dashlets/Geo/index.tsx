import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import { v1 as uuid } from 'uuid';
import { manipulator, resolve } from '../../../utils';
import Loader from '../../Loader';

am4core.options.commercialLicense = true;

const data01 = [
  ['Country', 'Popularity'],
  ['Germany', 200],
  ['United States', 300],
  ['Brazil', 400],
  ['Canada', 500],
  ['France', 600],

  ['RU', 700],
];

export default class GeoBlock extends PureComponent<any> {
  private chart: am4maps.MapChart;
  private id: string;

  constructor(props) {
    super(props);
    this.id = uuid();
  }

  manipulate = data => {
    const { groupBy, sortBy: sorter, rollup: rollupper, limit } = this.props;
    let manipulated = data;
    manipulated = rollup(
      data,
      c => manipulator(c, rollupper),
      c => (groupBy ? resolve(groupBy, c) : c.id),
    );

    manipulated = Array.from(manipulated);
    return manipulated;
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  componentDidUpdate() {
    const { rowData, loaded, limit, formatter, label, namespace } = this.props;
    if (loaded) {
      if (!this.chart) {
        const chart = am4core.create(this.id, am4maps.MapChart);
        chart.geodata = am4geodata_worldLow;
        // Set projection
        chart.projection = new am4maps.projections.Mercator();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ['AQ'];
        this.chart = chart;
      }
    }
  }

  render() {
    const { rowData, loaded, limit, formatter, label, namespace } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    const manipulated = this.manipulate(rowData[namespace]);

    return <div id={this.id} style={{ width: '100%', height: '100%' }}></div>;
  }
}
