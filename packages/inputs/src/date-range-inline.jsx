import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import LocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

export default class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    ...this.props.value,
  });

  componentWillReceiveProps({ value: nextValue }) {
    const { from, to } = this.state;
    if (nextValue && (nextValue.from !== from || nextValue.to !== to)) {
      this.setState({ ...nextValue });
    }
  }

  initElementRef = control => {
    this.element = control;
  };

  handleChange = range => {
    this.props.onSetValue(range);
    if (range.from && range.to) {
      this.props.onChange(this.props.name, range);
    }
  };

  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range, () => {
      this.handleChange(range);
    });
  };

  handleResetClick = () => {
    this.setState(this.getInitialState());
  };

  formatValue = value => {
    if (!value) {
      return '';
    }
    let out = '';
    if (value.from) {
      out += moment(value.from).format(this.props.displayFormat());
    }
    if (value.to) {
      out += ` — ${moment(value.to).format(this.props.displayFormat())}`;
    } else {
      out += ` — ${this.props.chooseEndDate}`;
    }
    return out;
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const disabledDays = { before: this.state.from };
    const inputProps = Object.assign({}, this.props);
    const {
      id,
      value,
      layout,
      help,
      showErrors,
      errorMessages,
      className,
      dayPickerProps,
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
    delete inputProps.dayPickerProps;

    const control = (
      <DayPickerInput
        {...inputProps}
        ref={this.initElementRef}
        dayPickerProps={{
          ...dayPickerProps,
          className: 'DateRange',
          localeUtils: LocaleUtils,
          disabledDays,
          selectedDays: [from, { from, to }],
          modifiers,
          onDayClick: this.handleDayClick,
        }}
        inputProps={{
          className,
        }}
        formatDate={formatDate}
        hideOnDayClick={false}
        value={this.formatValue(value)}
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

DateRange.propTypes = {
  ...ComponentCommon.propTypes,
  chooseEndDate: PropTypes.string,
};

DateRange.defaultProps = {
  ...ComponentCommon.defaultProps,
  // focused: false,
  // type: 'date',
  chooseEndDate: 'choose end date',
  className: 'form-control',
  displayFormat: () => moment.localeData().longDateFormat('L'),
  formatSubmit: 'YYYY-MM-DD',
  min: null,
  max: null,
  dayPickerProps: {
    numberOfMonths: 1,
  },
  // selectYears: false,
  // selectMonths: false,
  // closeOnSelect: true,
  // closeOnClear: true,
};
