import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import { manipulator, resolve } from '../../utils';
import Loader from '../Loader';
import Switch from '../Switch';
import Items from './Items';

export default class ListBlock extends PureComponent<
  any,
  { showPrevious: boolean }
> {
  static defaultProps = {
    groupBy: null,
    sortBy: 'createdAt',
    limit: 5,
  };

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

    manipulated = Array.from(manipulated, ([key, value]) => ({
      key,
      value,
    })).sort((a, b) => b.value - a.value);
    return manipulated;
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

    if (!loaded) {
      return <Loader />;
    }

    return (
      <div className="card h-100">
        <div className="card-header d-flex align-items-center">
          <span className="text-truncate">{label}</span>
          <Switch
            isPrevious={showPrevious}
            comparatorData={comparatorData}
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
        <Items
          data={this.manipulate(
            comparatorData && showPrevious
              ? comparatorData[namespace]
              : rowData[namespace],
          )}
          limit={limit}
          datumRenderer={datumRenderer}
          formatter={formatter}
        />
        {/* <ul
          className="list-group list-group-flush"
          style={{ overflow: 'scroll' }}
        >
          {manipulated.slice(0, limit).map(datum => {
            if (datumRenderer) {
              return datumRenderer(datum);
            }

            return (
              <a
                key={datum.key}
                href="#"
                className="list-group-item list-group-item-action d-flex"
              >
                {datum.key}
                <span className="text-muted ml-auto">
                  {formatter ? format(datum.value, formatter) : datum.value}
                </span>
              </a>
            );
          })}
        </ul> */}
      </div>
    );
  }
}
