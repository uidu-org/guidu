import React, { Component } from 'react';
import moment from 'moment';

import LocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

export default class DateInput extends Component {
  handleChange = date => {
    const value = date ? moment(date).format(this.props.formatSubmit) : '';
    this.props.onSetValue(value);
    this.props.onChange(this.props.name, value);
  };

  initElementRef = control => {
    this.element = control;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    const {
      id,
      value,
      layout,
      help,
      showErrors,
      errorMessages,
      min,
      max,
      dayPickerProps,
      className,
    } = this.props;

    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    delete inputProps.addonAfter;
    delete inputProps.addonBefore;
    delete inputProps.buttonAfter;
    delete inputProps.buttonBefore;
    delete inputProps.debounce;
    delete inputProps.updateOn;
    delete inputProps.value;
    delete inputProps.isPristine;
    delete inputProps.displayFormat;
    delete inputProps.formatSubmit;
    delete inputProps.min;
    delete inputProps.max;
    delete inputProps.dayPickerProps;

    const disabledDays = [
      {
        after: max,
        before: min,
      },
    ];

    const control = (
      <DayPickerInput
        {...inputProps}
        ref={this.initElementRef}
        formatDate={formatDate}
        parseDate={parseDate}
        dayPickerProps={{
          ...dayPickerProps,
          localeUtils: LocaleUtils,
          disabledDays,
        }}
        inputProps={{
          format: this.props.displayFormat(),
          className,
        }}
        onDayChange={this.handleChange}
        value={
          value && value !== ''
            ? moment(value).format(this.props.displayFormat())
            : ''
        } // momentPropTypes.momentObj or null
        showOutsideDays
        hideOnDayClick
      />
    );

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        {control}
        {help ? <Help help={help} /> : null}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
      </Row>
    );
  }
}

DateInput.propTypes = {
  ...ComponentCommon.propTypes,
};

DateInput.defaultProps = {
  ...ComponentCommon.defaultProps,
  // focused: false,
  // type: 'date',
  className: 'form-control',
  displayFormat: () => moment.localeData().longDateFormat('L'),
  formatSubmit: 'YYYY-MM-DD',
  min: null,
  max: null,
  dayPickerProps: {},
  // selectYears: false,
  // selectMonths: false,
  // closeOnSelect: true,
  // closeOnClear: true,
};
