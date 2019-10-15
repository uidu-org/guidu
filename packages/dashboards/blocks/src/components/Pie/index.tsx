import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { colors, manipulator, resolve } from '../../utils';
import Loader from '../Loader';
import Switch from '../Switch';

export default class PieBlock extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      showPrevious: false,
    };
  }

  manipulate = data => {
    const { groupBy, rollup: rollupper } = this.props;
    let manipulated = rollup(
      data,
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
    const {
      rowData,
      loaded,
      label,
      comparatorData,
      timeRange,
      namespace,
    } = this.props;

    const { showPrevious } = this.state;

    if (!loaded) {
      return <Loader />;
    }

    const manipulated = this.manipulate(
      comparatorData && showPrevious
        ? comparatorData[namespace]
        : rowData[namespace],
    );

    return (
      <div className="card h-100">
        <div className="card-header d-flex align-items-center">
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
        </div>
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
                {manipulated.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[colors.length - 5 - index + 1]}
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
