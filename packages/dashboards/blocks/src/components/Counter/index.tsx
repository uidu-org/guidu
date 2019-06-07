import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import AnimatedNumber from 'react-animated-number';

export default class CounterBlock extends PureComponent<any> {
  render() {
    const { rowData, loaded } = this.props;
    const { data, timeline } = rowData;

    if (!loaded) {
      return <Spinner />;
    }

    return (
      <div className="card card-body h-100 justify-content-center">
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
    );
  }
}
