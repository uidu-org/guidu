import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';
import { colors } from '../../utils';

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
            <RadialBarChart
              // width={500}
              // height={300}
              // cx={150}
              // cy={150}
              innerRadius={20}
              outerRadius={140}
              barSize={10}
              data={data01}
            >
              <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="uv"
              />
              <Legend
                iconSize={10}
                width={120}
                height={140}
                layout="vertical"
                verticalAlign="middle"
                // wrapperStyle={style}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
