import React, { PureComponent } from 'react';
import CountUp from 'react-countup';
import { format, manipulator } from '../../../utils';
import Loader from '../../Loader';
import { CounterProps } from './types';

export default class CounterBlock extends PureComponent<CounterProps> {
  manipulate = data => {
    const { rollup } = this.props;
    return manipulator(data, rollup);
  };

  render() {
    const {
      data,
      rowData,
      loaded,
      label,
      formatter,
      itemBefore,
      namespace,
    } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    const manipulated = data || this.manipulate(rowData[namespace]);

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
              formattingFn={value => format(value, formatter)}
            />
          </h5>
        </div>
      </div>
    );
  }
}
