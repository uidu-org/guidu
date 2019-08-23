import { rollup } from 'd3-array';
import moment from 'moment';
import React, { PureComponent } from 'react';
import CountUp from 'react-countup';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { colors, format, manipulator } from '../../utils';
import Loader from '../Loader';
import Comparator from './Comparator';
import AreaTooltip from './Tooltip';

export default class AreasBlock extends PureComponent<any> {
  static defaultProps = {
    groupBy: null,
    sortBy: 'createdAt',
    limit: 5,
  };

  manipulate = (data, { range }) => {
    const { areas, timeFrameGrouping } = this.props;
    let manipulated = data;
    const listWithKeys = [
      ...range.map(l => ({
        fake: true,
        createdAt: moment(l)
          .startOf(timeFrameGrouping)
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
          .startOf(timeFrameGrouping)
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
    const {
      rowData,
      range,
      comparatorData,
      comparatorRange,
      loaded,
      areas,
      timeFrameGrouping,
      namespace,
    } = this.props;

    if (!loaded) {
      return <Loader className="border-0 bg-light shadow-none" />;
    }

    console.log(this.props);

    return (
      <div className="card h-100 border-0 shadow-none bg-transparent">
        <div className="flex-grow-1 justify-content-center flex-column d-flex">
          <div className="list-group list-group-flush">
            {areas.map((area, index) => {
              const currentValue = manipulator(
                rowData[area.namespace || namespace],
                area.rollup,
              );
              const manipulated = this.manipulate(
                rowData[area.namespace || namespace],
                { range },
              );
              let data = manipulated;
              if (comparatorData[area.namespace || namespace]) {
                const manipulatedPrevious = this.manipulate(
                  comparatorData[area.namespace || namespace],
                  {
                    range: comparatorRange,
                  },
                );
                data = manipulated.reduce((acc, item, index) => {
                  acc.push({
                    ...item,
                    previousKey: manipulatedPrevious[index].key,
                    previousValue: manipulatedPrevious[index].value,
                  });
                  return acc;
                }, []);
              }
              return (
                <div
                  className="list-group-item bg-transparent px-0 px-md-3"
                  key={index}
                >
                  <div className="row align-items-center">
                    <div className="col-sm-5 mb-3 mb-md-0">
                      <h6 className="mb-1 text-muted font-weight-light">
                        {area.label}
                      </h6>
                      <div className="row align-items-center text-nowrap">
                        <div className="col-5">
                          <h5 className="m-0">
                            <CountUp
                              start={0}
                              end={currentValue}
                              decimals={2}
                              formattingFn={value =>
                                format(value, area.formatter)
                              }
                            />
                          </h5>
                        </div>
                        <Comparator
                          comparatorData={
                            comparatorData[area.namespace || namespace]
                          }
                          currentValue={currentValue}
                          area={area}
                        />
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <div style={{ width: '100%', height: '80px' }}>
                        <ResponsiveContainer>
                          <AreaChart data={data} syncId="anyId">
                            <Tooltip
                              content={
                                <AreaTooltip
                                  primary="value"
                                  formatValue={value =>
                                    format(value, area.formatter)
                                  }
                                  timeframeGrouping={timeFrameGrouping}
                                />
                              }
                            />
                            <XAxis dataKey="key" hide />
                            {comparatorData[area.namespace || namespace] && (
                              <Area
                                type="monotone"
                                dataKey={`previousValue.${area.name}`}
                                stroke="#f3f3f3"
                                fill="#f3f3f3"
                              />
                            )}
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
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
