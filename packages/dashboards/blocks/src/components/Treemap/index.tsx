import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';
import { colors, manipulator, resolve } from '../../utils';
import Loader from '../Loader';
import Switch from '../Switch';

export default class TreemapBlock extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      showPrevious: false,
    };
  }

  manipulate = data => {
    const { groupBy, rollup: rollupper } = this.props;
    let manipulated = data;
    manipulated = rollup(
      data,
      c => manipulator(c, rollupper),
      c => (groupBy ? resolve(groupBy, c) : c.id),
    );

    manipulated = Array.from(manipulated).reduce((arr: Array<any>, item) => {
      arr.push([{ k: item[0], v: `${item[0]} - ${item[1]}` }, 'Root', item[1]]);
      return arr;
    }, []);
    return [
      ['Key', 'Parent', 'Value'], //, 'Increase'],
      ['Root', null, 0], //, 0],
      ...manipulated,
    ];
  };

  render() {
    const {
      rowData,
      loaded,
      limit,
      formatter,
      label,
      datumRenderer,
      comparatorData,
      timeRange,
      namespace,
    } = this.props;

    const { showPrevious } = this.state;

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
        <div
          style={{
            marginTop: -1,
            height: '100%',
            marginRight: -16,
            marginBottom: -6,
            marginLeft: -6,
          }}
        >
          {loaded ? (
            <Chart
              options={{
                fontFamily: 'Avenir',
                fontSize: 14,
                minHighlightColor: '#8c6bb1',
                midHighlightColor: '#9ebcda',
                maxHighlightColor: '#edf8fb',
                minColor: colors[2],
                midColor: '#f7f7f7',
                maxColor: colors[0],
                // hintOpacity: 0.3,
                headerHeight: 0,
              }}
              chartEvents={[
                {
                  eventName: 'select',
                  callback: ({ chartWrapper }) => {
                    const chart = chartWrapper.getChart();
                    const selection = chart.getSelection();
                    if (selection.length === 0) return;
                    console.log(selection);
                    // const region = rowData[selection[0].row + 1];
                    // console.log('Selected : ' + region);
                  },
                },
              ]}
              chartType="TreeMap"
              width="100%"
              height="100%"
              data={this.manipulate(
                comparatorData && showPrevious
                  ? comparatorData[namespace]
                  : rowData[namespace],
              )}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
}
