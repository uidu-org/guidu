import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import LocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

const YearMonthForm = ({ currentDate, onChange }) => {
  const age = 100;
  const currentMonth = currentDate
    ? moment(currentDate).month()
    : moment().month();
  const currentYear = currentDate
    ? moment(currentDate).year()
    : moment().year();

  const years = [...Array(age + 1).keys()].map(i => i + moment().year() - age);
  const months = moment.months();

  const handleChange = e => {
    onChange(new Date(e.target.form.year.value, e.target.form.month.value));
  };

  return (
    <div style={{ display: 'table-caption' }}>
      <form>
        <div className="d-flex align-items-center mb-2">
          <select
            className="custom-select mr-2"
            name="month"
            onChange={handleChange}
          >
            {months.map(month => (
              <option
                key={`month-${month}`}
                value={months.indexOf(month)}
                selected={currentMonth === months.indexOf(month)}
              >
                {month}
              </option>
            ))}
          </select>

          <select
            className="custom-select ml-2"
            name="year"
            onChange={handleChange}
          >
            {years.map(year => (
              <option
                key={`year-${year}`}
                value={year}
                selected={currentYear === year}
              >
                {year}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

YearMonthForm.propTypes = {
  currentDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

YearMonthForm.defaultProps = {
  currentDate: null,
};

export default class DateBirthDateInput extends Component {
  handleChange = date => {
    const { name, onSetValue, onChange, formatSubmit } = this.props;
    const value = date ? moment(date).format(formatSubmit) : '';
    onSetValue(value);
    onChange(name, value);
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
      displayFormat,
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
          navbarElement: () => null,
          captionElement: (
            <YearMonthForm
              currentDate={value}
              onChange={month => this.element.daypicker.showMonth(month)}
            />
          ),
          localeUtils: LocaleUtils,
          disabledDays,
        }}
        inputProps={{
          format: displayFormat(),
          className,
        }}
        onDayChange={this.handleChange}
        value={
          value && value !== '' ? moment(value).format(displayFormat()) : ''
        } // momentPropTypes.momentObj or null
        hideOnDayClick
        showOutsideDays
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

DateBirthDateInput.propTypes = {
  ...ComponentCommon.propTypes,
};

DateBirthDateInput.defaultProps = {
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
