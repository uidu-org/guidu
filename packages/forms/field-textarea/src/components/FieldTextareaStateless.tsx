import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import autosize from 'autosize';
import React, { Component } from 'react';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

class FieldTextareaStateless extends Component<any> {
  private element: any = React.createRef();

  static defaultProps = {
    className: 'form-control',
    autoSize: true,
    rows: 4,
    cols: 0,
  };

  componentDidMount() {
    const { autoSize } = this.props;
    if (autoSize) {
      autosize(this.element.current);
    }
  }

  render() {
    const {
      placeholder,
      className,
      onFocus,
      onBlur,
      onChange,
      onKeyDown,
      onKeyUp,
      rows,
      cols,
      value,
    } = this.props;

    return (
      <textarea
        rows={rows}
        cols={cols}
        ref={this.element}
        placeholder={placeholder}
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        {value}
      </textarea>
    );
  }
}

export { FieldTextareaStateless as FieldTextareaStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldTextarea',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'textareaField',

      attributes: {
        componentName: 'fieldTextarea',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'textareaField',

      attributes: {
        componentName: 'fieldTextarea',
        packageName,
        packageVersion,
      },
    }),
  })(FieldTextareaStateless),
);
