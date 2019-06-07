import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';
import { colors, manipulator, resolve } from '../../utils';
import Loader from '../Loader';

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

  render() {
    const { rowData, loaded, limit, formatter, label } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    const manipulated = this.manipulate(rowData);

    return (
      <div className="card h-100">
        <div className="card-header">Map</div>
        <div className="card-body">
          <Chart
            options={{
              fontName: 'Avenir',
              colorAxis: { colors: [colors[0], colors[colors.length / 2 - 1]] },
            }}
            chartEvents={[
              {
                eventName: 'select',
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = rowData[selection[0].row + 1];
                  console.log('Selected : ' + region);
                },
              },
            ]}
            chartType="GeoChart"
            width="100%"
            height="100%"
            data={data01}
          />
        </div>
      </div>
    );
  }
}
