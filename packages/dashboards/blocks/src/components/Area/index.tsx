import { rollup } from 'd3-array';
import moment from 'moment';
import React, { PureComponent } from 'react';
import AnimatedNumber from 'react-animated-number';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { colors, format, manipulator } from '../../utils';
import Loader from '../Loader';
import AreaTooltip from './Tooltip';

export default class AreasBlock extends PureComponent<any> {
  static defaultProps = {
    groupBy: null,
    sortBy: 'createdAt',
    limit: 5,
  };

  manipulate = data => {
    const { range, areas } = this.props;
    let manipulated = data;
    const listWithKeys = [
      ...range.map(l => ({
        fake: true,
        createdAt: moment(l)
          .startOf('week')
          .format(),
      })),
      ...data,
    ];

    manipulated = rollup(
      listWithKeys,
      c =>
        areas.reduce((acc, area) => {
          acc[`${area.name}`] = manipulator(c, area.rollup);
          return acc;
        }, {}),
      c =>
        moment(c.createdAt)
          .startOf('week')
          .format(),
    );

    return Array.from(manipulated, ([key, value]) => ({
      key,
      value,
    })).sort(
      (a, b) =>
        (moment(a.key).toDate() as any) - (moment(b.key).toDate() as any),
    );
  };

  render() {
    const { rowData, loaded, areas } = this.props;
    if (!loaded) {
      return <Loader className="border-0 bg-light" />;
    }

    const manipulated = this.manipulate(rowData);

    return (
      <div className="card h-100 border-0">
        <div className="flex-grow-1 justify-content-center flex-column d-flex">
          <div className="list-group list-group-flush">
            {areas.map((area, index) => (
              <div className="list-group-item" key={area.label}>
                <div className="row align-items-end">
                  <div className="col-sm-3">
                    <h6 className="mb-1 text-muted">{area.label}</h6>
                    <h4 className="my-0">
                      <AnimatedNumber
                        value={manipulator(rowData, area.rollup)}
                        style={{
                          transition: '0.8s ease-out',
                          transitionProperty:
                            'background-color, color, opacity',
                        }}
                        formatValue={value => format(value, area.formatter)}
                      />
                    </h4>
                  </div>
                  <div className="col-sm-9">
                    <div style={{ width: '100%', height: '64px' }}>
                      <ResponsiveContainer>
                        <AreaChart data={manipulated} syncId="anyId">
                          <Tooltip
                            content={
                              <AreaTooltip
                                dataKey={`value.${area.name}`}
                                formatValue={value =>
                                  format(value, area.formatter)
                                }
                                timeframeGrouping="week"
                              />
                            }
                          />
                          <XAxis dataKey="key" hide />
                          <Area
                            type="monotone"
                            dataKey={`value.${area.name}`}
                            stroke={colors[index]}
                            fill={colors[index]}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
