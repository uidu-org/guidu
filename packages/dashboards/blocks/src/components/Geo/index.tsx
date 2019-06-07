import * as React from 'react';
import { Chart } from 'react-google-charts';

const data = [
  ['Country', 'Popularity'],
  ['Germany', 200],
  ['United States', 300],
  ['Brazil', 400],
  ['Canada', 500],
  ['France', 600],
  ['RU', 700],
];

export default class GeoBlock extends React.Component {
  render() {
    return (
      <div className="card h-100">
        <div className="card-header">Map</div>
        <div className="card-body">
          <Chart
            options={{
              fontName: 'Avenir',
            }}
            chartEvents={[
              {
                eventName: 'select',
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = data[selection[0].row + 1];
                  console.log('Selected : ' + region);
                },
              },
            ]}
            chartType="GeoChart"
            width="100%"
            height="100%"
            data={data}
          />
        </div>
      </div>
    );
  }
}
