import React, { PureComponent } from 'react';
import AnimatedNumber from 'react-animated-number';
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
          <h6 className="mb-1 text-muted text-truncate">{label}</h6>
          <h4 className="my-0">
            <AnimatedNumber
              value={manipulated}
              style={{
                transition: '0.8s ease-out',
                transitionProperty: 'background-color, color, opacity',
              }}
              formatValue={value => format(value, formatter)}
            />
          </h4>
        </div>
      </div>
    );
  }
}
