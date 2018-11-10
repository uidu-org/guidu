import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';

import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Icon from './icon';
import InputControl from './controls/input';
import InputGroup from './input-group';
import Row from './row';
import RequiredSymbol from './required-symbol';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.changeDebounced = debounce(
      props.onSetValue,
      this.getDebounceInterval('change'),
    );
    this.blurDebounced = debounce(
      props.onSetValue,
      this.getDebounceInterval('blur'),
    );
  }

  componentWillReceiveProps = nextProps => {
    const isValueChanging = nextProps.value !== this.props.value;
    if (isValueChanging) {
      this.setState({
        value: nextProps.value,
      });
      this.props.onSetValue(nextProps.value);
    }
  };

  getDebounceInterval = eventName => {
    if (this.props.debounce[eventName]) {
      return this.props.debounce[eventName];
    }
    return 0;
  };

  shouldUpdateOn = eventName => {
    const updateOnEventNames = this.props.updateOn.split(' ');
    return updateOnEventNames.includes(eventName);
  };

  handleChange = event => {
    const { value } = event.currentTarget;
    this.setState({ value });
    if (this.shouldUpdateOn('change')) {
      this.changeDebounced(value);
    }
    this.props.onChange(this.props.name, value);
  };

  handleBlur = event => {
    const { value } = event.currentTarget;
    this.setState({ value });
    if (this.shouldUpdateOn('blur')) {
      this.changeDebounced.cancel();
      this.blurDebounced(value);
    }
    this.props.onBlur(this.props.name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
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

    let control = (
      <InputControl
        {...inputProps}
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        ref={this.initElementRef}
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
        {showErrors ? (
          <Icon symbol="remove" className="form-control-feedback" />
        ) : null}
      </Row>
    );
  }
}

const { ...inputGroupPropTypes } = InputControl;
delete inputGroupPropTypes.children;

Input.propTypes = {
  ...InputControl.propTypes,
  ...inputGroupPropTypes,
  ...ComponentCommon.propTypes,
  debounce: PropTypes.shape({
    blur: PropTypes.number,
    change: PropTypes.number,
  }),
  type: PropTypes.oneOf([
    'color',
    'date',
    'datetime',
    'datetime-local',
    'email',
    'hidden',
    'month',
    'number',
    'password',
    'range',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  floatLabel: PropTypes.string,
  updateOn: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  ...ComponentCommon.defaultProps,
  ...InputGroup.defaultProps,
  type: 'text',
  value: '',
  floatLabel: null,
  updateOn: 'blur change',
  debounce: {
    blur: 0,
    change: 0,
  },
  onBlur: () => {},
};
