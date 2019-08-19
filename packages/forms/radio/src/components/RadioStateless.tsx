import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import React, { Component } from 'react';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

class RadioStateless extends Component<any> {
  static defaultProps = {
    className: 'form-control',
  };

  render() {
    const {
      label,
      id,
      name,
      onChange,
      disabled,
      checked,
      isInline,
    } = this.props;

    return (
      <div
        className={`custom-control custom-radio${
          isInline ? ' custom-control-inline' : ''
        }`}
      >
        <input
          type="radio"
          id={id}
          name={name}
          className="custom-control-input"
          onChange={onChange}
          value={id}
          disabled={disabled}
          checked={checked}
        />
        <label className="custom-control-label" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
}

export { RadioStateless as RadioStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldRadio',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'radioField',

      attributes: {
        componentName: 'fieldRadio',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'radioField',

      attributes: {
        componentName: 'fieldRadio',
        packageName,
        packageVersion,
      },
    }),
  })(RadioStateless),
);
