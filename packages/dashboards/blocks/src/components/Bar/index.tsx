import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { colors, manipulator, resolve } from '../../utils';
import Loader from '../Loader';

export default class BarBlock extends PureComponent<any> {
  manipulate = () => {
    const { rowData, bars, groupBy } = this.props;
    let manipulated = rollup(
      rowData,
      c =>
        bars.reduce((acc, area) => {
          acc[`${area.name}`] = manipulator(c, area.rollup);
          return acc;
        }, {}),
      c => (groupBy ? resolve(groupBy, c) : c.id),
    );

    manipulated = Array.from(manipulated, ([key, value]) => ({
      key,
      value,
    }));
    return manipulated;
  };

  render() {
    const { rowData, loaded, bars, range, timeFrameGrouping } = this.props;
    if (!loaded) {
      return <Loader />;
    }

    const manipulated = this.manipulate();

    return (
      <div className="card h-100">
        <div className="card-header">Graph title</div>
        <div className="card-body">
          <ResponsiveContainer>
            <BarChart
              // width={500}
              // height={300}
              data={manipulated}
              // margin={{
              //   top: 5,
              //   right: 30,
              //   left: 20,
              //   bottom: 5,
              // }}
            >
              <XAxis dataKey="key" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              {bars.map((bar, index) => (
                <Bar
                  key={index}
                  dataKey={`value.${bar.name}`}
                  fill={colors[index]}
                  yAxisId={bar.xAxisId || 'left'}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
