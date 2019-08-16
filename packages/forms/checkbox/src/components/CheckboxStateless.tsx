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

class CheckboxStateless extends Component<any> {
  private element: any = React.createRef();

  componentDidUpdate() {
    const { isIndeterminate } = this.props;

    if (this.element) {
      this.element.current.indeterminate = !!isIndeterminate;
    }
  }

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
        className={`custom-control custom-checkbox${
          isInline ? ' custom-control-inline' : ''
        }`}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          className="custom-control-input"
          onChange={onChange}
          value={id}
          disabled={disabled}
          checked={checked}
          ref={this.element}
        />
        <label className="custom-control-label" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
}

export { CheckboxStateless as CheckboxStatelessWithoutAnalytics };
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
  })(CheckboxStateless),
);
