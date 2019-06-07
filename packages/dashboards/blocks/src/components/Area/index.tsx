import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import AnimatedNumber from 'react-animated-number';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { colors } from '../../utils';

export default class AreaBlock extends PureComponent<any> {
  render() {
    const { rowData, loaded } = this.props;
    const { data, timeline } = rowData;

    if (!loaded) {
      return <Spinner />;
    }

    return (
      <div className="card h-100">
        <div className="card-header">Trend</div>
        <div className="card-body">
          <div className="row align-items-end my-4">
            <div className="col-sm-4">
              <h6 className="mb-1 text-muted">Contatti</h6>
              <h4 className="my-0">
                <AnimatedNumber
                  value={data.length}
                  style={{
                    transition: '0.8s ease-out',
                    transitionProperty: 'background-color, color, opacity',
                  }}
                  formatValue={value => value.toFixed(0)}
                />
              </h4>
            </div>
            <div className="col-sm-8">
              <div style={{ width: '100%', height: '64px' }}>
                <ResponsiveContainer>
                  <AreaChart data={timeline} syncId="anyId">
                    <Tooltip
                    // content={
                    //   <ChartsTooltip
                    //     dataKey="contactsCount"
                    //     formatValue={value => value.toFixed(0)}
                    //     formatLabel={label =>
                    //       labelByTimeframeGroup(
                    //         label,
                    //         contactsTimeFrameGrouping,
                    //       )
                    //     }
                    //   />
                    // }
                    />
                    <XAxis dataKey="key" hide />
                    <Area
                      type="monotone"
                      dataKey="value.contactsCount"
                      stroke={colors[0]}
                      fill={colors[0]}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <hr />
          <div className="row align-items-end my-4">
            <div className="col-sm-4">
              <h6 className="mb-1 text-muted">Contatti</h6>
              <h4 className="my-0">
                <AnimatedNumber
                  value={data.length}
                  style={{
                    transition: '0.8s ease-out',
                    transitionProperty: 'background-color, color, opacity',
                  }}
                  formatValue={value => value.toFixed(0)}
                />
              </h4>
            </div>
            <div className="col-sm-8">
              <div style={{ width: '100%', height: '64px' }}>
                <ResponsiveContainer>
                  <AreaChart data={timeline} syncId="anyId">
                    <Tooltip
                    // content={
                    //   <ChartsTooltip
                    //     dataKey="contactsCount"
                    //     formatValue={value => value.toFixed(0)}
                    //     formatLabel={label =>
                    //       labelByTimeframeGroup(
                    //         label,
                    //         contactsTimeFrameGrouping,
                    //       )
                    //     }
                    //   />
                    // }
                    />
                    <XAxis dataKey="key" hide />
                    <Area
                      type="monotone"
                      dataKey="value.contactsCount"
                      stroke={colors[1]}
                      fill={colors[1]}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
