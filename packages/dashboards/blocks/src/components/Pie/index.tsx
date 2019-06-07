import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { colors } from '../../utils';

const data01 = [
  {
    name: 'Group A',
    value: 400,
  },
  {
    name: 'Group B',
    value: 300,
  },
  {
    name: 'Group C',
    value: 300,
  },
  {
    name: 'Group D',
    value: 200,
  },
  {
    name: 'Group E',
    value: 278,
  },
  {
    name: 'Group F',
    value: 189,
  },
];
const data02 = [
  {
    name: 'Group A',
    value: 2400,
  },
  {
    name: 'Group B',
    value: 4567,
  },
  {
    name: 'Group C',
    value: 1398,
  },
  {
    name: 'Group D',
    value: 9800,
  },
  {
    name: 'Group E',
    value: 3908,
  },
  {
    name: 'Group F',
    value: 4800,
  },
];

export default class PieBlock extends PureComponent<any> {
  render() {
    const { rowData, loaded } = this.props;
    const { data, timeline } = rowData;

    if (!loaded) {
      return <Spinner />;
    }

    return (
      <div className="card h-100">
        <div className="card-header">Graph title</div>
        <div className="card-body">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                // cx="120"
                // cy="200"
                outerRadius={60}
                fill={colors[0]}
              />
              <Pie
                data={data02}
                dataKey="value"
                innerRadius={70}
                outerRadius={90}
                fill={colors[1]}
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
