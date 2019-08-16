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
    autoSize: true,
    rows: 4,
    cols: 0,
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
const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldRadio',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'radioField',

      attributes: {
        componentName: 'fieldRadio',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
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
