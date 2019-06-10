import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { colors, manipulator, resolve } from '../../utils';
import Loader from '../Loader';

export default class PieBlock extends PureComponent<any> {
  manipulate = () => {
    const { rowData, groupBy, rollup: rollupper } = this.props;
    let manipulated = rollup(
      rowData,
      c => manipulator(c, rollupper),
      c => (groupBy ? resolve(groupBy, c) : c.id),
    );
    manipulated = Array.from(manipulated, ([key, value]) => ({
      key: key,
      value,
    })).sort((a, b) => b.value - a.value);

    return manipulated;
  };
  render() {
    const { rowData, loaded, label } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    const manipulated = this.manipulate();

    return (
      <div className="card h-100">
        <div className="card-header">{label}</div>
        <div className="card-body">
          <ResponsiveContainer>
            <PieChart>
              <Legend
                layout="vertical"
                verticalAlign="middle"
                iconType="circle"
                align="right"
              />
              <Pie
                data={manipulated}
                dataKey="value"
                nameKey="key"
                innerRadius={70}
                fill={colors[0]}
                label
              >
                {manipulated.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors.reverse()[index + 4]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
