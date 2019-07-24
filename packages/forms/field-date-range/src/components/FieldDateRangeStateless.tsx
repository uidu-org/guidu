import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import { FieldDateStateless } from '@uidu/field-date';
import moment from 'moment';
import React, { Component } from 'react';
import { formatDate } from 'react-day-picker/moment';
import { ArrowRight } from 'react-feather';
import Helmet from 'react-helmet';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

moment.locale('it');

class FieldDateRangeStateless extends Component<any> {
  private fromElement: any = React.createRef();
  private toElement: any = React.createRef();

  static defaultProps = {
    locale: 'it',
    displayFormat: 'LL',
    placeholder: {
      from: `${formatDate(new Date(), 'LL', 'it')}`,
      to: `${formatDate(new Date(), 'LL', 'it')}`,
    },
    className:
      'InputFromTo d-flex form-control form-control-sm align-items-center px-0',
  };

  constructor(props) {
    super(props);
    this.state = {
      from: props.from,
      to: props.to,
    };
  }

  componentWillReceiveProps({ from: nextFrom, to: nextTo }) {
    const { from, to } = this.state;
    if (
      nextFrom &&
      nextTo
      // (nextFrom.getTime() !== from.getTime() ||
      //   nextTo.getTime() !== to.getTime())
    ) {
      console.log(nextFrom);
      console.log(nextTo);
      this.setState({ from: nextFrom, to: nextTo }, () => {
        // onChange({ from: nextFrom, to: nextTo });
      });
    }
  }

  showFromMonth = () => {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.toElement.current.getDayPicker().showMonth(from);
    }
  };

  handleFromChange = from => {
    const { onChange } = this.props;
    // Change the from date and focus the "to" input field
    this.setState({ from }, () => {
      return onChange(this.state);
    });
  };

  handleToChange = to => {
    const { onChange } = this.props;
    this.setState({ to }, () => {
      onChange(this.state);
      this.showFromMonth();
    });
  };

  render() {
    const {
      placeholder,
      onChange,
      value,
      displayFormat,
      className,
    } = this.props;
    const { from, to } = this.state;
    console.log(from);
    console.log(to);
    const modifiers = { start: from, end: to };

    return (
      <div className={className}>
        <FieldDateStateless
          innerRef={this.fromElement}
          value={from}
          placeholder={placeholder.from}
          wrapperClassName="position-static"
          inputClassName="form-control form-control-sm shadow-none border-0 text-center h-auto"
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => {
              this.toElement.current.getInput().focus();
            },
          }}
          onDayChange={this.handleFromChange}
          displayFormat="ll"
        />
        <ArrowRight size={16} className="flex-shrink-0" />
        <span className="InputFromTo-to">
          <FieldDateStateless
            innerRef={this.toElement}
            value={to}
            placeholder={placeholder.to}
            wrapperClassName="position-static"
            inputClassName="form-control form-control-sm shadow-none border-0 text-center h-auto"
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange}
            displayFormat="ll"
          />
        </span>
        <Helmet>
          <style>
            {`
              .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                background-color: #f0f8ff !important;
                color: #4a90e2;
              }
              .InputFromTo .DayPickerInput input:focus {
                color: red;
              }
              .InputFromTo .DayPickerInput input {
                max-width: 110px;
              }
              .InputFromTo .DayPicker-Day {
                border-radius: 0 !important;
              }
              .InputFromTo .DayPicker-Day--start {
                border-top-left-radius: 50% !important;
                border-bottom-left-radius: 50% !important;
              }
              .InputFromTo .DayPicker-Day--end {
                border-top-right-radius: 50% !important;
                border-bottom-right-radius: 50% !important;
              }
              .InputFromTo .DayPickerInput-Overlay {
                width: 100%;
              }
            `}
          </style>
        </Helmet>
      </div>
    );
  }
}

export { FieldDateRangeStateless as FieldDateRangeStatelessWithoutAnalytics };
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
  })(FieldDateRangeStateless),
);
