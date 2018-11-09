import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import LocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
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
    from: this.props.from,
    to: this.props.to,
  });

  componentWillReceiveProps({ from: nextFrom, to: nextTo }) {
    const { from, to } = this.state;
    if (nextFrom && nextTo && (nextFrom.getTime() !== from.getTime() || nextTo.getTime() !== to.getTime())) {
      this.setState({ from: nextFrom, to: nextTo }, () => {
        this.handleChange({ from: nextFrom, to: nextTo });
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
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

  focusTo = () => {
    // Focus to `to` field. A timeout is required here because the overlays
    // already set timeouts to work well with input fields
    this.timeout = setTimeout(() => this.to.getInput().focus(), 0);
  };

  showFromMonth = () => {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  };

  handleFromChange = from => {
    // Change the from date and focus the "to" input field
    this.setState({ from }, () => {
      if (!this.state.to) {
        return this.focusTo();
      }
      return this.handleChange(this.state);
    });
  };

  handleToChange = to => {
    this.setState({ to }, () => {
      this.handleChange(this.state);
      this.showFromMonth();
    });
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const inputProps = Object.assign({}, this.props);
    const {
      id,
      placeholder,
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
      <div className="DateRange d-md-flex align-items-center">
        <DayPickerInput
          {...inputProps}
          classNames={{
            container: 'DayPickerInput w-100',
            overlay: 'DayPickerInput-Overlay d-flex flex-column',
            overlayWrapper: 'DayPickerInput-OverlayWrapper',
          }}
          value={from}
          placeholder={placeholder.from}
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          inputProps={{
            className,
          }}
          dayPickerProps={{
            ...dayPickerProps,
            localeUtils: LocaleUtils,
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
          }}
          onDayChange={this.handleFromChange}
        />
        <span className="mx-3">—</span>
        <span className="InputFromTo-to w-100">
          <DayPickerInput
            {...inputProps}
            ref={el => {
              this.to = el;
            }}
            classNames={{
              container: 'DayPickerInput w-100',
              overlay: 'DayPickerInput-Overlay d-flex flex-column',
              overlayWrapper: 'DayPickerInput-OverlayWrapper',
            }}
            value={to}
            placeholder={placeholder.to}
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            inputProps={{
              className,
            }}
            dayPickerProps={{
              ...dayPickerProps,
              localeUtils: LocaleUtils,
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
            }}
            onDayChange={this.handleToChange}
          />
        </span>
      </div>
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
  placeholder: {
    from: 'From',
    to: 'To',
  },
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
