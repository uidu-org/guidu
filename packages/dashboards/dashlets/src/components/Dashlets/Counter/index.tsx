import React, { PureComponent } from 'react';
import CountUp from 'react-countup';
import { format } from '../../../utils';
import Loader from '../../Loader';
import { CounterProps } from './types';

export default class CounterBlock extends PureComponent<CounterProps> {
  render() {
    const { label, formatter, itemBefore, resultSet } = this.props;

    if (!resultSet) {
      return <Loader />;
    }

    return (
      <div className="card-body h-100 d-flex align-items-center flex-row">
        {itemBefore && <div className="flex-shrink-0 mr-3">{itemBefore}</div>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h6 className="mb-1 text-muted text-truncate font-weight-light">
            {label}
          </h6>
          <h3 className="my-0">
            <CountUp
              start={0}
              end={resultSet
                .seriesNames()
                .map((s) => resultSet.totalRow()[s.key])}
              decimals={0}
              formattingFn={(value) => format(value, formatter)}
            />
          </h3>
          {/* <div className="d-flex mt-1 text-danger align-items-center">
            <div style={{ display: 'flex', transform: 'rotate(-45deg)' }}>
              <ArrowDown size={16} color="red" className="mr-1 text-danger" />
            </div>
            -300%
          </div> */}
        </div>
      </div>
    );
  }
}
