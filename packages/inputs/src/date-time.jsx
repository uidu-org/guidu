import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeInput from 'react-keyboard-time-input';
import InputGroup from './input-group';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import RequiredSymbol from './required-symbol';

export default class DateTime extends Component {
  handleChange = value => {
    this.props.onSetValue(value);
    this.props.onChange(this.props.name, value);
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    delete inputProps.className;

    const {
      addonAfter,
      addonBefore,
      buttonAfter,
      buttonBefore,
      errorMessages,
      floatLabel,
      help,
      id,
      layout,
      type,
      showErrors,
      required,
    } = this.props;

    let control = (
      <TimeInput
        {...inputProps}
        inputClassName={this.props.className}
        onChange={this.handleChange}
      />
    );

    if (type === 'hidden') {
      return control;
    }

    if (addonBefore || addonAfter || buttonBefore || buttonAfter) {
      control = <InputGroup {...this.props}>{control}</InputGroup>;
    }

    if (floatLabel) {
      return (
        <Row
          {...this.props}
          label={null} // so that shouldRenderLabel return false in Row.js
          required={false} // so that shouldRenderLabel return false in Row.js
          htmlFor={id}
        >
          <label htmlFor={id} className="has-float-label">
            {control}
            {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
            <span>
              {floatLabel}
              {required && ' '}
              {required && <RequiredSymbol required={required} />}
            </span>
          </label>
          {help ? <Help help={help} /> : null}
        </Row>
      );
    }

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        {control}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
        {help ? <Help help={help} /> : null}
      </Row>
    );
  }
}

DateTime.propTypes = {
  // ...InputControl.propTypes,
  // ...inputGroupPropTypes,
  ...ComponentCommon.propTypes,
  value: PropTypes.string,
  className: PropTypes.string,
};

DateTime.defaultProps = {
  ...ComponentCommon.defaultProps,
  value: '13:00',
  className: 'form-control',
};

// const options = [];
// const next = moment('00:00', 'HH:mm');
// const latest = next.clone().add(1, 'days');
// while (next.isBefore(latest)) {
//   const time = next.add(interval, 'minutes').format('HH:mm');
//   options.push({
//     id: time,
//     name: time,
//   });
// }
// <Select
//     {...otherProps}
//     options={options}
//   />
