import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import {
  Cell,
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';
import { colors, manipulator } from '../../utils';
import Loader from '../Loader';

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

  render() {
    const { rowData, loaded, namespace } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    const manipulated = this.manipulate(rowData[namespace]);

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
              startAngle={180}
              endAngle={0}
              innerRadius={20}
              outerRadius={140}
              barSize={10}
              data={manipulated}
            >
              <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="value"
              >
                {manipulated.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </RadialBar>
              <Legend
                iconSize={10}
                width={120}
                height={140}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
