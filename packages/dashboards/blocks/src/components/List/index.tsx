import { rollup } from 'd3-array';
import React, { PureComponent } from 'react';
import { format, manipulator, resolve } from '../../utils';
import Loader from '../Loader';

export default class ListBlock extends PureComponent<any> {
  static defaultProps = {
    groupBy: null,
    sortBy: 'createdAt',
    limit: 5,
  };

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
    } = this.props;
    const manipulated = this.manipulate(rowData);

    if (!loaded) {
      return <Loader />;
    }

    return (
      <div className="card h-100">
        <div className="card-header">{label}</div>
        <ul
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
        </ul>
      </div>
    );
  }
}
