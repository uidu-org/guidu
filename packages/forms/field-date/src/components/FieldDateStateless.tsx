import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import moment from 'moment';
import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import { FieldDateProps } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

moment.locale('it');

class FieldDateStateless extends Component<FieldDateProps> {
  private element: any = React.createRef();

  static defaultProps = {
    locale: 'it',
    displayFormat: 'LL',
    placeholder: `${formatDate(new Date(), 'LL', 'it')}`,
    inputClassName: 'form-control',
  };

  render() {
    const {
      placeholder,
      onChange,
      value,
      displayFormat,
      containerClassName,
      wrapperClassName,
      inputClassName,
      dayPickerProps,
      innerRef,
      onDayChange,
    } = this.props;

    return (
      <DayPickerInput
        ref={innerRef}
        classNames={{
          container: `DayPickerInput${
            containerClassName ? ` ${containerClassName}` : ''
          }`,
          overlayWrapper: `DayPickerInput-OverlayWrapper${
            wrapperClassName ? ` ${wrapperClassName}` : ''
          }`,
          overlay: 'DayPickerInput-Overlay',
        }}
        value={value && value !== '' ? moment(value).format(displayFormat) : ''}
        onDayChange={onDayChange || (onChange as any)}
        formatDate={formatDate}
        parseDate={parseDate}
        format="LL"
        placeholder={placeholder}
        dayPickerProps={{
          locale: 'it',
          localeUtils: MomentLocaleUtils,
          showOutsideDays: true,
          enableOutsideDaysClick: true,
          todayButton: 'Go to Today',
          ...dayPickerProps,
        }}
        inputProps={{
          className: inputClassName,
        }}
      />
    );
  }
}

export { FieldDateStateless as FieldDateStatelessWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldDate',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'dateField',

      attributes: {
        componentName: 'fieldDate',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
      action: 'focused',
      actionSubject: 'dateField',

      attributes: {
        componentName: 'fieldDate',
        packageName,
        packageVersion,
      },
    }),
  })(FieldDateStateless),
);
