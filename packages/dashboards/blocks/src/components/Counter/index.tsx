import React, { PureComponent } from 'react';
import CountUp from 'react-countup';
import { format, manipulator } from '../../utils';
import Loader from '../Loader';

export default class CounterBlock extends PureComponent<any> {
  manipulate = () => {
    const { rowData, rollup } = this.props;
    return manipulator(rowData, rollup);
  };

  render() {
    const { rowData, loaded, label, formatter, itemBefore } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    const manipulated = this.manipulate();

    return (
      <div className="card card-body h-100 d-flex align-items-center flex-row">
        {itemBefore && <div className="flex-shrink-0 mr-3">{itemBefore}</div>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h6 className="mb-1 text-muted text-truncate font-weight-light">
            {label}
          </h6>
          <h5 className="my-0">
            <CountUp
              start={0}
              end={manipulated}
              decimals={0}
              formattinFn={value => format(value, formatter)}
            />
          </h5>
        </div>
      </div>
    );
  }
}
